import type { Locator, Page } from '@playwright/test';

import { FilterSidebar } from '../components/FilterSidebar.js';
import { NavBar } from '../components/NavBar.js';
import { ProductCard } from '../components/ProductCard.js';

export class HomePage {
  public readonly searchInput: Locator;
  public readonly nextPage: Locator;
  public readonly previousPage: Locator;
  public readonly filterSidebar: FilterSidebar;
  public readonly navBar: NavBar;

  public constructor(private readonly page: Page) {
    this.searchInput = page.getByTestId('search-query');
    this.nextPage = page.getByTestId('pagination-next');
    this.previousPage = page.getByTestId('pagination-prev');
    this.filterSidebar = new FilterSidebar(page);
    this.navBar = new NavBar(page);
  }

  /** Navigates to the catalog home page. */
  public async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /** Searches the catalog by a keyword. */
  public async search(keyword: string): Promise<void> {
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
  }

  /** Returns a catalog product card by its zero-based rendered index. */
  public productCard(index: number): ProductCard {
    return new ProductCard(this.page.locator('a[data-test^="product-"]').nth(index));
  }

  /** Opens the next catalog page. */
  public async goToNextPage(): Promise<void> {
    await this.nextPage.click();
  }

  /** Opens the previous catalog page. */
  public async goToPreviousPage(): Promise<void> {
    await this.previousPage.click();
  }
}
