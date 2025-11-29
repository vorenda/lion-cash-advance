import { Metadata } from 'next'
import Link from 'next/link'
import { getAllServices } from '@/lib/data'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ServiceCard } from '@/components/ServiceCard'
import { TrustBadges } from '@/components/TrustBadges'

export const metadata: Metadata = {
  title: 'Our Cash Advance Services',
  description: 'Explore Lion Cash Advance loan services including payday loans, installment loans, same-day loans, and bad credit loans. Fast approval, no credit check required.',
}

export default async function ServicesPage() {
  const services = await getAllServices()

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Services', url: '/services' },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <section className="gradient-primary hero-pattern relative py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary-dark/95" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Our Cash Advance Services
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Choose the loan option that best fits your financial needs. All our services feature fast approval and same-day funding.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                name={service.serviceName}
                slug={service.slug}
                description={service.hero?.subheadline || service.content?.whatIs?.content?.substring(0, 150) + '...' || ''}
                amountRange={service.comparison?.types?.find(t => t.slug === service.slug)?.amountRange}
                termRange={service.comparison?.types?.find(t => t.slug === service.slug)?.termRange}
                bestFor={service.comparison?.types?.find(t => t.slug === service.slug)?.bestFor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <TrustBadges />
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-primary mb-4">
              How Our Cash Advance Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting cash is fast and easy with our simple process
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: 1, title: 'Apply', description: '5-minute application online or in-store' },
              { step: 2, title: 'Verify', description: 'Quick income verification, no credit check' },
              { step: 3, title: 'Approve', description: 'Get approved in 15-30 minutes' },
              { step: 4, title: 'Receive', description: 'Cash deposited same day' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 mx-auto bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/apply" className="btn-primary text-lg">
              Start Your Application
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Not sure which loan type is right for you? Our team is here to help you find the best solution for your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1-800-555-CASH"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call 1-800-555-CASH
            </a>
            <Link
              href="/locations"
              className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition"
            >
              Find a Location
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
