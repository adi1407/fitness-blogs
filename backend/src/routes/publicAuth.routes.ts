import { Router } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool";
import { env } from "../config/env";
import { recordAudit } from "../services/auditLog";

export const publicAuthRouter = Router();

type MemberJwt = {
  typ: "member";
  id: string;
  email: string;
};

function googleConfigured() {
  return Boolean(
    env.googleClientId && env.googleClientSecret && env.googleRedirectUri,
  );
}

function signMemberToken(member: { id: string; email: string }) {
  const payload: MemberJwt = {
    typ: "member",
    id: member.id,
    email: member.email,
  };
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"],
  });
}

function mapMember(row: Record<string, unknown>) {
  return {
    id: row.id,
    email: row.email,
    name: row.name ?? "",
    picture: row.picture ?? "",
    createdAt: row.created_at,
    lastLoginAt: row.last_login_at,
  };
}

publicAuthRouter.get("/google/status", (_req, res) => {
  res.json({
    enabled: googleConfigured(),
    clientIdConfigured: Boolean(env.googleClientId),
  });
});

/** Start Google OAuth — returns URL for the browser to open. */
publicAuthRouter.get("/google", (req, res) => {
  if (!googleConfigured()) {
    res.status(503).json({
      message:
        "Google sign-in is not configured. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REDIRECT_URI.",
    });
    return;
  }

  const next =
    typeof req.query.next === "string" && req.query.next.startsWith("/")
      ? req.query.next
      : "/";
  const state = Buffer.from(JSON.stringify({ next }), "utf8").toString(
    "base64url",
  );

  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", env.googleClientId);
  url.searchParams.set("redirect_uri", env.googleRedirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("access_type", "online");
  url.searchParams.set("prompt", "select_account");
  url.searchParams.set("state", state);

  res.json({ url: url.toString() });
});

/** Google redirects here — exchange code, upsert member, bounce to site. */
publicAuthRouter.get("/google/callback", async (req, res) => {
  const fail = (reason: string) => {
    const dest = new URL("/login", env.publicSiteUrl);
    dest.searchParams.set("error", reason);
    res.redirect(dest.toString());
  };

  if (!googleConfigured()) {
    fail("google_not_configured");
    return;
  }

  const code = typeof req.query.code === "string" ? req.query.code : "";
  const stateRaw = typeof req.query.state === "string" ? req.query.state : "";
  if (!code) {
    fail("missing_code");
    return;
  }

  let next = "/";
  try {
    const parsed = JSON.parse(
      Buffer.from(stateRaw, "base64url").toString("utf8"),
    ) as { next?: string };
    if (parsed.next?.startsWith("/")) next = parsed.next;
  } catch {
    /* ignore bad state */
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: env.googleClientId,
        client_secret: env.googleClientSecret,
        redirect_uri: env.googleRedirectUri,
        grant_type: "authorization_code",
      }),
    });
    if (!tokenRes.ok) {
      fail("token_exchange_failed");
      return;
    }
    const tokenJson = (await tokenRes.json()) as { access_token?: string };
    if (!tokenJson.access_token) {
      fail("token_exchange_failed");
      return;
    }

    const profileRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: { Authorization: `Bearer ${tokenJson.access_token}` } },
    );
    if (!profileRes.ok) {
      fail("profile_failed");
      return;
    }
    const profile = (await profileRes.json()) as {
      sub?: string;
      email?: string;
      email_verified?: boolean;
      name?: string;
      picture?: string;
    };

    if (!profile.sub || !profile.email) {
      fail("incomplete_profile");
      return;
    }
    if (profile.email_verified === false) {
      fail("email_not_verified");
      return;
    }

    const existing = await pool.query(
      `SELECT * FROM members WHERE google_sub = $1 OR lower(email) = lower($2) LIMIT 1`,
      [profile.sub, profile.email],
    );

    let memberRow: Record<string, unknown>;
    if (existing.rowCount && existing.rows[0]) {
      const updated = await pool.query(
        `UPDATE members SET
          google_sub = $1,
          email = $2,
          name = COALESCE(NULLIF($3, ''), name),
          picture = COALESCE(NULLIF($4, ''), picture),
          last_login_at = NOW(),
          updated_at = NOW(),
          is_active = TRUE
         WHERE id = $5
         RETURNING *`,
        [
          profile.sub,
          profile.email.toLowerCase(),
          profile.name ?? "",
          profile.picture ?? "",
          existing.rows[0].id,
        ],
      );
      memberRow = updated.rows[0];
    } else {
      const inserted = await pool.query(
        `INSERT INTO members (email, name, picture, google_sub, last_login_at)
         VALUES ($1, $2, $3, $4, NOW())
         RETURNING *`,
        [
          profile.email.toLowerCase(),
          profile.name ?? "",
          profile.picture ?? "",
          profile.sub,
        ],
      );
      memberRow = inserted.rows[0];
    }

    if (!memberRow.is_active) {
      fail("account_disabled");
      return;
    }

    const token = signMemberToken({
      id: String(memberRow.id),
      email: String(memberRow.email),
    });

    await recordAudit(req, {
      action: "member.google_login",
      entityType: "member",
      entityId: String(memberRow.id),
      summary: `Google sign-in ${memberRow.email}`,
    });

    const member = mapMember(memberRow);
    const dest = new URL("/auth/callback", env.publicSiteUrl);
    dest.searchParams.set("token", token);
    dest.searchParams.set("next", next);
    // So the frontend can finish login without a cross-origin /me round-trip.
    dest.searchParams.set(
      "member",
      Buffer.from(JSON.stringify(member), "utf8").toString("base64url"),
    );
    res.redirect(dest.toString());
  } catch (err) {
    console.error("[google-auth]", err);
    fail("unexpected_error");
  }
});

publicAuthRouter.get("/me", async (req, res) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }
  try {
    const decoded = jwt.verify(header.slice(7), env.jwtSecret) as MemberJwt;
    if (decoded.typ !== "member" || !decoded.id) {
      res.status(401).json({ message: "Invalid session" });
      return;
    }
    const result = await pool.query(
      `SELECT * FROM members WHERE id = $1 AND is_active = TRUE LIMIT 1`,
      [decoded.id],
    );
    if (!result.rowCount) {
      res.status(401).json({ message: "Invalid session" });
      return;
    }
    res.json({ member: mapMember(result.rows[0]) });
  } catch {
    res.status(401).json({ message: "Invalid session" });
  }
});

publicAuthRouter.post("/logout", (_req, res) => {
  res.json({ ok: true });
});
