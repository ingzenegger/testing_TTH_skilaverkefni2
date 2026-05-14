# Team Task Hub – Testing (skilaverkefni-2)

This project builds on the skilaverkefni-1 solution by adding a full testing setup: unit/component tests with Vitest, component stories with Storybook, and end-to-end tests with Cypress.

**skilaverkefni-1 repository:** _(https://github.com/CCP-2FaceMonkey/ntv-forritun-fk3-vor-2026/tree/main/solutions/skilaverkefni-1)_

---

## How to run

### Vitest (unit & component tests)

```bash
npm test          # watch mode
npm run test:ci   # single run (used in CI)
```

### Storybook

```bash
npm run storybook
```

Opens on http://localhost:6006

### Cypress (E2E)

Cypress runs against the built app on port 4173. You need to build and preview the app first:

```bash
npm run build
npm run preview   # starts on http://localhost:4173
```

Then in a separate terminal:

```bash
npm run cypress:run   # headless
```

Or to open the interactive Cypress UI:

```bash
npx cypress open
```

---

## Test structure

Tests are colocated with their components throughout `src/`, and E2E tests are in `cypress/e2e/`.

---

## Bugs found and fixed

Two bugs were identified using tests:

1. **Edit task dialog not opening** — found via `Tasks.test.tsx`. When triggering an edit on a task, the dialog was not opening in edit mode.

2. **Deleting a project did not remove its tasks** — found via `globalReducer.test.ts`. The `REMOVE_PROJECT` action was not cleaning up tasks belonging to the deleted project.

---

## CI

The CI pipeline runs on push and pull request to `main`. It runs:

- `npm run test:ci` (Vitest)
- Builds the app, starts the preview server, and runs `npm run cypress:run`

CI results are visible in the GitHub Actions tab of the repository.