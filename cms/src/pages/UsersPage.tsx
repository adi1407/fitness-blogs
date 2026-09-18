import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { apiFetch, type StaffRole, type StaffUser } from "@/lib/api/client";
import { useAuth } from "@/context/AuthContext";

export default function UsersPage() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState<StaffUser[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<StaffRole>("writer");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch<{ users: StaffUser[] }>("/admin/users");
      setUsers(data.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");
    try {
      await apiFetch<{ user: StaffUser }>("/admin/users", {
        method: "POST",
        body: JSON.stringify({ email, name, password, role }),
      });
      setMessage(`Created ${role} ${email}`);
      setEmail("");
      setName("");
      setPassword("");
      setRole("writer");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (me?.role !== "admin") {
    return (
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="mt-2 text-slate-600">Admin access required.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="mt-1 text-slate-600">
          Create staff accounts (admin / editor / writer).
        </p>
      </div>

      <form
        onSubmit={onCreate}
        className="grid max-w-2xl gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2"
      >
        <h2 className="text-lg font-semibold sm:col-span-2">Create user</h2>
        <label className="block text-sm font-medium">
          Name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium">
          Role
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as StaffRole)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          >
            <option value="writer">Writer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
          >
            {submitting ? "Creating…" : "Create user"}
          </button>
        </div>
      </form>

      {message ? (
        <p className="text-sm text-emerald-700">{message}</p>
      ) : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-slate-600">{u.email}</td>
                  <td className="px-4 py-3 capitalize">{u.role}</td>
                  <td className="px-4 py-3">{u.isActive ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
