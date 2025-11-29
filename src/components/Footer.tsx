import Link from 'next/link'

interface FooterProps {
  phone?: string
  email?: string
}

export function Footer({ phone = '1-800-555-CASH', email = 'support@lioncashadvance.com' }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const services = [
    { name: 'Cash Advance Loans', slug: 'cash-advance-loans' },
    { name: 'Payday Loans', slug: 'payday-loans' },
    { name: 'Installment Loans', slug: 'installment-loans' },
    { name: 'Same-Day Loans', slug: 'same-day-loans' },
    { name: 'Bad Credit Loans', slug: 'bad-credit-loans' },
  ]

  const states = [
    { name: 'Florida', slug: 'florida' },
    { name: 'California', slug: 'california' },
  ]

  return (
    <footer className="bg-surface-dark text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-xl font-display font-bold">Lion Cash Advance</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Fast cash advance loans when you need them most. Serving Florida and California with same-day approval and no credit check required.
            </p>
            <div className="space-y-2 text-sm">
              <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-accent hover:text-accent-light transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {phone}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {email}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-gray-400 hover:text-white transition text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-accent hover:text-accent-light transition text-sm font-medium">
                  View All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">Locations</h4>
            <ul className="space-y-2">
              {states.map((state) => (
                <li key={state.slug}>
                  <Link
                    href={`/locations/${state.slug}`}
                    className="text-gray-400 hover:text-white transition text-sm"
                  >
                    {state.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/locations" className="text-accent hover:text-accent-light transition text-sm font-medium">
                  View All Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-gray-400 hover:text-white transition text-sm">
                  Apply Now
                </Link>
              </li>
              <li>
                <Link href="/services/cash-advance-loans#faq" className="text-gray-400 hover:text-white transition text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Compliance Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="text-xs text-gray-500 space-y-3">
            <p>
              <strong>Important Disclosure:</strong> Lion Cash Advance is a licensed lender operating in compliance with all applicable federal and state lending laws. Loan availability, terms, and rates vary by state. California loans are made pursuant to the California Deferred Deposit Transaction Law (CDDTL). Florida loans are made pursuant to Florida Statutes Chapter 560.
            </p>
            <p>
              <strong>APR Disclosure:</strong> The Annual Percentage Rate (APR) is the cost of your loan expressed as a yearly rate. The APR for cash advance loans may range from 200% to 460% depending on loan amount, term, and state regulations. This is a short-term loan and should be used for short-term financial needs only, not as a long-term financial solution.
            </p>
            <p>
              <strong>Collection Practices:</strong> If you cannot repay your loan on time, contact us immediately to discuss options. We comply with all federal and state debt collection laws. We will not threaten you with criminal prosecution for non-payment.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-black">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              Copyright {currentYear} Lion Cash Advance LLC. All rights reserved. NMLS #1234567
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-white transition">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="text-gray-500 hover:text-white transition">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
