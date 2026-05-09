import sanitizeRichHtml from '@lib/sanitize-rich-html';

type SpecItem = {
  label: string;
  value: string;
};

type ProductDetailContent = {
  highlights: SpecItem[];
  specs: SpecItem[];
  cleanedDescriptionHtml: string;
};

const HIGHLIGHT_PRIORITY = [
  'écran',
  'connectivité',
  'autonomie',
  'batterie',
  'étanchéité',
  'garantie',
  'dimensions',
  'poids',
];

function normalizeSpaces(value: string) {
  return value.replace(/\u00a0|&nbsp;/gi, ' ').replace(/\s+/g, ' ').trim();
}

function normalizeLabel(label: string) {
  return normalizeSpaces(label).replace(/\s*:\s*$/, '');
}

function getPriority(label: string) {
  const normalizedLabel = normalizeLabel(label).toLocaleLowerCase();
  const index = HIGHLIGHT_PRIORITY.indexOf(normalizedLabel);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

function removeEmptyParagraphs(root: HTMLElement) {
  root.querySelectorAll('p').forEach((paragraph) => {
    const content = normalizeSpaces(paragraph.innerHTML.replace(/<[^>]+>/g, ''));
    const hasMeaningfulNonTextContent = Boolean(
      paragraph.querySelector('img,video,iframe,svg,canvas,object,embed,audio,picture')
    );

    if (!content && !hasMeaningfulNonTextContent) {
      paragraph.remove();
    }
  });
}

function extractSpecs(root: HTMLElement) {
  const specs: SpecItem[] = [];

  root.querySelectorAll('li').forEach((item) => {
    const strong = item.querySelector('strong');

    if (!strong) {
      return;
    }

    const rawLabel = normalizeLabel(strong.textContent || '');
    const listText = normalizeSpaces(item.textContent || '');
    const strongText = normalizeSpaces(strong.textContent || '');
    const value = normalizeSpaces(listText.replace(strongText, '').replace(/^\s*:\s*/, ''));

    if (rawLabel && value) {
      specs.push({
        label: rawLabel,
        value,
      });
    }
  });

  return specs;
}

function extractHighlights(specs: SpecItem[]) {
  const seen = new Set<string>();

  return [...specs]
    .sort((a, b) => {
      const priorityA = getPriority(a.label);
      const priorityB = getPriority(b.label);

      if (priorityA === priorityB) {
        return 0;
      }

      return priorityA - priorityB;
    })
    .filter((item) => {
      const normalizedLabel = item.label.toLocaleLowerCase();
      if (seen.has(normalizedLabel)) {
        return false;
      }

      seen.add(normalizedLabel);
      return true;
    })
    .slice(0, 8);
}

export function extractProductDetailContent(html: string): ProductDetailContent {
  const sanitizedHtml = sanitizeRichHtml(html || '');
  const parser = new DOMParser();
  const document = parser.parseFromString(`<div>${sanitizedHtml}</div>`, 'text/html');
  const root = document.body.firstElementChild as HTMLElement | null;

  if (!root) {
    return {
      highlights: [],
      specs: [],
      cleanedDescriptionHtml: '',
    };
  }

  const specs = extractSpecs(root);

  removeEmptyParagraphs(root);

  return {
    highlights: extractHighlights(specs),
    specs,
    cleanedDescriptionHtml: root.innerHTML.replace(/&nbsp;/gi, ' ').replace(/\u00a0/g, ' '),
  };
}

export function hasStructuredSpecs(result: { specs: unknown[] }) {
  return result.specs.length > 0;
}
