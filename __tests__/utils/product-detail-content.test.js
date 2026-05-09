import {
  extractProductDetailContent,
  hasStructuredSpecs,
} from '../../src/utils/product-detail-content';

describe('extractProductDetailContent', () => {
  it('extracts highlights and specs from structured list HTML', () => {
    const html = `
      <p>&nbsp;</p>
      <ul>
        <li><strong>Écran</strong> : 1,43 pouces AMOLED</li>
        <li><strong>Connectivité</strong> : Bluetooth 5.3</li>
        <li><strong>Autonomie</strong> : Jusqu’à 12 jours</li>
        <li><strong>Étanchéité</strong> : IP68</li>
        <li><strong>Garantie</strong> : 6 mois</li>
      </ul>
      <p>Montre connectée premium pour usage quotidien.</p>
    `;

    const result = extractProductDetailContent(html);

    expect(result.highlights).toEqual([
      { label: 'Écran', value: '1,43 pouces AMOLED' },
      { label: 'Connectivité', value: 'Bluetooth 5.3' },
      { label: 'Autonomie', value: 'Jusqu’à 12 jours' },
      { label: 'Étanchéité', value: 'IP68' },
      { label: 'Garantie', value: '6 mois' },
    ]);
    expect(result.specs).toEqual([
      { label: 'Écran', value: '1,43 pouces AMOLED' },
      { label: 'Connectivité', value: 'Bluetooth 5.3' },
      { label: 'Autonomie', value: 'Jusqu’à 12 jours' },
      { label: 'Étanchéité', value: 'IP68' },
      { label: 'Garantie', value: '6 mois' },
    ]);
    expect(result.cleanedDescriptionHtml).toContain('Montre connectée premium');
    expect(result.cleanedDescriptionHtml).not.toContain('&nbsp;');
    expect(result.cleanedDescriptionHtml).not.toContain('<p>\u00a0</p>');
  });

  it('falls back to cleaned description when no structured specs are found', () => {
    const html = '<p>Une montre élégante pour tous les jours.</p>';

    const result = extractProductDetailContent(html);

    expect(hasStructuredSpecs(result)).toBe(false);
    expect(result.highlights).toEqual([]);
    expect(result.specs).toEqual([]);
    expect(result.cleanedDescriptionHtml).toContain('Une montre élégante');
  });

  it('preserves paragraphs that contain meaningful non-text content', () => {
    const html = `
      <p>&nbsp;</p>
      <p><img src="https://example.com/watch.jpg" alt="Montre" /></p>
      <p>&nbsp;</p>
    `;

    const result = extractProductDetailContent(html);

    expect(result.cleanedDescriptionHtml).toContain('<p><img src="https://example.com/watch.jpg" alt="Montre"></p>');
    expect(result.cleanedDescriptionHtml).not.toContain('<p> </p>');
  });

  it('normalizes labels ending with trailing colon for highlight dedupe and ordering', () => {
    const html = `
      <ul>
        <li><strong>Garantie :</strong> 6 mois</li>
        <li><strong>Écran :</strong> AMOLED</li>
        <li><strong>Écran</strong> LCD</li>
      </ul>
    `;

    const result = extractProductDetailContent(html);

    expect(result.highlights).toEqual([
      { label: 'Écran', value: 'AMOLED' },
      { label: 'Garantie', value: '6 mois' },
    ]);
  });
});
