import tailwind from "@astrojs/tailwind";
import NetlifyCMS from "astro-netlify-cms";
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://tufancalisir.de/",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    NetlifyCMS({
      config: {
        backend: {
          name: "git-gateway",
          branch: "main",
        },
        collections: [
          {
            name: "posts",
            label: "Blog Posts",
            folder: "src/content/blog",
            create: true,
            delete: true,
            slug: "{{slug}}",
            fields: [
              {
                name: "featured",
                widget: "boolean",
                label: "Featured Post",
                required: false
              },
              {
                name: "title",
                widget: "string",
                label: "Post Title",
              },
              {
                name: "description",
                widget: "string",
                label: "Description",
              },
              {
                name: "pubDate",
                widget: "datetime",
                label: "Post Date",
              },
              {
                name: "readtime",
                widget: "string",
                label: "Time to read",
              },
              {
                name: "tags",
                widget: "list",
                label: "Tags",
              },
              {
                name: "tldr",
                widget: "list",
                label: "TL:DR",
                field: {
                  label: "Item",
                  name: "item",
                  widget: "string",
                },
              },
              {
                name: "body",
                widget: "markdown",
                label: "Post Body",
              },
            ],
          },
        ],
      },
    }),
    sitemap(),
  ],
});
