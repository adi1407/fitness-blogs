import Link from "next/link";
import type { MuscleGroup } from "@/lib/api/knowledge";
import { MUSCLE_GROUP_GUIDES } from "@/features/knowledge/content/muscleGroupGuides";

const PROGRESSIVE_OVERLOAD =
  "/blog/muscle-building/training-programs/what-is-progressive-overload/399232323";
const BUILD_MUSCLE_TIMELINE =
  "/blog/muscle-building/muscle-growth-hypertrophy/how-long-does-it-take-to-build-muscle/739011960";

export function MuscleGroupGuideSection({
  group,
  label,
}: {
  group: MuscleGroup;
  label: string;
}) {
  const guide = MUSCLE_GROUP_GUIDES[group];
  const lower = label.toLowerCase();

  return (
    <section className="article-body mt-16 max-w-3xl" aria-labelledby="group-guide">
      <h2 id="group-guide">How to train your {lower}</h2>
      <h3>The muscles</h3>
      <p>{guide.anatomy}</p>
      <h3>How much to train each week</h3>
      <p>{guide.volume}</p>
      <h3>Sample {lower} session</h3>
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets × reps</th>
          </tr>
        </thead>
        <tbody>
          {guide.session.map((row) => (
            <tr key={row.slug}>
              <td>
                <Link href={`/exercises/${group}/${row.slug}`}>{row.label}</Link>
              </td>
              <td>{row.dose}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Add reps or weight a little each week — see{" "}
        <Link href={PROGRESSIVE_OVERLOAD}>what progressive overload is</Link> and{" "}
        <Link href={BUILD_MUSCLE_TIMELINE}>how long it takes to build muscle</Link>. For
        full weekly plans, browse our <Link href="/programs">training programs</Link>.
      </p>
      <h3>Tips</h3>
      <ul>
        {guide.tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
      <h3>FAQ</h3>
      {guide.faq.map((f) => (
        <div key={f.q}>
          <p>
            <strong>{f.q}</strong>
          </p>
          <p>{f.a}</p>
        </div>
      ))}
    </section>
  );
}
