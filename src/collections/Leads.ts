import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, publicCreate } from '../access/roles'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'source', 'status', 'createdAt'],
    group: 'CRM',
    listSearchableFields: ['name', 'email', 'phone', 'city', 'state'],
  },
  access: {
    read: isAdminOrEditor,
    create: publicCreate, // Public can submit leads
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // Log new lead submissions
        if (operation === 'create') {
          console.log(`New lead received: ${doc.email} from ${doc.source}`)

          // Webhook notification (if configured)
          if (process.env.WEBHOOK_NEW_LEAD) {
            try {
              await fetch(process.env.WEBHOOK_NEW_LEAD, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  event: 'new_lead',
                  lead: {
                    id: doc.id,
                    name: doc.name,
                    email: doc.email,
                    phone: doc.phone,
                    source: doc.source,
                    city: doc.city,
                    state: doc.state,
                    loanAmount: doc.loanAmount,
                    createdAt: doc.createdAt,
                  },
                }),
              })
            } catch (error) {
              console.error('Webhook notification failed:', error)
            }
          }
        }
      },
    ],
  },
  fields: [
    // Contact Information
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },

    // Lead Source
    {
      name: 'source',
      type: 'select',
      required: true,
      options: [
        { label: 'Contact Form', value: 'contact-form' },
        { label: 'Quote Request', value: 'quote-request' },
        { label: 'Callback Request', value: 'callback-request' },
        { label: 'Application', value: 'application' },
        { label: 'Manual Entry', value: 'manual' },
        { label: 'Phone Call', value: 'phone-call' },
        { label: 'Walk-in', value: 'walk-in' },
        { label: 'Referral', value: 'referral' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    // Lead Details
    {
      name: 'loanAmount',
      type: 'number',
      admin: {
        description: 'Requested loan amount',
      },
    },
    {
      name: 'loanPurpose',
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

    // CRM Status
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Converted', value: 'converted' },
        { label: 'Lost', value: 'lost' },
        { label: 'Do Not Contact', value: 'dnc' },
      ],
      admin: {
        position: 'sidebar',
      },
    },

    // Notes
    {
      name: 'notes',
      type: 'array',
      admin: {
        description: 'Activity notes',
      },
      fields: [
        {
          name: 'note',
          type: 'textarea',
          required: true,
        },
        {
          name: 'addedBy',
          type: 'text',
        },
        {
          name: 'addedAt',
          type: 'date',
        },
      ],
    },

    // Assignment
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'Assigned team member',
      },
    },

    // Follow-up
    {
      name: 'nextFollowUp',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Next follow-up date',
      },
    },
    {
      name: 'lastContactedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },

    // Metadata
    {
      name: 'sourceUrl',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Page where lead was submitted',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}
