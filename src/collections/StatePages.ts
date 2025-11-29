import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publicRead } from '../access/roles'

export const StatePages: CollectionConfig = {
  slug: 'state-pages',
  admin: {
    useAsTitle: 'state',
    defaultColumns: ['state', 'stateCode', 'status', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: publicRead,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'state',
      type: 'text',
      required: true,
      admin: {
        description: 'Full state name (e.g., "California")',
      },
    },
    {
      name: 'stateCode',
      type: 'text',
      required: true,
      maxLength: 2,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Two-letter code (e.g., "CA")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL slug (e.g., "california")',
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
    // SEO
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          maxLength: 70,
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
        },
      ],
    },
    // Hero
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
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'State overview content',
      },
    },
    // Compliance Information (YMYL)
    {
      name: 'compliance',
      type: 'group',
      label: 'State Compliance (YMYL)',
      admin: {
        description: 'Regulatory and compliance information for this state',
      },
      fields: [
        {
          name: 'legalStatus',
          type: 'text',
          admin: {
            description: 'Legal status of service in this state',
          },
        },
        {
          name: 'regulatoryBody',
          type: 'text',
          admin: {
            description: 'State regulatory agency',
          },
        },
        {
          name: 'regulatoryUrl',
          type: 'text',
          admin: {
            description: 'Link to regulatory website',
          },
        },
        {
          name: 'rateCaps',
          type: 'textarea',
          admin: {
            description: 'APR caps, rate limits, fee limits',
          },
        },
        {
          name: 'loanLimits',
          type: 'textarea',
          admin: {
            description: 'Maximum loan amounts, term limits',
          },
        },
        {
          name: 'consumerProtections',
          type: 'array',
          admin: {
            description: 'Consumer protection laws',
          },
          fields: [
            {
              name: 'protection',
              type: 'textarea',
              required: true,
            },
          ],
        },
        {
          name: 'disclaimer',
          type: 'textarea',
          admin: {
            description: 'State-specific legal disclaimer',
          },
        },
        {
          name: 'lastUpdated',
          type: 'date',
          admin: {
            description: 'When compliance info was last verified',
          },
        },
      ],
    },
    // Cities in this state (relationship)
    {
      name: 'cities',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      admin: {
        description: 'Cities served in this state',
      },
    },
    // FAQ
    {
      name: 'faq',
      type: 'array',
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
  ],
  timestamps: true,
}
