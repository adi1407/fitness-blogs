import { useEffect, useState, type FormEvent } from "react";
import { apiFetch, type UrlRedirect } from "@/lib/api/client";
import { useAuth } from "@/context/AuthContext";

export default function RedirectsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [redirects, setRedirects] = useState<UrlRedirect[]>([]);
  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    const data = await apiFetch<{ redirects: UrlRedirect[] }>("/redirects");
    setRedirects(data.redirects);
  }

  useEffect(() => {
    void load().catch((err) =>
      setError(err instanceof Error ? err.message : "Failed to load"),
    );
  }, []);

  async function create(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await apiFetch("/redirects", {
        method: "POST",
        body: JSON.stringify({ fromPath, toPath }),
      });
      setFromPath("");
      setToPath("");
      setMessage("Redirect saved.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    }
  }

  async function deactivate(id: string) {
    await apiFetch(`/redirects/${id}/deactivate`, { method: "PATCH" });
    await load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Redirects</h1>
      <p className="mt-1 max-w-2xl text-slate-600">
        301s from old paths to new ones. Slug or category changes create these
        automatically; admins can add manual entries.
      </p>
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      {message ? (
        <p className="mt-4 text-sm text-emerald-700">{message}</p>
      ) : null}

      {isAdmin ? (
        <form
          onSubmit={(e) => void create(e)}
          className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-[1fr_1fr_auto]"
        >
          <label className="text-sm font-medium">
            From
            <input
              required
              value={fromPath}
              onChange={(e) => setFromPath(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="/blog/old/path/slug"
            />
          </label>
          <label className="text-sm font-medium">
            To
            <input
              required
              value={toPath}
              onChange={(e) => setToPath(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="/blog/new/path/slug"
            />
          </label>
          <div className="flex items-end">
            <button
              type="submit"
              className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600"
            >
              Add
            </button>
          </div>
        </form>
      ) : null}

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">To</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {redirects.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-slate-500"
                >
                  No redirects yet.
                </td>
              </tr>
            ) : (
              redirects.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-mono text-xs">{r.fromPath}</td>
                  <td className="px-4 py-3 font-mono text-xs">{r.toPath}</td>
                  <td className="px-4 py-3">{r.isActive ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 text-right">
                    {isAdmin && r.isActive ? (
                      <button
                        type="button"
                        onClick={() => void deactivate(r.id)}
                        className="text-xs font-semibold text-slate-600 hover:underline"
                      >
                        Deactivate
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
