import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  public readonly email: Locator;
  public readonly password: Locator;
  public readonly submit: Locator;
  public readonly form: Locator;

  public constructor(public readonly page: Page) {
    this.form = page.getByTestId('login-form');
    this.email = page.getByLabel('Email');
    this.password = page.getByLabel('Password');
    this.submit = page.getByRole('button', { name: 'Login' });
  }

  /** Navigates to the customer login route. */
  public async goto(): Promise<void> {
    await this.page.goto('/auth/login');
  }

  /** Submits customer credentials through the login form. */
  public async login(email: string, password: string): Promise<void> {
    const loginResponse = this.page.waitForResponse((response) =>
      response.url().endsWith('/users/login'),
    );
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
    await loginResponse;
  }
}
