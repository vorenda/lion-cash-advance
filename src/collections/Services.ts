import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publicRead } from '../access/roles'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'category', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: publicRead,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-generate slug from name
        if (operation === 'create' && data?.name && !data?.slug) {
          data.slug = data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Service name (e.g., "Payday Loans")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier (auto-generated from name)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Short-term', value: 'short-term' },
        { label: 'Digital', value: 'digital' },
        { label: 'Flexible', value: 'flexible' },
        { label: 'Urgent', value: 'urgent' },
        { label: 'Credit-flexible', value: 'credit-flexible' },
        { label: 'Emergency', value: 'emergency' },
        { label: 'Personal', value: 'personal' },
        { label: 'Fast-approval', value: 'fast-approval' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Brief description (max 200 chars)',
      },
    },
    {
      name: 'longDescription',
      type: 'richText',
      admin: {
        description: 'Detailed service description',
      },
    },
    {
      name: 'benefits',
      type: 'array',
      admin: {
        description: 'Key benefits of this service',
      },
      fields: [
        {
          name: 'benefit',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'loanAmounts',
      type: 'group',
      fields: [
        {
          name: 'min',
          type: 'number',
          admin: {
            description: 'Minimum loan amount in dollars',
          },
        },
        {
          name: 'max',
          type: 'number',
          admin: {
            description: 'Maximum loan amount in dollars',
          },
        },
        {
          name: 'description',
          type: 'text',
          admin: {
            description: 'Display text (e.g., "$100 - $2,500")',
          },
        },
      ],
    },
    {
      name: 'terms',
      type: 'group',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Repayment terms description',
          },
        },
        {
          name: 'examples',
          type: 'array',
          fields: [
            {
              name: 'term',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'requirements',
      type: 'array',
      admin: {
        description: 'Eligibility requirements',
      },
      fields: [
        {
          name: 'requirement',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      admin: {
        description: 'Frequently asked questions',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'seoTitle',
      type: 'text',
      maxLength: 70,
      admin: {
        position: 'sidebar',
        description: 'SEO title (max 70 chars)',
      },
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      maxLength: 160,
      admin: {
        position: 'sidebar',
        description: 'Meta description (max 160 chars)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
