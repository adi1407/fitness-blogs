/** Simple responsive data table for calculator content. */
export function CalcTable({
  caption,
  head,
  rows,
}: {
  caption?: string;
  head: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table
        className={`w-full border-collapse overflow-hidden rounded-xl border border-border text-left text-[13px] sm:text-sm ${head.length > 3 ? "min-w-[32rem]" : ""}`}
      >
        {caption ? (
          <caption className="mb-2 text-left text-xs text-muted-foreground">
            {caption}
          </caption>
        ) : null}
        <thead className="bg-muted/60">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-2.5 py-2.5 align-bottom font-semibold text-foreground sm:px-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={
                    j === 0
                      ? "px-2.5 py-2.5 align-top font-medium text-foreground sm:px-3"
                      : "px-2.5 py-2.5 align-top tabular-nums text-foreground/80 sm:px-3"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
