import fs from 'fs'
import path from 'path'

// Types
export interface CityPage {
  id: string
  city: string
  slug: string
  state: string
  stateCode: string
  stateSlug: string
  county: string
  serviceNiche: string
  population: number
  seo: {
    title: string
    metaDescription: string
    canonicalUrl: string
    keywords: string[]
  }
  hero: {
    h1: string
    subheadline: string
    ctaText: string
    ctaUrl: string
    secondaryCta: {
      text: string
      url: string
    }
  }
  localProof: {
    headline: string
    directions: string
    landmarks: string[]
    highway: string
    exit: string
    neighborhoodName: string
    hours: Record<string, string>
  }
  nap: {
    name: string
    street: string
    city: string
    state: string
    zip: string
    phone: string
    formattedPhone: string
    formattedAddress: string
    coordinates: {
      latitude: number
      longitude: number
    }
    googleMapsUrl: string
  }
  productLinks: {
    headline: string
    intro: string
    services: Array<{
      name: string
      slug: string
      url: string
      description: string
      anchorText: string
    }>
  }
  stateCompliance: {
    headline: string
    content: string
    keyPoints: string[]
    regulatoryBody: string
    regulatoryUrl: string
    regulatoryPhone: string
    disclaimer: string
  }
  localReviews: {
    headline: string
    locationId: string
    reviews: Array<{
      name: string
      rating: number
      text: string
      date: string
    }>
  }
  nearbyLocations: {
    headline: string
    intro: string
    cities: Array<{
      name: string
      slug: string
      url: string
      distanceMiles: number
    }>
  }
  faq: Array<{
    question: string
    answer: string
  }>
  ctaSection: {
    headline: string
    subheadline: string
    primaryCta: {
      text: string
      url: string
    }
    secondaryCta: {
      text: string
      url: string
    }
    address: string
  }
  schema: Record<string, unknown>
  breadcrumbs: Array<{
    label: string
    url: string
  }>
  metadata: Record<string, unknown>
}

export interface Location {
  city: string
  county: string
  population: number
  areaCode: string
  landmarks: string[]
  highways: string[]
  neighboringTowns: string[]
  lat: number
  lng: number
}

export interface StateData {
  state: string
  stateCode: string
  cities: Location[]
}

export interface LocationsData {
  states: StateData[]
  totalCities: number
  generatedAt: string
}

export interface ServicePillar {
  id: string
  serviceName: string
  slug: string
  url: string
  category: string
  parentService?: string
  tier?: string
  seo: {
    title: string
    metaDescription: string
    keywords: string[]
    canonicalUrl: string
  }
  hero: {
    h1: string
    subheadline: string
    ctaText: string
    ctaUrl: string
  }
  content: {
    whatIs?: {
      heading: string
      content: string
    }
    whenToUse?: {
      heading: string
      content: string
    }
    benefits?: {
      heading: string
      items: string[]
    }
    process?: {
      heading: string
      steps: Array<{
        step: number
        title: string
        description: string
      }>
    }
    requirements?: {
      heading: string
      content: string
    }
  }
  comparison?: {
    heading: string
    description: string
    types: Array<{
      name: string
      slug: string
      description: string
      amountRange: string
      termRange: string
      bestFor: string
    }>
  }
  faqNational?: Array<{
    question: string
    answer: string
  }>
  whyLionCashAdvance?: {
    heading: string
    description: string
    reasons: Array<{
      title: string
      description: string
    }>
  }
  trustSignals?: {
    heading: string
    description: string
    signals: {
      licenses: string[]
      certifications: string[]
      yearsInBusiness: string
      customerRating: string
      guarantees: string[]
    }
  }
  relatedServices?: string[]
  schema?: Record<string, unknown>
}

export interface BusinessProfile {
  businessName: string
  tagline: string
  phone: string
  email: string
  yearsInBusiness: number
  foundedYear: number
  about: {
    headline: string
    description: string
    mission: string
    values: string[]
  }
  trustSignals: {
    rating: number
    reviewCount: number
    certifications: string[]
    guarantees: string[]
  }
  team: Array<{
    name: string
    role: string
    bio: string
  }>
  testimonials: Array<{
    name: string
    location: string
    rating: number
    text: string
  }>
  contactInfo: {
    headquarters: {
      street: string
      city: string
      state: string
      zip: string
    }
    hours: Record<string, string>
  }
}

