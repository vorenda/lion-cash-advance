import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publicRead } from '../access/roles'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'city',
    defaultColumns: ['city', 'state', 'stateCode', 'county', 'population'],
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
        description: 'Two-letter state code (e.g., TX, CA, FL)',
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
      name: 'population',
      type: 'number',
      admin: {
        description: 'City population',
      },
    },
    {
      name: 'areaCode',
      type: 'text',
      maxLength: 3,
      admin: {
        description: 'Local phone area code (e.g., 214, 713)',
      },
    },
    {
      name: 'landmarks',
      type: 'array',
      admin: {
        description: 'Local landmarks (for Anti-Doorway content)',
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
        description: 'Major highways (e.g., I-35, US-75)',
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
      name: 'neighboringTowns',
      type: 'array',
      admin: {
        description: 'Nearby towns for "Also serving" section',
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
      name: 'coordinates',
      type: 'group',
      fields: [
        {
          name: 'lat',
          type: 'number',
          admin: {
            description: 'Latitude',
          },
        },
        {
          name: 'lng',
          type: 'number',
          admin: {
            description: 'Longitude',
          },
        },
      ],
    },
  ],
  timestamps: true,
}
