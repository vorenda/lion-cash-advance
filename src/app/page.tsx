import Link from 'next/link'
import { getAllServices, getAllStates } from '@/lib/data'
import { ServiceCard } from '@/components/ServiceCard'
import { StateCard } from '@/components/StateCard'
import { TrustBadges } from '@/components/TrustBadges'
import { Reviews } from '@/components/Reviews'
import { FAQ } from '@/components/FAQ'
import { ContactForm } from '@/components/ContactForm'

export default async function HomePage() {
  const services = await getAllServices()
  const states = await getAllStates()

  const testimonials = [
    {
      name: 'Maria R.',
      rating: 5,
      text: 'Fast service! Got approved in 15 minutes and had cash in my account the same day. The staff was professional and explained everything clearly.',
      location: 'Miami, FL',
    },
    {
      name: 'James T.',
      rating: 5,
      text: 'When my car broke down unexpectedly, Lion Cash Advance saved the day. Easy process and no judgment about my credit history.',
      location: 'Los Angeles, CA',
    },
    {
      name: 'Sandra L.',
      rating: 5,
      text: 'I appreciated the transparent fees - no surprises. The online application was simple and I had my money within hours.',
      location: 'Tampa, FL',
    },
    {
      name: 'Robert M.',
      rating: 5,
      text: 'Great customer service. They worked with me when I needed an extension and never made me feel bad about my situation.',
      location: 'San Diego, CA',
    },
    {
      name: 'Patricia H.',
      rating: 4,
      text: 'Convenient location near me and the process was quick. Would recommend for anyone needing emergency cash.',
      location: 'Orlando, FL',
    },
    {
      name: 'David K.',
      rating: 5,
      text: 'This was my first time getting a cash advance and they made it stress-free. Clear explanations and fast approval.',
      location: 'Sacramento, CA',
    },
  ]

  const faqs = [
    {
      question: 'How fast can I get cash from Lion Cash Advance?',
      answer: 'Most borrowers complete the application in 5 minutes, receive approval within 15-30 minutes, and get funds in their account the same day. Some borrowers receive cash within just a few hours of applying.',
    },
    {
      question: 'Can I get a cash advance with bad credit?',
      answer: 'Yes! We work with borrowers of all credit types - including those with bad credit, no credit history, previous bankruptcies, or other credit challenges. Your income is what matters most to us, not your credit score.',
    },
    {
      question: 'What do I need to apply for a cash advance?',
      answer: 'You need a valid government-issued ID, proof of income (recent pay stub or bank statement), and an active checking account. The application takes just 5 minutes to complete.',
    },
    {
      question: 'How much can I borrow?',
      answer: 'Loan amounts vary by state and loan type. In Florida, single-payment loans go up to $500 and installment loans up to $1,000. In California, the maximum is $300. Your specific amount depends on your income and state regulations.',
    },
    {
      question: 'What states do you serve?',
      answer: 'Lion Cash Advance currently serves Florida and California, with locations across major cities in both states. Visit our Locations page to find a branch near you.',
    },
    {
      question: 'Are your loans safe and legal?',
      answer: 'Yes, Lion Cash Advance is a licensed lender operating in compliance with all applicable federal and state lending laws. We are regulated by the Florida Office of Financial Regulation and the California Department of Financial Protection and Innovation.',
    },
  ]

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Lion Cash Advance",
    "description": "Fast cash advance loans with same-day approval and no credit check required.",
    "url": "https://lioncashadvance.com",
    "telephone": "1-800-555-CASH",
    "email": "support@lioncashadvance.com",
    "areaServed": ["Florida", "California"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "3500"
    },
    "sameAs": [
      "https://www.facebook.com/lioncashadvance",
      "https://www.twitter.com/lioncashadvance"
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="gradient-primary hero-pattern relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary-dark/95" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Fast Cash Advance Loans
              <span className="block text-accent mt-2">When You Need Them Most</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Same-day approval. No credit check required. Get up to $1,000 in Florida or $300 in California.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/apply"
                className="btn-primary text-lg px-8 py-4 click-to-call inline-flex items-center justify-center gap-2"
              >
                Apply Now - Get Cash Today
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/locations"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold py-4 px-8 rounded-lg transition text-lg"
              >
                Find a Location Near You
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Licensed & Insured
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                15-Minute Approval
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No Credit Check
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.9 Star Rating
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-background" viewBox="0 0 1440 120" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,96L60,90.7C120,85,240,75,360,74.7C480,75,600,85,720,90.7C840,96,960,96,1080,90.7C1200,85,1320,75,1380,69.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <TrustBadges />
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get cash in your hands in as little as 30 minutes with our simple 3-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Apply Online or In-Store',
                description: 'Fill out our quick 5-minute application online or visit any of our locations. Just bring your ID and proof of income.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
              },
              {
                step: 2,
                title: 'Get Approved Fast',
                description: 'Our team reviews your application and verifies your income. Most borrowers are approved within 15-30 minutes.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                step: 3,
                title: 'Receive Your Cash',
                description: 'Once approved, funds are deposited directly to your bank account. Most customers receive their money the same day.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white mb-6">
                  <span className="text-2xl font-bold">{item.step}</span>
                </div>
                <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 -z-10 hidden md:block" style={{ transform: item.step < 3 ? 'translateX(50%)' : 'translateX(-150%)', display: item.step === 3 ? 'none' : undefined }} />
                <h3 className="text-xl font-display font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/apply" className="btn-primary text-lg inline-flex items-center gap-2">
              Start Your Application
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Our Loan Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the cash advance option that best fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => (
              <ServiceCard
                key={service.slug}
                name={service.serviceName}
                slug={service.slug}
                description={service.content?.whatIs?.content?.substring(0, 150) + '...' || service.hero?.subheadline || ''}
                amountRange={service.comparison?.types?.find(t => t.slug === service.slug)?.amountRange}
                termRange={service.comparison?.types?.find(t => t.slug === service.slug)?.termRange}
                bestFor={service.comparison?.types?.find(t => t.slug === service.slug)?.bestFor}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/services" className="btn-outline inline-flex items-center gap-2">
              View All Services
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Serving {states.reduce((acc, s) => acc + s.cityCount, 0)}+ Cities Across {states.length} States
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find a Lion Cash Advance location near you for same-day service
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

          <div className="text-center mt-8">
            <Link href="/locations" className="btn-secondary inline-flex items-center gap-2">
              Find Your Nearest Location
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding gradient-primary hero-pattern relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary-dark/95" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Why Choose Lion Cash Advance?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              We are committed to helping you through financial emergencies with fast, fair, and transparent service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: '10+ Years Experience',
                description: 'Helping customers since 2014 with reliable cash advance services',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                title: 'Same-Day Funding',
                description: 'Get your cash the same day you apply - no waiting around',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Transparent Pricing',
                description: 'No hidden fees - all costs are disclosed upfront before you borrow',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: 'Professional Service',
                description: 'Respectful, discreet service that treats you like family',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-accent mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <Reviews reviews={testimonials} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our cash advance services
            </p>
          </div>

          <FAQ items={faqs} title="" />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Apply now for fast cash or contact us with any questions. Our friendly team is here to help you through your financial emergency.
              </p>

              <div className="space-y-4">
                <a
                  href="tel:1-800-555-CASH"
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition group"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white group-hover:bg-accent transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call Us Now</p>
                    <p className="text-xl font-semibold text-primary">1-800-555-CASH</p>
                  </div>
                </a>

                <Link
                  href="/locations"
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition group"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white group-hover:bg-accent transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Find a Location</p>
                    <p className="text-xl font-semibold text-primary">{states.reduce((acc, s) => acc + s.cityCount, 0)}+ Cities Across {states.length} States</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-display font-bold text-primary mb-6">
                Send Us a Message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
