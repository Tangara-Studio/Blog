import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('tangara-studio'),
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default(['devlog']),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'blog': blogCollection,
};
