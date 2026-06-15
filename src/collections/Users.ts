import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',

  admin: {
    useAsTitle: 'email',
  },

  auth: true,

  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      saveToJWT: true, // makes req.user.role available in all access functions
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User',  value: 'user'  },
      ],
      access: {
        create: ({ req }) => req.user?.role === 'admin',
        update: ({ req }) => req.user?.role === 'admin', // only admins can change roles
      },
    },
  ],
}
