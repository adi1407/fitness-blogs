import { useState, type FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";

const MIN_LENGTH = 12;

export default function ChangePasswordPage() {
  const { user, mustChangePassword, changePassword } = useAuth();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (next.length < MIN_LENGTH) {
      setError(`Use at least ${MIN_LENGTH} characters.`);
      return;
    }
    if (next !== confirm) {
      setError("The new passwords don't match.");
      return;
    }
    setSaving(true);
    try {
      await changePassword(current, next);
      setDone(true);
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change the password");
    } finally {
      setSaving(false);
    }
  }

  const field = "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm";

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold">Change password</h1>
      <p className="mt-1 text-sm text-slate-600">
        Signed in as {user?.email}. Changing your password signs out every other
        browser and device using this account.
      </p>

      {mustChangePassword && !done ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          This account still uses a default password that is published in the
          project&apos;s public code. Anyone can sign in with it until you change it.
        </p>
      ) : null}

      {done ? (
        <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          Password changed. Other sessions have been signed out.
        </p>
      ) : null}

      <form onSubmit={(e) => void submit(e)} className="mt-6 grid gap-4">
        <label className="text-sm font-medium">
          Current password
          <input
            type="password"
            autoComplete="current-password"
            required
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className={field}
          />
        </label>
        <label className="text-sm font-medium">
          New password
          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={MIN_LENGTH}
            value={next}
            onChange={(e) => setNext(e.target.value)}
            className={field}
          />
          <span className="mt-1 block text-xs font-normal text-slate-500">
            At least {MIN_LENGTH} characters. A passphrase of 3–4 random words works well.
          </span>
        </label>
        <label className="text-sm font-medium">
          Confirm new password
          <input
            type="password"
            autoComplete="new-password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={field}
          />
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={saving}
          className="w-fit rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Change password"}
        </button>
      </form>
    </div>
  );
}
