import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch, type StaffNotification } from "@/lib/api/client";

export default function NotificationsPage() {
  const [items, setItems] = useState<StaffNotification[]>([]);
  const [error, setError] = useState("");

  async function load() {
    const data = await apiFetch<{
      notifications: StaffNotification[];
    }>("/notifications?limit=50");
    setItems(data.notifications);
  }

  useEffect(() => {
    void load().catch((err) =>
      setError(err instanceof Error ? err.message : "Failed to load"),
    );
  }, []);

  async function markAll() {
    await apiFetch("/notifications/read-all", { method: "POST" });
    await load();
  }

  async function openOne(n: StaffNotification) {
    if (!n.isRead) {
      await apiFetch(`/notifications/${n.id}/read`, { method: "POST" });
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="mt-1 text-slate-600">
            Submit, publish, and review events for your role.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void markAll()}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          Mark all read
        </button>
      </div>
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      <ul className="mt-6 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
        {items.length === 0 ? (
          <li className="px-4 py-8 text-center text-sm text-slate-500">
            No notifications yet.
          </li>
        ) : (
          items.map((n) => (
            <li key={n.id} className={n.isRead ? "opacity-70" : ""}>
              <Link
                to={n.href || "/"}
                onClick={() => void openOne(n)}
                className="block px-4 py-3 hover:bg-slate-50"
              >
                <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                {n.body ? (
                  <p className="mt-0.5 text-sm text-slate-600">{n.body}</p>
                ) : null}
                <p className="mt-1 text-xs text-slate-400">
                  {new Date(n.createdAt).toLocaleString()}
                  {!n.isRead ? " · Unread" : ""}
                </p>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
