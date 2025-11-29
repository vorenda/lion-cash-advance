import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getState, generateStateParams, getAllCityPages, getStateCompliance, getAllServices } from '@/lib/data'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CityCard } from '@/components/CityCard'
import { ServiceCard } from '@/components/ServiceCard'
import { TrustBadges } from '@/components/TrustBadges'

interface Props {
  params: Promise<{ state: string }>
}

export async function generateStaticParams() {
  return generateStateParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = await getState(stateSlug)

  if (!state) {
    return { title: 'State Not Found' }
  }

  return {
    title: `Cash Advance Loans in ${state.state} | ${state.cities.length} Locations`,
    description: `Find Lion Cash Advance locations in ${state.state}. ${state.cities.length} cities with same-day approval and no credit check. Apply for fast cash today.`,
  }
}

export default async function StatePage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = await getState(stateSlug)

  if (!state) {
    notFound()
  }

  const cityPages = await getAllCityPages()
  const stateCityPages = cityPages.filter(cp => cp.stateSlug === stateSlug)
  const compliance = await getStateCompliance(state.stateCode)
  const services = await getAllServices()

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Locations', url: '/locations' },
    { label: state.state, url: `/locations/${stateSlug}` },
  ]

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": `Lion Cash Advance ${state.state}`,
    "description": `Cash advance loans in ${state.state} with same-day approval and no credit check.`,
    "url": `https://lioncashadvance.com/locations/${stateSlug}`,
    "areaServed": {
      "@type": "State",
      "name": state.state,
      "containedIn": "United States"
    },
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": state.cities.length * 5
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <section className="gradient-primary hero-pattern relative py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary-dark/95" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Cash Advance Loans in {state.state}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Serving {state.cities.length} cities across {state.state}. Same-day approval with no credit check required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="btn-primary">
              Apply Now
            </Link>
            <a href="#cities" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold py-3 px-6 rounded-lg transition">
              Find Your City
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <TrustBadges variant="compact" />
        </div>
      </section>

      {/* Services Available */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-primary mb-4">
              Our Services in {state.state}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All cash advance services are available at every {state.state} location
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.slice(0, 5).map((service) => (
              <ServiceCard
                key={service.slug}
                name={service.serviceName}
                slug={service.slug}
                description={service.hero?.subheadline || ''}
                variant="compact"
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/services" className="text-primary font-semibold hover:text-accent transition">
              View All Services
              <svg className="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* State Compliance */}
      {compliance && (
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-primary mb-6">
                {compliance.cityPageContent?.headline || `Understanding Cash Advance Laws in ${state.state}`}
              </h2>

              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm mb-8">
                <p className="text-gray-700 mb-6 whitespace-pre-wrap">
                  {compliance.cityPageContent?.intro?.replace('{{city}}', state.state)}
                </p>

                <h3 className="text-xl font-semibold text-primary mb-4">Key Points for {state.state} Borrowers</h3>
                <ul className="space-y-3">
                  {compliance.cityPageContent?.keyPoints.slice(0, 8).map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-primary mb-3">Regulatory Contact</h3>
                <p className="text-gray-700 mb-3">
                  {compliance.licensing.regulatoryBody}
                </p>
                {(compliance.licensing.phoneNumber || compliance.licensing.contactPhone) && (
                  <p className="text-gray-600">
                    Phone: <a href={`tel:${compliance.licensing.phoneNumber || compliance.licensing.contactPhone}`} className="text-primary hover:underline">
                      {compliance.licensing.phoneNumber || compliance.licensing.contactPhone}
                    </a>
                  </p>
                )}
                {compliance.licensing.regulatoryUrl && (
                  <p className="text-gray-600">
                    Website: <a href={compliance.licensing.regulatoryUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {compliance.licensing.regulatoryUrl}
                    </a>
                  </p>
                )}
              </div>

              <div className="mt-6 text-xs text-gray-500">
                <p className="italic">
                  {compliance.cityPageContent?.disclaimers?.[0] || 'This information is provided for general educational purposes only and should not be construed as legal or financial advice.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cities Grid */}
      <section id="cities" className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-primary mb-4">
              Cities We Serve in {state.state}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find your nearest Lion Cash Advance location
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {stateCityPages.length > 0 ? (
              stateCityPages.map((cityPage) => (
                <CityCard
                  key={cityPage.id}
                  name={cityPage.city}
                  slug={cityPage.slug}
                  state={state.state}
                  stateSlug={stateSlug}
                  county={cityPage.county}
                  phone={cityPage.nap?.phone}
                  variant="compact"
                />
              ))
            ) : (
              state.cities.map((city) => (
                <CityCard
                  key={city.city}
                  name={city.city}
                  slug={city.city.toLowerCase().replace(/\s+/g, '-')}
                  state={state.state}
                  stateSlug={stateSlug}
                  county={city.county}
                  variant="compact"
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Ready to Get Cash in {state.state}?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Apply now online or visit any of our {state.cities.length} locations across {state.state}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="btn-primary">
              Apply Online Now
            </Link>
            <a
              href="tel:1-800-555-CASH"
              className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition"
            >
              Call 1-800-555-CASH
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
