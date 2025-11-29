/**
 * Data Import Script for Payload CMS
 *
 * This script imports data from JSON files into Payload CMS collections:
 * - Locations from /locations.json
 * - Services from /service-schema-template.json
 * - State compliance data from /state-compliance/*.json
 *
 * Run with: npx tsx scripts/import-data.ts
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'

const projectRoot = path.resolve(__dirname, '..')

interface LocationData {
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

interface StateData {
  state: string
  stateCode: string
  cities: LocationData[]
}

interface LocationsFile {
  states: StateData[]
  totalCities: number
  generatedAt: string
}

interface ServiceData {
  id: number
  name: string
  slug: string
  category: string
  description: string
}

interface ServiceSchemaFile {
  services: ServiceData[]
  businessName: string
  serviceNiche: string
}

interface StateComplianceData {
  state: string
  stateCode: string
  legalStatus: string
  regulations: any
  fees: any
  consumerProtections: any
  disclaimer: string
  cityPageContent: any
  researchSources: any
}

async function importData() {
  console.log('Starting data import...\n')

  const payload = await getPayload({ config })

  // ============================================
  // 1. Import Locations
  // ============================================
  const locationsPath = path.join(projectRoot, 'locations.json')

  if (fs.existsSync(locationsPath)) {
    console.log('--- Importing Locations ---')
    const locationsData: LocationsFile = JSON.parse(fs.readFileSync(locationsPath, 'utf8'))

    let locationCount = 0
    let locationErrors = 0

    for (const stateData of locationsData.states) {
      for (const city of stateData.cities) {
        try {
          // Check if location already exists
          const existing = await payload.find({
            collection: 'locations',
            where: {
              and: [
                { city: { equals: city.city } },
                { stateCode: { equals: stateData.stateCode } },
              ],
            },
          })

          if (existing.docs.length > 0) {
            console.log(`  Skipping (exists): ${city.city}, ${stateData.stateCode}`)
            continue
          }

          await payload.create({
            collection: 'locations',
            data: {
              city: city.city,
              state: stateData.state,
              stateCode: stateData.stateCode,
              county: city.county,
              population: city.population,
              areaCode: city.areaCode,
              landmarks: city.landmarks?.map((name: string) => ({ name })) || [],
              highways: city.highways?.map((name: string) => ({ name })) || [],
              neighboringTowns: city.neighboringTowns?.map((name: string) => ({ name })) || [],
              coordinates: {
                lat: city.lat || 0,
                lng: city.lng || 0,
              },
            },
          })
          locationCount++
          console.log(`  Imported: ${city.city}, ${stateData.stateCode}`)
        } catch (error: any) {
          locationErrors++
          console.error(`  Error importing ${city.city}, ${stateData.stateCode}: ${error.message}`)
        }
      }
    }

    console.log(`\nLocations: ${locationCount} imported, ${locationErrors} errors\n`)
  } else {
    console.log('No locations.json found, skipping locations import\n')
  }

  // ============================================
  // 2. Import Services
  // ============================================
  const servicesPath = path.join(projectRoot, 'service-schema-template.json')

  if (fs.existsSync(servicesPath)) {
    console.log('--- Importing Services ---')
    const servicesData: ServiceSchemaFile = JSON.parse(fs.readFileSync(servicesPath, 'utf8'))

    let serviceCount = 0
    let serviceErrors = 0

    for (const service of servicesData.services) {
      try {
        // Check if service already exists
        const existing = await payload.find({
          collection: 'services',
          where: {
            slug: { equals: service.slug },
          },
        })

        if (existing.docs.length > 0) {
          console.log(`  Skipping (exists): ${service.name}`)
          continue
        }

        await payload.create({
          collection: 'services',
          data: {
            name: service.name,
            slug: service.slug,
            category: service.category as any,
            shortDescription: service.description,
          },
        })
        serviceCount++
        console.log(`  Imported: ${service.name}`)
      } catch (error: any) {
        serviceErrors++
        console.error(`  Error importing ${service.name}: ${error.message}`)
      }
    }

    console.log(`\nServices: ${serviceCount} imported, ${serviceErrors} errors\n`)
  } else {
    console.log('No service-schema-template.json found, skipping services import\n')
  }

  // ============================================
  // 3. Import State Compliance Data
  // ============================================
  const complianceDir = path.join(projectRoot, 'state-compliance')

  if (fs.existsSync(complianceDir)) {
    console.log('--- Importing State Pages (Compliance Data) ---')

    let stateCount = 0
    let stateErrors = 0

    const files = fs.readdirSync(complianceDir).filter(f => f.endsWith('.json') && f !== 'index.json')

    for (const file of files) {
      try {
        const complianceData: StateComplianceData = JSON.parse(
          fs.readFileSync(path.join(complianceDir, file), 'utf8')
        )

        // Check if state page already exists
        const existing = await payload.find({
          collection: 'state-pages',
          where: {
            stateCode: { equals: complianceData.stateCode },
          },
        })

        if (existing.docs.length > 0) {
          console.log(`  Skipping (exists): ${complianceData.state}`)
          continue
        }

        // Create state page with compliance data
        await payload.create({
          collection: 'state-pages',
          data: {
            state: complianceData.state,
            stateCode: complianceData.stateCode,
            slug: complianceData.state.toLowerCase().replace(/\s+/g, '-'),
            status: 'draft',
            hero: {
              headline: `Cash Advance Loans in ${complianceData.state}`,
              subheadline: `Fast, easy cash advance solutions for ${complianceData.state} residents`,
            },
            seo: {
              metaTitle: `Cash Advance Loans in ${complianceData.state} | Lion Cash Advance`,
              metaDescription: `Get fast cash advance loans in ${complianceData.state}. Quick approval, no credit check required. Apply online today!`,
            },
            compliance: {
              legalStatus: complianceData.legalStatus,
              regulatoryBody: complianceData.regulations?.regulatoryBody || '',
              rateCaps: typeof complianceData.regulations?.aprCaps === 'string'
                ? complianceData.regulations.aprCaps
                : JSON.stringify(complianceData.regulations?.aprCaps || ''),
              loanLimits: typeof complianceData.regulations?.loanAmountLimits === 'string'
                ? complianceData.regulations.loanAmountLimits
                : JSON.stringify(complianceData.regulations?.loanAmountLimits || ''),
              consumerProtections: complianceData.consumerProtections?.borrowerProtections?.map((p: string) => ({ protection: p })) || [],
              disclaimer: complianceData.disclaimer,
              lastUpdated: new Date().toISOString(),
            },
          },
        })
        stateCount++
        console.log(`  Imported: ${complianceData.state}`)
      } catch (error: any) {
        stateErrors++
        console.error(`  Error importing ${file}: ${error.message}`)
      }
    }

    console.log(`\nState Pages: ${stateCount} imported, ${stateErrors} errors\n`)
  } else {
    console.log('No state-compliance directory found, skipping state pages import\n')
  }

  // ============================================
  // 4. Create Initial Settings
  // ============================================
  console.log('--- Checking Settings ---')
  try {
    const settings = await payload.findGlobal({ slug: 'settings' })

    if (!settings.siteName || settings.siteName === 'Lion Cash Advance') {
      await payload.updateGlobal({
        slug: 'settings',
        data: {
          siteName: 'Lion Cash Advance',
          tagline: 'Fast Cash When You Need It',
          contact: {
            phone: '1-800-LION-CASH',
            email: 'info@lioncashadvance.com',
            hours: 'Mon-Fri 9am-6pm, Sat 10am-4pm',
          },
          seo: {
            titleTemplate: '%s | Lion Cash Advance',
            defaultDescription: 'Get fast cash advance loans with Lion Cash Advance. Quick approval, same-day funding, no credit check required. Apply online today!',
          },
          trust: {
            yearsInBusiness: '10+ years',
            customerRating: '4.9/5 stars',
            reviewCount: 5000,
            guarantees: [
              { guarantee: 'Transparent pricing' },
              { guarantee: 'No hidden fees' },
              { guarantee: 'Same-day funding' },
              { guarantee: 'Professional service' },
            ],
          },
          disclaimers: {
            globalDisclaimer: 'Lion Cash Advance is not a lender. We connect you with lenders who may offer short-term loans. Loan amounts, terms, and eligibility vary by state and lender.',
            aprDisclosure: 'APR varies by lender and loan type. Representative APR ranges from 36% to 400% depending on your state of residence and loan terms.',
            lenderDisclosure: 'This website is not a direct lender. We are a matching service that connects borrowers with lenders.',
          },
        },
      })
      console.log('  Settings updated with defaults')
    } else {
      console.log('  Settings already configured')
    }
  } catch (error: any) {
    console.error(`  Error updating settings: ${error.message}`)
  }

  console.log('\n=== Import Complete ===\n')
  process.exit(0)
}

// Run the import
importData().catch((error) => {
  console.error('Import failed:', error)
  process.exit(1)
})
