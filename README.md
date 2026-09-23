# Toolshop Playwright E2E

A production-oriented TypeScript and Playwright foundation for end-to-end testing of [Practice Software Testing](https://practicesoftwaretesting.com).

## Phase 1 status

The framework currently covers typed API clients, API-based authentication, reusable page objects and fixtures, UI/API/hybrid checks, and Axe accessibility scans. CI, Docker, and defect documentation are included alongside the test foundation.

## Coverage

| Area          | Current coverage                                                                    |
| ------------- | ----------------------------------------------------------------------------------- |
| UI            | Login, catalog search/sort/pagination, product details, cart, authenticated account |
| API           | Authentication, products, search/filtering, cart lifecycle, Zod response validation |
| Hybrid        | API product data compared with UI detail and cart behavior                          |
| Accessibility | Home, product, login, and checkout with serious/critical Axe gating                 |

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
npm run test:a11y
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

Run the suite in Docker with the local environment configured in `.env`:

```bash
docker compose run --rm tests
```

For a local Toolshop Docker stack, set `ENV=local` and start the application services before running the tests.

See [the architecture guide](docs/architecture.md) for layer responsibilities and [the defect report](docs/bugs-found.md) for findings from the intentional-bugs and accessibility runs.

## Test conventions

Tests use Playwright web-first assertions and user-facing locators. Hard waits are not used. The configured test ID attribute is `data-test`. Tests are designed to run independently and in parallel.

## Roadmap

- Phase 2: typed API clients and Zod response schemas
- Phase 3: API-based authentication and storage state
- Phase 4: page objects, components, and fixtures
- Phase 5: UI, API, hybrid, and accessibility coverage
- Phase 6: sharded GitHub Actions workflows and reports
