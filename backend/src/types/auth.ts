export type StaffRole = "admin" | "editor" | "writer";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: StaffRole;
};
