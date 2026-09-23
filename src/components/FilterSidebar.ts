import type { Locator, Page } from '@playwright/test';

export class FilterSidebar {
  public readonly container: Locator;
  public readonly sort: Locator;
  public readonly category: Locator;

  public constructor(page: Page) {
    this.container = page.getByTestId('filters');
    this.sort = page.getByTestId('sort');
    this.category = page.getByTestId('category');
  }

  /** Selects a catalog sort option. */
  public async sortBy(value: string): Promise<void> {
    await this.sort.selectOption(value);
  }

  /** Selects a category filter when the catalog exposes one. */
  public async selectCategory(value: string): Promise<void> {
    await this.category.selectOption(value);
  }
}
