import { expect, Page } from '@playwright/test';
import { pageTitles } from '../utils/testData/pageTitles';

export class BasePage {
  readonly page: Page;
  protected readonly path?: string;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path = this.path) {
    if (!path) {
      throw new Error(`${this.constructor.name} does not define a default path`);
    }

    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
    await this.assertLoaded();
  }

  async assertLoaded() {
    const expectedTitle = pageTitles[this.constructor.name as keyof typeof pageTitles];

    if (expectedTitle) {
      await expect(this.page).toHaveTitle(expectedTitle);
    }
  }

  async getTitle() {
    return this.page.title();
  }
}
