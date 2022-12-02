import { newSpecPage } from '@stencil/core/testing';
import { WhatsNewKit } from '../whats-new-kit';

describe('whats-new-kit', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WhatsNewKit],
      html: `<whats-new-kit></whats-new-kit>`,
    });
    expect(page.root).toEqualHtml(`
      <whats-new-kit>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </whats-new-kit>
    `);
  });
});
