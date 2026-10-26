const STEPS: { title: string; body: string; href?: string }[] = [
  {
    title: "Enable the Search Console API",
    body: "In Google Cloud Console pick (or create) a project, then APIs & Services → Library → “Google Search Console API” → Enable.",
    href: "https://console.cloud.google.com/apis/library/searchconsole.googleapis.com",
  },
  {
    title: "Create a service account key",
    body: "IAM & Admin → Service accounts → Create (no roles needed). Open it → Keys → Add key → JSON. A .json file downloads; keep it private.",
    href: "https://console.cloud.google.com/iam-admin/serviceaccounts",
  },
  {
    title: "Give it read access in Search Console",
    body: "Search Console → fitlives.in → Settings → Users and permissions → Add user. Paste the service account email (…@….iam.gserviceaccount.com), permission “Restricted”.",
    href: "https://search.google.com/search-console/users",
  },
  {
    title: "Add the key to the API on Render",
    body: "Render → fitlives API → Environment → add GSC_SERVICE_ACCOUNT_JSON and paste the whole file contents. Saving redeploys the API.",
  },
  {
    title: "Wait for the first sync",
    body: "About a minute after the deploy the API backfills up to 16 months of data, then refreshes twice a day. Reload this page.",
  },
];

export function SeoSetupCard() {
  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-slate-900">Connect Google Search Console</h2>
      <p className="mt-1 max-w-2xl text-sm text-slate-600">
        One-time setup, about 10 minutes. The API reads Search Console with its own read-only
        Google account, so no one has to sign in and nothing on the site changes.
      </p>
      <ol className="mt-4 space-y-4">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
              {i + 1}
            </span>
            <div className="text-sm">
              <p className="font-semibold text-slate-900">{step.title}</p>
              <p className="mt-0.5 text-slate-600">{step.body}</p>
              {step.href ? (
                <a
                  href={step.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-xs font-semibold text-sky-700 hover:underline"
                >
                  Open →
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
