# Toolshop Playwright E2E

A production-oriented TypeScript and Playwright foundation for end-to-end testing of [Practice Software Testing](https://practicesoftwaretesting.com).

## Phase 1 status

This phase provides the environment-aware Playwright configuration, strict TypeScript setup, linting, formatting, browser projects, and a minimal smoke test. Page objects, API clients, fixtures, authentication, CI, and the broader test suites are added in later phases.

## Prerequisites

- Node.js current LTS
- npm
- Internet access for the public Toolshop environment

## Setup

```bash
npm ci
npx playwright install
copy .env.example .env
```

On macOS/Linux, use `cp .env.example .env` instead of `copy`.

The default environment is `prod`. Set `ENV` in `.env` to one of:

- `prod`
- `with-bugs`
- `sprint4`
- `local`

## Commands

```bash
npm test
npm run test:smoke
npm run test:smoke -- --project=chromium
npm run test:ui
npm run test:api
npm run lint
npm run typecheck
npm run format:check
npm run format
npm run report
```

To list tests against the intentional-bugs environment in PowerShell:

```powershell
$env:ENV='with-bugs'; npx playwright test --list
```

On macOS/Linux:

```bash
ENV=with-bugs npx playwright test --list
```

Run one browser explicitly with `--project=chromium`, `--project=firefox`, or `--project=webkit`.

## Test conventions

Tests use Playwright web-first assertions and user-facing locators. Hard waits are not used. The configured test ID attribute is `data-test`. Tests are designed to run independently and in parallel.

## Roadmap

- Phase 2: typed API clients and Zod response schemas
- Phase 3: API-based authentication and storage state
- Phase 4: page objects, components, and fixtures
- Phase 5: UI, API, hybrid, and accessibility coverage
- Phase 6: sharded GitHub Actions workflows and reports
