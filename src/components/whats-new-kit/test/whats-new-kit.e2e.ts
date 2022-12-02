import { newE2EPage } from '@stencil/core/testing';

describe('whats-new-kit', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<whats-new-kit></whats-new-kit>');

    const element = await page.find('whats-new-kit');
    expect(element).toHaveClass('hydrated');
  });
});
