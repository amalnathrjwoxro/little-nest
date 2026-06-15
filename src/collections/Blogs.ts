import type { CollectionConfig } from "payload";

export const Blogs: CollectionConfig = {
  slug: "blog",

  access: {
    read: () => true,       
    create: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },

  admin: {
    useAsTitle: "title",
  },

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Parenting", value: "parenting" },
        { label: "Tips", value: "tips" },
        { label: "Products", value: "products" },
        { label: "Health", value: "health" },
        { label: "Sleep", value: "sleep" },
        { label: "Feeding", value: "feeding" },
      ],
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      admin: {
        description: "Auto-fill or type manually. Used in the URL: /blogs/your-slug",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) =>
            value ||
            data?.title
              ?.toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, ""),
        ],
      },
    },
  ],
};
