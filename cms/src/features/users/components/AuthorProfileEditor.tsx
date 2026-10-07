import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api/client";

type Profile = {
  id: string;
  name: string;
  slug: string | null;
  bio: string;
  credentials: string;
};

const SITE_ORIGIN =
  import.meta.env.VITE_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Bio + credentials shown on the public `/authors/{slug}` page. */
export function AuthorProfileEditor({
  userId,
  onClose,
}: {
  userId: string;
  onClose: () => void;
}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bio, setBio] = useState("");
  const [credentials, setCredentials] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const data = await apiFetch<{ profile: Profile }>(
          `/admin/users/${userId}/profile`,
        );
        if (cancelled) return;
        setProfile(data.profile);
        setBio(data.profile.bio);
        setCredentials(data.profile.credentials);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load profile");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const data = await apiFetch<{ profile: Profile }>(
        `/admin/users/${userId}/profile`,
        { method: "PATCH", body: JSON.stringify({ bio, credentials }) },
      );
      setProfile(data.profile);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (!profile) {
    return (
      <p className="px-4 py-3 text-sm text-slate-500">
        {error || "Loading profile…"}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 bg-slate-50 px-4 py-4">
      <p className="text-xs text-slate-500">
        Public page:{" "}
        {profile.slug ? (
          <a
            href={`${SITE_ORIGIN}/authors/${profile.slug}`}
            target="_blank"
            rel="noreferrer"
            className="text-sky-600 underline"
          >
            /authors/{profile.slug}
          </a>
        ) : (
          "assigned on next server restart"
        )}{" "}
        (listed once they have a published article).
      </p>
      <label className="block text-sm font-medium">
        Credentials
        <input
          value={credentials}
          maxLength={200}
          onChange={(e) => setCredentials(e.target.value)}
          placeholder="e.g. Registered Dietitian, MSc Nutrition"
          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
        />
        <span className="mt-1 block text-xs font-normal text-slate-500">
          Only real, verifiable qualifications. Leave blank if none.
        </span>
      </label>
      <label className="block text-sm font-medium">
        Bio
        <textarea
          value={bio}
          maxLength={1200}
          rows={4}
          onChange={(e) => setBio(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2"
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {saved ? <p className="text-sm text-emerald-700">Profile saved.</p> : null}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save profile"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold"
        >
          Close
        </button>
      </div>
    </form>
  );
}
