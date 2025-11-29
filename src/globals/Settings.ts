import type { GlobalConfig } from 'payload'
import { isAdmin, publicRead } from '../access/roles'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: publicRead,
    update: isAdmin,
  },
  admin: {
    group: 'Admin',
  },
  fields: [
    // Site Info
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Lion Cash Advance',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Fast Cash When You Need It',
    },

    // Contact Info
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
          admin: {
            description: 'Main phone number',
          },
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'address',
          type: 'textarea',
        },
        {
          name: 'hours',
          type: 'text',
          defaultValue: 'Mon-Fri 9am-6pm, Sat 10am-4pm',
        },
      ],
    },

    // Social Links
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'youtube',
          type: 'text',
        },
      ],
    },

    // Default SEO
    {
      name: 'seo',
      type: 'group',
      label: 'Default SEO Settings',
      fields: [
        {
          name: 'titleTemplate',
          type: 'text',
          defaultValue: '%s | Lion Cash Advance',
          admin: {
            description: 'Page title template (%s = page title)',
          },
        },
        {
          name: 'defaultDescription',
          type: 'textarea',
          maxLength: 160,
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Default Open Graph image',
          },
        },
      ],
    },

    // Company Info
    {
      name: 'company',
      type: 'group',
      label: 'Company Information',
      fields: [
        {
          name: 'legalName',
          type: 'text',
          defaultValue: 'Lion Cash Advance LLC',
        },
        {
          name: 'foundedYear',
          type: 'number',
        },
        {
          name: 'licenses',
          type: 'array',
          fields: [
            {
              name: 'license',
              type: 'text',
            },
          ],
        },
        {
          name: 'aboutText',
          type: 'richText',
        },
      ],
    },

    // Trust Signals
    {
      name: 'trust',
      type: 'group',
      label: 'Trust Signals',
      fields: [
        {
          name: 'yearsInBusiness',
          type: 'text',
          defaultValue: '10+ years',
        },
        {
          name: 'customerRating',
          type: 'text',
          defaultValue: '4.9/5 stars',
        },
        {
          name: 'reviewCount',
          type: 'number',
          defaultValue: 5000,
        },
        {
          name: 'guarantees',
          type: 'array',
          fields: [
            {
              name: 'guarantee',
              type: 'text',
            },
          ],
        },
      ],
    },

    // Legal Disclaimers (YMYL)
    {
      name: 'disclaimers',
      type: 'group',
      label: 'Legal Disclaimers',
      admin: {
        description: 'Required legal disclaimers for YMYL compliance',
      },
      fields: [
        {
          name: 'globalDisclaimer',
          type: 'textarea',
          admin: {
            description: 'Disclaimer shown on all pages',
          },
        },
        {
          name: 'aprDisclosure',
          type: 'textarea',
          admin: {
            description: 'APR disclosure text',
          },
        },
        {
          name: 'lenderDisclosure',
          type: 'textarea',
          admin: {
            description: 'Lender relationship disclosure',
          },
        },
        {
          name: 'stateDisclosure',
          type: 'textarea',
          admin: {
            description: 'State licensing disclosure',
          },
        },
      ],
    },

    // Footer
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          defaultValue: 'Lion Cash Advance. All rights reserved.',
        },
        {
          name: 'additionalText',
          type: 'textarea',
        },
      ],
    },
  ],
}
