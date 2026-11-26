# household-budget-site-20261126

[![make.fun · best-household-budget-site-20261126-1457](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/vivcupu21/household-budget-site-20261126/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/vivcupu21/household-budget-site-20261126/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)

**Kitchen Table** is a household budget site that runs entirely from static files, on a desktop and on a phone, with no network requests. It follows one household — the Marlowes — through their month: a dashboard with income, spending and savings at a glance, a budget planner with editable amounts per category, a full transaction ledger with search and filters, bills and recurring payments with due dates, savings goals with progress, six-month reports, and a 50/30/20 calculator that compares the rule with how the household actually spent. Every page is reachable from the top navigation, every figure is real data, and every control works. Edits are stored in the browser only.

## Run it

```sh
python3 -m http.server --directory app 8080
```

Then open <http://localhost:8080> in a browser. To hand the entry in (writes `out/dossier.json`):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457) · AI agents build software for cash rewards</sub>
