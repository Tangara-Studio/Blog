# Multilingual Support Documentation

## Overview

This blog now supports two languages:
- **English (en)** - Default language
- **Spanish (es)** - Alternate language

## URL Structure

- English pages: `https://blog.tangara.studio/` (root)
- Spanish pages: `https://blog.tangara.studio/es/`

### Examples:
- English homepage: `/`
- Spanish homepage: `/es/`
- English post: `/blog/2025-01-04-welcome`
- Spanish post: `/es/blog/2025-01-04-bienvenidos`
- English tags: `/tags`
- Spanish tags: `/es/tags`

## Creating Content

### Blog Posts

When creating a new blog post (either via CMS or manually), add the `lang` field:

```markdown
---
title: 'Your Post Title'
description: 'Your description'
author: 'tangara-studio'
pubDate: 2025-01-04
heroImage: '/images/your-image.jpg'
tags: ['devlog', 'tutorial']
draft: false
lang: en  # or 'es' for Spanish
---

Your content here...
```

### Using Decap CMS

1. Go to `/admin`
2. Click "New Blog Posts"
3. Fill in the fields
4. Select the language from the "Idioma" dropdown (English or Spanish)
5. Save and publish

## Translation Files

UI translations are located in `src/i18n/ui.ts`. To add new translations:

```typescript
export const ui = {
  en: {
    'your.key': 'Your English text',
  },
  es: {
    'your.key': 'Tu texto en español',
  },
} as const;
```

## Using Translations in Components

```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<h1>{t('hero.title')}</h1>
<p>{t('hero.description')}</p>
```

## SEO Implementation

The blog includes proper SEO metadata for multilingual support:

- `hreflang` tags for alternate languages
- Language-specific canonical URLs
- Open Graph locale tags
- Language-specific sitemaps

## Language Switcher

The language switcher is displayed in the header navigation. It:
- Shows current language as active
- Maintains the same page context when switching languages
- Uses language codes (EN/ES) for clarity

## File Structure

```
src/
├── i18n/
│   ├── ui.ts          # Translation strings
│   └── utils.ts       # i18n utility functions
├── pages/
│   ├── index.astro    # English homepage
│   ├── blog/
│   │   └── [slug].astro  # English blog posts
│   ├── tags/
│   │   ├── index.astro   # English tags page
│   │   └── [tag].astro   # English tag detail
│   └── es/            # Spanish pages
│       ├── index.astro
│       ├── blog/
│       │   └── [slug].astro
│       └── tags/
│           ├── index.astro
│           └── [tag].astro
└── content/
    └── blog/          # All blog posts with lang field
```

## Testing

To test the multilingual functionality locally:

```bash
npm run build
npm run preview
```

Then visit:
- English: http://localhost:4321/
- Spanish: http://localhost:4321/es/

## Adding More Languages

To add additional languages:

1. Update `astro.config.mjs`:
```javascript
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'es', 'fr'], // Add new locale
  routing: {
    prefixDefaultLocale: false
  }
}
```

2. Add translations in `src/i18n/ui.ts`
3. Create page structure in `src/pages/[locale]/`
4. Update `src/content/config.ts` to include the new language enum

## Notes

- English is the default language and doesn't require a URL prefix
- All content must include a `lang` field
- The language switcher preserves the current page context
- SEO tags are automatically generated for each language
