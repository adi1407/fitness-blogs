import { useState } from "react";
import { CALCULATOR_PAGES } from "@/constants/calculators";

const CALCULATORS: { path: string; label: string }[] = [
  ...CALCULATOR_PAGES,
  { path: "/tools", label: "All calculators" },
];

type Props = {
  body: string;
  disabled?: boolean;
  onInsert: (nextBody: string) => void;
};

export function CalculatorInsertHelper({ body, disabled, onInsert }: Props) {
  const [path, setPath] = useState(CALCULATORS[0].path);
  const [message, setMessage] = useState("");

  function insert() {
    const calc = CALCULATORS.find((c) => c.path === path) ?? CALCULATORS[0];
    const paragraph = `<p><strong>Next step:</strong> Use the free <a href="${calc.path}">${calc.label}</a> to get a personalised number, then come back to this guide.</p>`;
    const next = body.trim()
      ? `${body.trim()}\n${paragraph}`
      : paragraph;
    onInsert(next);
    setMessage(`Appended link to ${calc.label}.`);
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold">Calculator CTA</h2>
      <p className="mt-1 text-sm text-slate-500">
        Append a calculator link paragraph to the article body (engagement
        loop). Does not change taxonomy-derived CTAs on the public site.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <select
          value={path}
          onChange={(e) => setPath(e.target.value)}
          disabled={disabled}
          className="min-w-[14rem] flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          {CALCULATORS.map((c) => (
            <option key={c.path} value={c.path}>
              {c.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          disabled={disabled}
          onClick={insert}
          className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-600"
        >
          Append to body
        </button>
      </div>
      {message ? (
        <p className="mt-2 text-sm text-emerald-700">{message}</p>
      ) : null}
    </section>
  );
}
