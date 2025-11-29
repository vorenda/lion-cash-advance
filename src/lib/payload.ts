import { getPayload as getPayloadClient } from 'payload'
import configPromise from '../payload.config'

// Get Payload instance
export async function getPayload() {
  return getPayloadClient({ config: configPromise })
}

// ============================================
// SERVICES
// ============================================

export async function getServices() {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'services',
    limit: 100,
    sort: 'name',
  })

  return result.docs
}

export async function getServiceBySlug(slug: string) {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'services',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  return result.docs[0] || null
}

// ============================================
// LOCATIONS
// ============================================

export async function getLocations() {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'locations',
    limit: 500,
    sort: 'city',
  })

  return result.docs
}

export async function getLocationsByState(stateCode: string) {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'locations',
    where: {
      stateCode: { equals: stateCode.toUpperCase() },
    },
    limit: 100,
    sort: 'city',
  })

  return result.docs
}

// ============================================
// PILLAR PAGES
// ============================================

export async function getPillarPages() {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'pillar-pages',
    where: {
      status: { equals: 'published' },
    },
    limit: 100,
    depth: 2,
  })

  return result.docs
}

export async function getPillarPageBySlug(slug: string) {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'pillar-pages',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] || null
}

// ============================================
// STATE PAGES
// ============================================

export async function getStatePages() {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'state-pages',
    where: {
      status: { equals: 'published' },
    },
    limit: 100,
    depth: 2,
  })

  return result.docs
}

export async function getStatePage(stateCode: string) {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'state-pages',
    where: {
      stateCode: { equals: stateCode.toUpperCase() },
      status: { equals: 'published' },
    },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] || null
}

export async function getStatePageBySlug(slug: string) {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'state-pages',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] || null
}

// ============================================
// CITY PAGES
// ============================================

export async function getCityPages() {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'city-pages',
    where: {
      status: { equals: 'published' },
    },
    limit: 500,
    depth: 2,
  })

  return result.docs
}

export async function getCityPagesByState(stateCode: string) {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'city-pages',
    where: {
      stateCode: { equals: stateCode.toUpperCase() },
      status: { equals: 'published' },
    },
    limit: 100,
    depth: 2,
    sort: 'city',
  })

  return result.docs
}

export async function getCityPage(stateCode: string, citySlug: string) {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'city-pages',
    where: {
      and: [
        { stateCode: { equals: stateCode.toUpperCase() } },
        { slug: { equals: citySlug } },
        { status: { equals: 'published' } },
      ],
    },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] || null
}

// ============================================
// LEADS
// ============================================

export async function createLead(data: {
  name: string
  email: string
  phone: string
  source: 'contact-form' | 'quote-request' | 'callback-request' | 'application' | 'manual'
  loanAmount?: number
  loanPurpose?: string
  city?: string
  state?: string
  sourceUrl?: string
  ipAddress?: string
  userAgent?: string
}) {
  const payload = await getPayload()

  return payload.create({
    collection: 'leads',
    data: {
      ...data,
      status: 'new',
    },
  })
}

export async function getLeads(options?: {
  status?: string
  state?: string
  limit?: number
}) {
  const payload = await getPayload()

  const where: any = {}

  if (options?.status) {
    where.status = { equals: options.status }
  }

  if (options?.state) {
    where.state = { equals: options.state }
  }

  const result = await payload.find({
    collection: 'leads',
    where,
    limit: options?.limit || 100,
    sort: '-createdAt',
  })

  return result.docs
}

// ============================================
// SETTINGS
// ============================================

export async function getSettings() {
  const payload = await getPayload()

  return payload.findGlobal({
    slug: 'settings',
  })
}

// ============================================
// MEDIA
// ============================================

export async function uploadMedia(file: File, data: { alt: string; caption?: string; credit?: string }) {
  const payload = await getPayload()

  // Convert file to buffer
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return payload.create({
    collection: 'media',
    data: {
      alt: data.alt,
      caption: data.caption,
      credit: data.credit,
    },
    file: {
      data: buffer,
      mimetype: file.type,
      name: file.name,
      size: file.size,
    },
  })
}
