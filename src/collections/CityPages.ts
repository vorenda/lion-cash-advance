import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publicRead } from '../access/roles'

export const CityPages: CollectionConfig = {
  slug: 'city-pages',
  admin: {
    useAsTitle: 'city',
    defaultColumns: ['city', 'state', 'stateCode', 'status', 'updatedAt'],
    group: 'Content',
    listSearchableFields: ['city', 'stateCode', 'county'],
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
        // Auto-generate slug from city name
        if (operation === 'create' && data?.city && !data?.slug) {
          data.slug = data.city
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
  },
  fields: [
    // Location Info
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'state',
      type: 'text',
      required: true,
    },
    {
      name: 'stateCode',
      type: 'text',
      required: true,
      maxLength: 2,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'URL slug (e.g., "dallas")',
      },
    },
    {
      name: 'county',
      type: 'text',
      admin: {
        description: 'County name for local SEO',
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
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Real local branch photo (NOT stock images)',
          },
        },
      ],
    },

    // Anti-Doorway Local Proof Section
    {
      name: 'localProof',
      type: 'group',
      label: 'Local Proof (Anti-Doorway)',
      admin: {
        description: 'Local facts that prove genuine local presence - prevents doorway page penalty',
      },
      fields: [
        {
          name: 'landmarks',
          type: 'array',
          admin: {
            description: 'Local landmarks (e.g., Reunion Tower, Zilker Park)',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'highways',
          type: 'array',
          admin: {
            description: 'Major highways (e.g., I-35E, US-75)',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'exits',
          type: 'array',
          admin: {
            description: 'Highway exits for directions',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'localDescription',
          type: 'textarea',
          admin: {
            description: 'Paragraph naturally incorporating local facts',
          },
        },
      ],
    },

    // State Compliance (YMYL)
    {
      name: 'stateCompliance',
      type: 'group',
      label: 'State Compliance (YMYL)',
      admin: {
        description: 'State-specific regulatory information',
      },
      fields: [
        {
          name: 'showCompliance',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Display compliance section on page',
          },
        },
        {
          name: 'rateCaps',
          type: 'textarea',
          admin: {
            description: 'State APR/rate cap information',
          },
        },
        {
          name: 'consumerProtections',
          type: 'textarea',
          admin: {
            description: 'Consumer protection information',
          },
        },
        {
          name: 'disclaimer',
          type: 'textarea',
          admin: {
            description: 'Required legal disclaimer',
          },
        },
        {
          name: 'regulatoryBody',
          type: 'text',
        },
      ],
    },

    // Products/Services Section (Links UP to pillar pages)
    {
      name: 'products',
      type: 'array',
      admin: {
        description: 'Services available in this city - link UP to pillar pages',
      },
      fields: [
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          required: true,
        },
        {
          name: 'localDescription',
          type: 'textarea',
          admin: {
            description: 'City-specific description for this service',
          },
        },
      ],
    },

    // Local Reviews
    {
      name: 'localReviews',
      type: 'array',
      admin: {
        description: 'Customer reviews from this location',
      },
      fields: [
        {
          name: 'reviewerName',
          type: 'text',
          required: true,
        },
        {
          name: 'reviewerCity',
          type: 'text',
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
        {
          name: 'date',
          type: 'date',
        },
      ],
    },

    // NAP (Name, Address, Phone) with LOCAL area code
    {
      name: 'nap',
      type: 'group',
      label: 'NAP (Name, Address, Phone)',
      admin: {
        description: 'Business contact info - MUST use LOCAL area code!',
      },
      fields: [
        {
          name: 'businessName',
          type: 'text',
          defaultValue: 'Lion Cash Advance',
        },
        {
          name: 'street',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'zip',
          type: 'text',
        },
        {
          name: 'phone',
          type: 'text',
          admin: {
            description: 'MUST use LOCAL area code (e.g., 214-555-1234), NOT 1-800!',
          },
        },
        {
          name: 'areaCode',
          type: 'text',
          maxLength: 3,
          admin: {
            description: 'Local area code (214, 713, etc.)',
          },
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'googleMapsUrl',
          type: 'text',
        },
      ],
    },

    // Nearby Locations
    {
      name: 'nearbyLocations',
      type: 'array',
      admin: {
        description: 'Also serving these nearby towns',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'distance',
          type: 'text',
          admin: {
            description: 'Distance (e.g., "5 miles")',
          },
        },
      ],
    },

    // FAQ with local keywords
    {
      name: 'faq',
      type: 'array',
      admin: {
        description: 'FAQs with local keywords',
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

    // CTA
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'primaryText',
          type: 'text',
          defaultValue: 'Apply Now',
        },
        {
          name: 'primaryUrl',
          type: 'text',
          defaultValue: '/apply',
        },
        {
          name: 'secondaryText',
          type: 'text',
          defaultValue: 'Request Callback',
        },
        {
          name: 'secondaryUrl',
          type: 'text',
          defaultValue: '/callback',
        },
      ],
    },

    // Schema Type
    {
      name: 'schemaType',
      type: 'select',
      defaultValue: 'FinancialService',
      options: [
        { label: 'FinancialService', value: 'FinancialService' },
        { label: 'LocalBusiness', value: 'LocalBusiness' },
        { label: 'LegalService', value: 'LegalService' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Schema.org type for structured data',
      },
    },
  ],
  timestamps: true,
}
