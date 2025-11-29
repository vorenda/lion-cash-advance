import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './collections/Users'
import { Services } from './collections/Services'
import { Locations } from './collections/Locations'
import { PillarPages } from './collections/PillarPages'
import { StatePages } from './collections/StatePages'
import { CityPages } from './collections/CityPages'
import { Leads } from './collections/Leads'
import { Media } from './collections/Media'

// Globals
import { Settings } from './globals/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Lion Cash Advance CMS',
    },
  },

  collections: [
    Users,
    Services,
    Locations,
    PillarPages,
    StatePages,
    CityPages,
    Leads,
    Media,
  ],

  globals: [Settings],

  editor: lexicalEditor({}),

  secret: process.env.PAYLOAD_SECRET || 'super-secret-payload-key-change-me',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgresql://postgres:lioncash123@localhost:5434/lioncash',
    },
  }),

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // CORS for API access
  cors: [
    'http://localhost:3000',
    process.env.NEXT_PUBLIC_SITE_URL,
  ].filter(Boolean) as string[],
})
