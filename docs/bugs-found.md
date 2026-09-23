# Bugs Found

The following defects were observed while validating the suite against the public application. They are documented without weakening the corresponding tests.

## Serious accessibility violations on the home page

- **Severity:** High
- **Steps:** Open the home page and run the `home page has no serious accessibility violations` test.
- **Expected:** Lists contain only permitted list-item children.
- **Actual:** Multiple filter lists directly contain `fieldset` elements, triggering axe rule `list` with serious impact.
- **Caught by:** `tests/a11y/pages.a11y.spec.ts`

## Critical accessibility violation on the login page

- **Severity:** Critical
- **Steps:** Open `/auth/login` and run the `login page has no serious accessibility violations` test.
- **Expected:** Every button has discernible text or an accessible name.
- **Actual:** A `.btn-outline-secondary` button has no visible text, accessible name, or title, triggering axe rule `button-name` with critical impact.
- **Caught by:** `tests/a11y/pages.a11y.spec.ts`

## Route mismatch avoided by normal navigation

- **Severity:** Medium
- **Steps:** Navigate directly to `/#/account` on the current production deployment.
- **Expected:** The authenticated account overview renders.
- **Actual:** The catalog remains visible; the working route is `/account`.
- **Caught during:** Authenticated storage-state validation.
- **Test response:** Page objects use the deployed normal-path routes and retain a heading assertion.

## Add-to-cart action completion race

- **Severity:** Medium
- **Steps:** Click Add to cart and immediately navigate to checkout.
- **Expected:** The newly added item is present in the cart.
- **Actual:** The UI issues create-cart and add-item requests asynchronously; navigating before the add-item response completes can show an empty cart.
- **Caught during:** `tests/ui/product-cart.spec.ts`.
- **Test response:** `ProductPage.addProductToCart()` waits for the specific add-item response without using a hard wait.

## With-bugs product API violates the documented response contract

- **Severity:** High
- **Steps:** Run the API suite with `ENV=with-bugs`.
- **Expected:** Product IDs and nested IDs are strings, and product flags are booleans as documented by the production contract.
- **Actual:** The response contains numeric IDs, numeric boolean flags, and missing fields such as `in_stock`; Zod rejects the payload.
- **Caught by:** `tests/api/products.api.spec.ts` and `tests/api/negative.api.spec.ts`.

## With-bugs account route does not render the authenticated account view

- **Severity:** High
- **Steps:** Generate customer storage state, then open `/account` with `ENV=with-bugs`.
- **Expected:** The authenticated account overview renders a `My account` page title.
- **Actual:** The expected account content is absent.
- **Caught by:** `tests/ui/auth-state.spec.ts` and `tests/ui/page-object-smoke.spec.ts`.

## With-bugs catalog pagination controls are missing

- **Severity:** Medium
- **Steps:** Open the catalog and select `Price (Low - High)` with `ENV=with-bugs`.
- **Expected:** Previous and next pagination controls are available.
- **Actual:** The controls are not rendered.
- **Caught by:** `tests/ui/catalog.spec.ts`.

## With-bugs login flow does not submit the expected API request

- **Severity:** High
- **Steps:** Submit valid or invalid credentials through `/auth/login` with `ENV=with-bugs`.
- **Expected:** Valid credentials navigate to the account page and invalid credentials show an error.
- **Actual:** The expected login form/API behavior is absent or does not complete within the Playwright action contract.
- **Caught by:** `tests/ui/login.spec.ts`.
