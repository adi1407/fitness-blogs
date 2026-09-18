import { useEffect, useState } from "react";
import { apiFetch, type StaffUser } from "@/lib/api/client";

/** Editor-facing writer directory (read-only). */
export default function WritersPage() {
  const [writers, setWriters] = useState<StaffUser[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const data = await apiFetch<{ users: StaffUser[] }>(
          "/admin/users?role=writer",
        );
        setWriters(data.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Writers</h1>
      <p className="mt-2 max-w-xl text-slate-600">
        Staff writers on the desk. Use the review queue to process submitted
        articles.
      </p>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {loading ? (
        <p className="mt-8 text-slate-500">Loading…</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {writers.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    No writers yet.
                  </td>
                </tr>
              ) : (
                writers.map((w) => (
                  <tr key={w.id}>
                    <td className="px-4 py-3 font-medium">{w.name}</td>
                    <td className="px-4 py-3 text-slate-600">{w.email}</td>
                    <td className="px-4 py-3">{w.isActive ? "Yes" : "No"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
