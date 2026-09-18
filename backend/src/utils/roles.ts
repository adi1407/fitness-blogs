import type { StaffRole } from "../types/auth";

export const STAFF_ROLES = ["admin", "editor", "writer"] as const;

export function isAdmin(role: string): boolean {
  return role === "admin";
}

export function isEditor(role: string): boolean {
  return role === "editor" || role === "admin";
}

export function canPublish(role: string): boolean {
  return role === "admin" || role === "editor";
}

export function canManageUsers(role: string): boolean {
  return role === "admin";
}

export function canViewAuditLogs(role: string): boolean {
  return role === "admin";
}

/** Writers may only mutate their own drafts/rejected; editors/admins any. */
export function canEditArticle(
  role: string,
  authorId: string | null,
  userId: string,
  status: string,
): boolean {
  if (role === "admin" || role === "editor") return true;
  if (role !== "writer") return false;
  if (authorId !== userId) return false;
  return status === "draft" || status === "rejected";
}

export type { StaffRole };
