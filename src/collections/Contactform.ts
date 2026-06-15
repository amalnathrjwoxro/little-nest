import type { CollectionConfig } from "payload";

export const ContactForm: CollectionConfig = {
  slug: "contact-form",

  access: {
    read: () => true,
    create: () => true,
  },

  admin: {
    useAsTitle: "name",
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Name",
    },

    {
      name: "email",
      type: "email",
      required: true,
      label: "Email",
    },

    {
      name: "message",
      type: "textarea",
      required: true,
      label: "Message",
    },
  ],
};