import type { Locator, Page } from '@playwright/test';

import { NavBar } from '../components/NavBar.js';

export class AccountPage {
  public readonly pageTitle: Locator;
  public readonly profileLink: Locator;
  public readonly favoritesLink: Locator;
  public readonly navBar: NavBar;

  public constructor(private readonly page: Page) {
    this.pageTitle = page.getByTestId('page-title');
    this.profileLink = page.getByTestId('nav-profile');
    this.favoritesLink = page.getByTestId('nav-favorites');
    this.navBar = new NavBar(page);
  }

  /** Navigates to the authenticated account overview. */
  public async goto(): Promise<void> {
    await this.page.goto('/account');
  }

  /** Opens the account profile view. */
  public async openProfile(): Promise<void> {
    await this.profileLink.click();
  }
}
