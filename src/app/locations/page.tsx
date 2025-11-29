import { Metadata } from 'next'
import Link from 'next/link'
import { getAllStates } from '@/lib/data'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { StateCard } from '@/components/StateCard'
import { TrustBadges } from '@/components/TrustBadges'

export const metadata: Metadata = {
  title: 'Locations - Find Cash Advance Near You',
  description: 'Find Lion Cash Advance locations in Florida and California. Same-day cash advance loans with no credit check. Visit a branch near you for fast approval.',
}

export default async function LocationsPage() {
  const states = await getAllStates()

  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Locations', url: '/locations' },
  ]

  const totalCities = states.reduce((acc, s) => acc + s.cityCount, 0)

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <section className="gradient-primary hero-pattern relative py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary-dark/95" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Find Cash Advance Near You
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            {totalCities}+ locations across {states.length} states. Same-day approval and funding at every branch.
          </p>
          <a
            href="tel:1-800-555-CASH"
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call 1-800-555-CASH
          </a>
        </div>
      </section>

      {/* States Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-primary mb-4">
              Select Your State
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your state to find all Lion Cash Advance locations near you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {states.map((state) => (
              <StateCard
                key={state.slug}
                name={state.name}
                slug={state.slug}
                code={state.code}
                cityCount={state.cityCount}
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

      {/* Why Visit Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-primary mb-4">
              Why Visit a Lion Cash Advance Location?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Same-Day Cash',
                description: 'Walk in and walk out with cash in hand the same day. No waiting for bank transfers.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Personal Service',
                description: 'Our friendly staff will explain all your options and help you choose the best loan for your situation.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                title: 'Convenient Hours',
                description: 'Most locations open Monday-Saturday with extended hours. Visit before or after work.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="text-primary mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Prefer to Apply Online?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            You can also apply from home and get approved in minutes. Funds deposited directly to your bank account.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="btn-primary text-lg"
            >
              Apply Online Now
            </Link>
            <a
              href="tel:1-800-555-CASH"
              className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition text-lg"
            >
              Call 1-800-555-CASH
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
