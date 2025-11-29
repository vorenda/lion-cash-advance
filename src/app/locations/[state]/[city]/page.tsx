import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCityPage, generateCityParams, getAllServices } from '@/lib/data'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { FAQ } from '@/components/FAQ'
import { Reviews } from '@/components/Reviews'
import { CityCard } from '@/components/CityCard'
import { ContactForm } from '@/components/ContactForm'

interface Props {
  params: Promise<{ state: string; city: string }>
}

export async function generateStaticParams() {
  return generateCityParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, city } = await params
  const cityPage = await getCityPage(state, city)

  if (!cityPage) {
    return { title: 'Location Not Found' }
  }

  return {
    title: cityPage.seo?.title || `Cash Advance in ${cityPage.city}, ${cityPage.stateCode}`,
    description: cityPage.seo?.metaDescription,
    keywords: cityPage.seo?.keywords,
  }
}

export default async function CityPage({ params }: Props) {
  const { state, city } = await params
  const cityPage = await getCityPage(state, city)

  if (!cityPage) {
    notFound()
  }

  const services = await getAllServices()

  // FinancialService Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": cityPage.nap?.name || `Lion Cash Advance ${cityPage.city}`,
    "image": `https://lioncashadvance.com/images/locations/${cityPage.id}.jpg`,
    "@id": `https://lioncashadvance.com${cityPage.seo?.canonicalUrl}`,
    "url": `https://lioncashadvance.com${cityPage.seo?.canonicalUrl}`,
    "telephone": cityPage.nap?.formattedPhone,
    "priceRange": "$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": cityPage.nap?.street,
      "addressLocality": cityPage.nap?.city,
      "addressRegion": cityPage.nap?.state,
      "postalCode": cityPage.nap?.zip,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": cityPage.nap?.coordinates?.latitude,
      "longitude": cityPage.nap?.coordinates?.longitude
    },
    "openingHoursSpecification": cityPage.localProof?.hours ? [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "09:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "09:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "09:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "09:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "09:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "10:00", "closes": "15:00" }
    ] : undefined,
    "parentOrganization": {
      "@type": "Organization",
      "name": "Lion Cash Advance",
      "url": "https://lioncashadvance.com"
    },
    "areaServed": `${cityPage.county} County, ${cityPage.state}`,
    "serviceType": "Cash Advance Loans",
    "aggregateRating": cityPage.localReviews?.reviews?.length > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": (cityPage.localReviews.reviews.reduce((sum, r) => sum + r.rating, 0) / cityPage.localReviews.reviews.length).toFixed(1),
      "reviewCount": cityPage.localReviews.reviews.length
    } : undefined
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Breadcrumbs items={cityPage.breadcrumbs} />

      {/* Hero Section */}
      <section className="gradient-primary hero-pattern relative py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary-dark/95" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              {cityPage.hero?.h1}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {cityPage.hero?.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href={cityPage.hero?.ctaUrl || '/apply'}
                className="btn-primary text-lg px-8 py-4 click-to-call"
              >
                {cityPage.hero?.ctaText}
              </Link>
              <a
                href={cityPage.hero?.secondaryCta?.url}
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold py-4 px-8 rounded-lg transition text-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {cityPage.hero?.secondaryCta?.text}
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Same-Day Approval
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No Credit Check
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Licensed Lender
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Proof Section - CRITICAL Anti-Doorway Content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Location Details */}
            <div>
              <h2 className="text-3xl font-display font-bold text-primary mb-6">
                {cityPage.localProof?.headline}
              </h2>

              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {cityPage.localProof?.directions}
              </p>

              {/* NAP */}
              <div className="bg-background rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">{cityPage.nap?.name}</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{cityPage.nap?.formattedAddress}</span>
                  </div>
                  <a
                    href={`tel:${cityPage.nap?.formattedPhone}`}
                    className="flex items-center gap-3 text-primary hover:text-accent transition font-semibold"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {cityPage.nap?.phone}
                  </a>
                </div>
              </div>

              {/* Hours */}
              {cityPage.localProof?.hours && (
                <div className="bg-background rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Business Hours</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(cityPage.localProof.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between py-1">
                        <span className="text-gray-600 capitalize">{day}:</span>
                        <span className="font-medium text-gray-900">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Map placeholder */}
            <div>
              <div className="bg-gray-200 rounded-xl aspect-square flex items-center justify-center mb-4">
                <div className="text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="font-medium">Map View</p>
                  <p className="text-sm">{cityPage.localProof?.neighborhoodName}</p>
                </div>
              </div>
              {cityPage.nap?.googleMapsUrl && (
                <a
                  href={cityPage.nap.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full justify-center inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Get Directions
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Available - Internal Links UP to Pillar Pages */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-primary mb-4">
              {cityPage.productLinks?.headline}
            </h2>
            <p className="text-gray-600 mb-8">
              {cityPage.productLinks?.intro}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {(cityPage.productLinks?.services || services.slice(0, 4)).map((service) => (
                <Link
                  key={service.slug}
                  href={service.url || `/services/${service.slug}`}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* State Compliance Section - YMYL Content */}
      {cityPage.stateCompliance && (
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-primary mb-6">
                {cityPage.stateCompliance.headline}
              </h2>

              <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                <p>{cityPage.stateCompliance.content}</p>
              </div>

              <div className="bg-primary/5 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Key {cityPage.state} Lending Protections
                </h3>
                <ul className="space-y-3">
                  {cityPage.stateCompliance.keyPoints?.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Regulatory Contact */}
              <div className="flex items-start gap-4 bg-background rounded-xl p-6">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-900">{cityPage.stateCompliance.regulatoryBody}</h4>
                  <p className="text-gray-600">
                    Phone: <a href={`tel:${cityPage.stateCompliance.regulatoryPhone}`} className="text-primary hover:underline">{cityPage.stateCompliance.regulatoryPhone}</a>
                  </p>
                  <p className="text-gray-600">
                    Website: <a href={cityPage.stateCompliance.regulatoryUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{cityPage.stateCompliance.regulatoryUrl}</a>
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 text-xs text-gray-500 italic border-t pt-4">
                {cityPage.stateCompliance.disclaimer}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Local Reviews */}
      {cityPage.localReviews?.reviews && cityPage.localReviews.reviews.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4">
            <Reviews
              reviews={cityPage.localReviews.reviews.map(r => ({
                ...r,
                location: `${cityPage.city}, ${cityPage.stateCode}`
              }))}
              title={cityPage.localReviews.headline}
            />
          </div>
        </section>
      )}

      {/* Nearby Locations - Neural Mesh */}
      {cityPage.nearbyLocations?.cities && cityPage.nearbyLocations.cities.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-display font-bold text-primary mb-2">
                {cityPage.nearbyLocations.headline}
              </h2>
              <p className="text-gray-600 mb-6">{cityPage.nearbyLocations.intro}</p>

              <div className="grid grid-cols-2 gap-3">
                {cityPage.nearbyLocations.cities.map((nearbyCity) => (
                  <CityCard
                    key={nearbyCity.slug}
                    name={nearbyCity.name}
                    slug={nearbyCity.slug}
                    state={cityPage.state}
                    stateSlug={cityPage.stateSlug}
                    distanceMiles={nearbyCity.distanceMiles}
                    variant="nearby"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {cityPage.faq && cityPage.faq.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <FAQ items={cityPage.faq} title={`${cityPage.city} Cash Advance FAQ`} />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding gradient-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h2 className="text-3xl font-display font-bold mb-4">
                  {cityPage.ctaSection?.headline}
                </h2>
                <p className="text-white/90 mb-6">
                  {cityPage.ctaSection?.subheadline}
                </p>
                <p className="text-white/80 text-sm mb-6">
                  {cityPage.ctaSection?.address}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={cityPage.ctaSection?.primaryCta?.url || '/apply'}
                    className="btn-primary text-center"
                  >
                    {cityPage.ctaSection?.primaryCta?.text}
                  </Link>
                  <a
                    href={cityPage.ctaSection?.secondaryCta?.url}
                    className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition text-center"
                  >
                    {cityPage.ctaSection?.secondaryCta?.text}
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-display font-bold text-primary mb-4">
                  Quick Contact
                </h3>
                <ContactForm location={cityPage.id} variant="compact" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
