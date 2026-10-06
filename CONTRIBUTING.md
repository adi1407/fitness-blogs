# Contributing

## Branch → pull request → squash merge

`main` deploys automatically (Vercel for `frontend/`, Render for `backend/`), so nothing is pushed to it directly. Every change goes through a pull request:

```bash
git switch -c feat/short-description origin/main   # or fix/…, docs/…, chore/…, content/…
# make the change, run the checks below
git add -- <explicit paths>
git commit -m "Short imperative summary"
git push -u origin feat/short-description
gh pr create --fill --base main
# check the Vercel preview link on the PR
gh pr merge --squash --delete-branch
```

- **One logical change per PR** — e.g. "foods: add 10 more foods", "seo: rewrite 5 low-CTR titles". Small PRs are easier to review and to revert.
- **Squash merge** keeps `main` at one commit per change and triggers one deploy per merge.
- If a PR fixes a tracked issue, put `Closes #<number>` in the PR description.

## Before opening a PR

| Area | Command (run inside the folder) |
| --- | --- |
| `frontend/` | `npx tsc --noEmit -p .` · `npx eslint <changed paths>` · `npx next build` |
| `backend/` | `npx tsc --noEmit -p .` |
| `cms/` | `npm run build` |

## Never commit

- `backend/.env` or any other `.env*` file with real values (secrets live on Render/Vercel only).
- Build output: `.next/`, `dist/`, `node_modules/`.
- Stage files with explicit paths (`git add -- path/to/file`), not `git add .`.

## Content and data rules

- Food values must be traceable to IFCT 2017 (or USDA FoodData Central) and cite the food code.
- No medical cure claims; educational wording and "consult a professional" where relevant.
- URL and SEO conventions: see `docs/INFORMATION_ARCHITECTURE.md` and `docs/SEO_PLAYBOOK.md`.
