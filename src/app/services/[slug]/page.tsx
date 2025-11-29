import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getService, generateServiceParams, getAllServices } from '@/lib/data'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ServiceCard } from '@/components/ServiceCard'
import { FAQ } from '@/components/FAQ'
import { TrustBadges } from '@/components/TrustBadges'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return generateServiceParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: service.seo?.title || service.serviceName,
    description: service.seo?.metaDescription || service.hero?.subheadline,
    keywords: service.seo?.keywords,
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    notFound()
  }

  const allServices = await getAllServices()
  const relatedServices = allServices
    .filter(s => s.slug !== slug)
    .slice(0, 3)

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/services' },
    { label: service.serviceName, url: `/services/${slug}` },
  ]

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": `${service.serviceName} - Lion Cash Advance`,
    "description": service.seo?.metaDescription || service.hero?.subheadline,
    "url": `https://lioncashadvance.com/services/${slug}`,
    "provider": {
      "@type": "FinancialService",
      "name": "Lion Cash Advance",
      "url": "https://lioncashadvance.com"
    },
    "areaServed": ["Florida", "California"],
    "serviceType": service.serviceName
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <section className="gradient-primary hero-pattern relative py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary-dark/95" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              {service.hero?.h1 || service.serviceName}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              {service.hero?.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={service.hero?.ctaUrl || '/apply'}
                className="btn-primary text-lg px-8 py-4"
              >
                {service.hero?.ctaText || 'Apply Now'}
              </Link>
              <a
                href="tel:1-800-555-CASH"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold py-4 px-8 rounded-lg transition text-lg"
              >
                Call 1-800-555-CASH
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <TrustBadges variant="compact" />
        </div>
      </section>

      {/* What Is Section */}
      {service.content?.whatIs && (
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-primary mb-6">
                {service.content.whatIs.heading}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>{service.content.whatIs.content}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {service.content?.benefits && (
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-primary mb-8">
                {service.content.benefits.heading}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {service.content.benefits.items.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <svg className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {service.content?.process && (
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-primary mb-8 text-center">
                {service.content.process.heading}
              </h2>
              <div className="space-y-6">
                {service.content.process.steps.map((step) => (
                  <div key={step.step} className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Loan Types Comparison */}
      {service.comparison && (
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-primary mb-4">
                {service.comparison.heading}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {service.comparison.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {service.comparison.types.map((type) => (
                <div key={type.slug} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{type.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Amount:</span>
                      <span className="font-medium">{type.amountRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Term:</span>
                      <span className="font-medium">{type.termRange}</span>
                    </div>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-3">
                    <p className="text-sm">
                      <span className="font-semibold text-primary">Best for:</span>{' '}
                      <span className="text-gray-700">{type.bestFor}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Requirements Section */}
      {service.content?.requirements && (
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-primary mb-6">
                {service.content.requirements.heading}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>{service.content.requirements.content}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      {service.whyLionCashAdvance && (
        <section className="section-padding gradient-primary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                {service.whyLionCashAdvance.heading}
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                {service.whyLionCashAdvance.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {service.whyLionCashAdvance.reasons.slice(0, 6).map((reason, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{reason.title}</h3>
                  <p className="text-white/70 text-sm">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {service.faqNational && service.faqNational.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <FAQ items={service.faqNational} title={`${service.serviceName} FAQ`} />
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-primary mb-4">
                Related Services
              </h2>
              <p className="text-xl text-gray-600">
                Explore other cash advance options that might fit your needs
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedServices.map((relatedService) => (
                <ServiceCard
                  key={relatedService.slug}
                  name={relatedService.serviceName}
                  slug={relatedService.slug}
                  description={relatedService.hero?.subheadline || ''}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-primary mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Apply now for {service.serviceName.toLowerCase()} and get cash today. Fast approval, no credit check.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="btn-primary text-lg px-8 py-4"
              >
                Apply Now
              </Link>
              <Link
                href="/locations"
                className="btn-outline text-lg px-8 py-4"
              >
                Find a Location
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