export interface StateCompliance {
  state: string
  stateCode: string
  serviceNiche: string
  lastUpdated: string
  legalStatus: {
    isLegal: boolean
    loanTypeAllowed: string
    restrictions: string
    notes: string
  }
  regulations: Record<string, unknown>
  fees: Record<string, unknown>
  licensing: {
    required: boolean
    licenseType: string
    regulatoryBody: string
    regulatoryUrl: string
    phoneNumber?: string
    contactPhone?: string
  }
  consumerProtections: Record<string, unknown>
  cityPageContent: {
    headline: string
    intro: string
    complianceSection: string
    consumerProtectionText: string
    disclaimers: string[]
    keyPoints: string[]
    regulatoryContact?: {
      agency: string
      phone: string
      website: string
    }
  }
}

// Data loading functions
const dataDir = path.join(process.cwd())

export async function getLocations(): Promise<LocationsData> {
  const filePath = path.join(dataDir, 'locations.json')
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

export async function getAllStates(): Promise<Array<{
  name: string
  slug: string
  code: string
  cityCount: number
}>> {
  const locations = await getLocations()
  return locations.states.map(state => ({
    name: state.state,
    slug: state.state.toLowerCase().replace(/\s+/g, '-'),
    code: state.stateCode,
    cityCount: state.cities.length
  }))
}

export async function getState(stateSlug: string): Promise<StateData | null> {
  const locations = await getLocations()
  const state = locations.states.find(
    s => s.state.toLowerCase().replace(/\s+/g, '-') === stateSlug
  )
  return state || null
}

export async function getCitiesByState(stateSlug: string): Promise<Location[]> {
  const state = await getState(stateSlug)
  return state?.cities || []
}

export async function getCityPage(stateSlug: string, citySlug: string): Promise<CityPage | null> {
  const locations = await getLocations()
  const state = locations.states.find(
    s => s.state.toLowerCase().replace(/\s+/g, '-') === stateSlug
  )

  if (!state) return null

  // Try to find the city page JSON file
  const cityPagesDir = path.join(dataDir, 'city-pages')
  const possibleFiles = [
    `${citySlug}-${state.stateCode.toLowerCase()}.json`,
    `${citySlug}.json`
  ]

  for (const fileName of possibleFiles) {
    const filePath = path.join(cityPagesDir, fileName)
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(data)
    }
  }

  return null
}

export async function getAllCityPages(): Promise<CityPage[]> {
  const cityPagesDir = path.join(dataDir, 'city-pages')
  const files = fs.readdirSync(cityPagesDir).filter(f => f.endsWith('.json'))

  return files.map(file => {
    const data = fs.readFileSync(path.join(cityPagesDir, file), 'utf-8')
    return JSON.parse(data)
  })
}

export async function getServicePillarSchema(): Promise<{
  pillarPages: ServicePillar[]
}> {
  const filePath = path.join(dataDir, 'service-pillar-schema.json')
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

export async function getAllServices(): Promise<ServicePillar[]> {
  const schema = await getServicePillarSchema()
  return schema.pillarPages
}

export async function getService(slug: string): Promise<ServicePillar | null> {
  const services = await getAllServices()
  return services.find(s => s.slug === slug) || null
}

export async function getBusinessProfile(): Promise<BusinessProfile | null> {
  const filePath = path.join(dataDir, 'business-profile.json')
  if (!fs.existsSync(filePath)) return null
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

export async function getStateCompliance(stateCode: string): Promise<StateCompliance | null> {
  const filePath = path.join(dataDir, 'state-compliance', `${stateCode}.json`)
  if (!fs.existsSync(filePath)) return null
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

// Helper to generate static params for all city pages
export async function generateCityParams(): Promise<Array<{ state: string; city: string }>> {
  const cityPages = await getAllCityPages()
  return cityPages.map(page => ({
    state: page.stateSlug,
    city: page.slug
  }))
}

// Helper to generate static params for all state pages
export async function generateStateParams(): Promise<Array<{ state: string }>> {
  const states = await getAllStates()
  return states.map(state => ({
    state: state.slug
  }))
}

// Helper to generate static params for all service pages
export async function generateServiceParams(): Promise<Array<{ slug: string }>> {
  const services = await getAllServices()
  return services.map(service => ({
    slug: service.slug
  }))
}
