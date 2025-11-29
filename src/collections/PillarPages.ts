import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publicRead } from '../access/roles'

export const PillarPages: CollectionConfig = {
  slug: 'pillar-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
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
        // Auto-generate slug from title
        if (operation === 'create' && data?.title && !data?.slug) {
          data.slug = data.title
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
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Page title (e.g., "Payday Loans")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL slug (e.g., "payday-loans")',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        position: 'sidebar',
        description: 'Related service',
      },
    },
    // SEO Fields
    {
      name: 'seo',
      type: 'group',
      admin: {
        description: 'Search Engine Optimization',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          maxLength: 70,
          admin: {
            description: 'SEO title (max 70 chars)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'Meta description (max 160 chars)',
          },
        },
      ],
    },
    // Hero Section
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'headline',
          type: 'text',
          required: true,
        },
        {
          name: 'subheadline',
          type: 'text',
        },
        {
          name: 'ctaText',
          type: 'text',
          defaultValue: 'Apply Now',
        },
        {
          name: 'ctaUrl',
          type: 'text',
          defaultValue: '/apply',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    // Content Sections
    {
      name: 'whatIs',
      type: 'group',
      admin: {
        description: 'What Is [Service] section',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'content',
          type: 'richText',
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      admin: {
        description: 'Key benefits list',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Icon name or emoji',
          },
        },
      ],
    },
    {
      name: 'process',
      type: 'array',
      admin: {
        description: 'Application process steps',
      },
      fields: [
        {
          name: 'step',
          type: 'number',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'whyChooseUs',
      type: 'array',
      admin: {
        description: 'Why Choose Lion Cash Advance',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      admin: {
        description: 'Frequently Asked Questions',
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
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: {
        description: 'Related services to link to',
      },
    },
  ],
  timestamps: true,
}
