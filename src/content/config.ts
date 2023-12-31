import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		readtime: z.string(),
		tags: z.array(z.string().optional()),
		tldr: z.array(z.string()).optional(),
		featured: z.boolean().optional()
	}),
});

export const collections = { blog };