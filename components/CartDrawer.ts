import { Page, Locator, expect } from '@playwright/test';

export class Cart {
  private readonly root: Locator;

  readonly cartLink: Locator;
  readonly cartLinkItemsCount: Locator;
  readonly emptyCartMessage: Locator;
  readonly removeCartItemlinks: Locator;

  constructor(private page: Page) {
    this.root = page.locator('#drawer');
    this.cartLink = this.page.locator('#minicart>.toggle-drawer.cart');
    this.cartLinkItemsCount = this.cartLink.locator('span.count');
    this.emptyCartMessage = this.root.locator('p.empty');
    this.removeCartItemlinks = this.root.locator('a.removeLine');
  }

  async openCart() {
    if (await this.root.isHidden()) {
      await this.cartLink.click();
    }
  }

  async assertCartIsEmpty() {
    await this.openCart();
    await expect(this.emptyCartMessage).toBeVisible();
    await expect(this.emptyCartMessage).toHaveText('Your cart is empty');
  }

  async assertCartCountInHeader(count: number) {
    await expect(this.cartLink).toBeVisible();
    await expect(this.cartLinkItemsCount).toHaveText(count.toString());
  }

  async removeAllCartItems() {
    await this.openCart();
    const removeLinksCount = await this.removeCartItemlinks.count();
    for (let i = 0; i < removeLinksCount; i++) {
      const itemRelNumber = await this.removeCartItemlinks.nth(i).getAttribute('rel');
      await this.removeCartItemlinks.nth(i).click();
      const removeLinkOfItemWithRel = this.root.locator(
        `a.removeLine[data-rel="${itemRelNumber}"]`
      );
      await expect(removeLinkOfItemWithRel).toHaveCount(0, { timeout: 10000 });
    }
    await this.assertCartIsEmpty();
  }
}
