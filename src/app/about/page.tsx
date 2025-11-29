import { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { TrustBadges } from '@/components/TrustBadges'

export const metadata: Metadata = {
  title: 'About Lion Cash Advance',
  description: 'Learn about Lion Cash Advance - your trusted partner for fast cash advance loans since 2014. Licensed, transparent, and committed to helping you through financial emergencies.',
}

export default function AboutPage() {
  const breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'About Us', url: '/about' },
  ]

  const teamMembers = [
    {
      name: 'Michael Thompson',
      role: 'Founder & CEO',
      bio: 'With over 20 years in consumer finance, Michael founded Lion Cash Advance to provide fair, fast, and transparent lending solutions.',
    },
    {
      name: 'Sarah Martinez',
      role: 'Chief Operations Officer',
      bio: 'Sarah oversees all branch operations, ensuring every customer receives the same high-quality service across all locations.',
    },
    {
      name: 'David Chen',
      role: 'Chief Compliance Officer',
      bio: 'David ensures Lion Cash Advance maintains strict compliance with all federal and state lending regulations.',
    },
  ]

  const values = [
    {
      title: 'Transparency',
      description: 'No hidden fees. All costs are disclosed upfront before you borrow.',
    },
    {
      title: 'Speed',
      description: 'We know emergencies do not wait. That is why we offer same-day approval and funding.',
    },
    {
      title: 'Respect',
      description: 'Financial emergencies can happen to anyone. We treat every customer with dignity.',
    },
    {
      title: 'Compliance',
      description: 'We follow all state and federal lending laws to protect our customers.',
    },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <section className="gradient-primary hero-pattern relative py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary-dark/95" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            About Lion Cash Advance
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Helping people through financial emergencies since 2014 with fast, fair, and transparent cash advance loans.
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <TrustBadges />
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-primary mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Lion Cash Advance was founded in 2014 with a simple mission: to provide fast, fair, and transparent cash advance loans to people facing financial emergencies.
              </p>
              <p>
                Our founder, Michael Thompson, spent over two decades in consumer finance and saw firsthand how traditional banks failed to serve people who needed quick access to cash. Long approval times, complicated applications, and strict credit requirements left millions of hardworking Americans without options when emergencies struck.
              </p>
              <p>
                Lion Cash Advance was created to fill that gap. We believe that a financial emergency should not be made worse by a lengthy approval process or hidden fees. That is why we focus on income verification rather than credit scores, offer same-day approval and funding, and clearly disclose all costs upfront.
              </p>
              <p>
                Today, Lion Cash Advance serves customers across Florida and California through dozens of local branches and our easy online application. We have helped over 100,000 customers get through financial emergencies with dignity and speed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-primary mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-primary mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to serving our customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-3xl">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-accent font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding gradient-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { number: '10+', label: 'Years in Business' },
              { number: '100k+', label: 'Customers Served' },
              { number: '50+', label: 'Branch Locations' },
              { number: '4.9', label: 'Star Rating' },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licensing */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-primary mb-6 text-center">
              Licensed & Compliant
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6 text-center">
                Lion Cash Advance is a licensed lender operating in full compliance with all applicable federal and state lending regulations.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background rounded-lg p-6">
                  <h3 className="font-semibold text-primary mb-2">Florida</h3>
                  <p className="text-gray-600 text-sm">
                    Licensed under Florida Statutes Chapter 560, regulated by the Florida Office of Financial Regulation.
                  </p>
                </div>
                <div className="bg-background rounded-lg p-6">
                  <h3 className="font-semibold text-primary mb-2">California</h3>
                  <p className="text-gray-600 text-sm">
                    Licensed under the California Deferred Deposit Transaction Law (CDDTL), regulated by the DFPI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-primary mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Apply now for fast cash or visit one of our locations to speak with a friendly team member.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="btn-primary">
              Apply Now
            </Link>
            <Link href="/locations" className="btn-outline">
              Find a Location
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
