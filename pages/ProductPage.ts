import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export type ProductOptions = Partial<Record<string, string>>;
export type SelectedProductOptions = Record<string, string>;

type SelectOptionData = {
  value: string;
  text: string;
  disabled: boolean;
};

export class ProductPage extends BasePage {
  readonly addToCartButton = this.page.locator('input#add');
  readonly productName = this.page.locator('h1[itemprop="name"]');
  readonly productOptionLabels = this.page.locator('.selector-wrapper label');

  async assertLoaded(productName?: string) {
    await super.assertLoaded();

    if (!productName) {
      throw new Error('Product title is required to assert the product page');
    }

    await expect(this.productName).toHaveText(new RegExp(productName, 'i'));
    await expect(this.addToCartButton).toBeVisible();
  }

  // For every displayed product option, use the requested value when provided.
  // If no value is provided, pick a random available one and return what was selected.
  async addToCart(productOptions?: ProductOptions): Promise<SelectedProductOptions> {
    const requestedOptions = this.normalizeOptions(productOptions ?? {});
    const selectedOptions: SelectedProductOptions = {};
    const optionNames = (await this.productOptionLabels.allTextContents())
      .map(optionName => optionName.trim())
      .filter(Boolean);

    for (const optionName of optionNames) {
      const optionKey = this.normalizeOptionKey(optionName);
      const selectedValue = await this.selectProductOption(optionName, requestedOptions[optionKey]);

      if (selectedValue) {
        selectedOptions[optionKey] = selectedValue;
      }
    }

    await this.addToCartButton.click();
    return selectedOptions;
  }

  private normalizeOptionKey(optionName: string): string {
    return optionName.trim().toLowerCase();
  }

  private normalizeOptions(productOptions: ProductOptions): ProductOptions {
    return Object.fromEntries(
      Object.entries(productOptions).map(([key, value]) => [this.normalizeOptionKey(key), value])
    );
  }

  // Each option is found by its label text, for example Size, Color, Material.
  private async selectProductOption(
    optionName: string,
    requestedValue: string | undefined
  ): Promise<string | undefined> {
    const selectLocator = this.page.getByLabel(optionName, { exact: true });

    if ((await selectLocator.count()) === 0) {
      return undefined;
    }

    const availableOptions = await this.getAvailableOptions(selectLocator);

    if (availableOptions.length === 0) {
      return undefined;
    }

    const chosenOption = requestedValue
      ? availableOptions.find(
          (option: SelectOptionData) =>
            option.text.toLowerCase() === requestedValue.toLowerCase() ||
            option.value.toLowerCase() === requestedValue.toLowerCase()
        )
      : availableOptions[Math.floor(Math.random() * availableOptions.length)];

    if (!chosenOption) {
      throw new Error(`Requested ${optionName} option "${requestedValue}" was not found`);
    }

    if (chosenOption.value) {
      await selectLocator.selectOption({ value: chosenOption.value });
    } else {
      await selectLocator.selectOption({ label: chosenOption.text });
    }

    return chosenOption.text;
  }

  // Ignore placeholder values such as "Choose" or "Select" and only keep real options.
  private async getAvailableOptions(selectLocator: Locator): Promise<SelectOptionData[]> {
    const options = await selectLocator.locator('option').evaluateAll(nodes =>
      nodes.map((node): SelectOptionData => {
        const optionNode = node as HTMLOptionElement;

        return {
          value: optionNode.value ?? '',
          text: optionNode.textContent?.trim() ?? '',
          disabled: optionNode.disabled,
        };
      })
    );

    return options.filter(
      option => option.text && !option.disabled && !/choose|select/i.test(option.text)
    );
  }
}
