import type { AuthUser } from "./auth";
import type { MemberAuth } from "../middleware/memberAuth";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      member?: MemberAuth;
    }
  }
}

export {};
