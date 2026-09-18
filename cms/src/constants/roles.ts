export type StaffRole = "admin" | "editor" | "writer";

export function canPublish(role: StaffRole): boolean {
  return role === "admin" || role === "editor";
}

export function canViewLogs(role: StaffRole): boolean {
  return role === "admin";
}

export function isWriter(role: StaffRole): boolean {
  return role === "writer";
}
