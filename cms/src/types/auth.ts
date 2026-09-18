export type StaffRole = "admin" | "editor" | "writer";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: StaffRole;
};

export function canPublish(role: StaffRole): boolean {
  return role === "admin" || role === "editor";
}

export function canViewAuditLogs(role: StaffRole): boolean {
  return role === "admin";
}
