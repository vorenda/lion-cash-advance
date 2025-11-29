'use client'

import Link from 'next/link'
import { useState } from 'react'

interface HeaderProps {
  phone?: string
}

export function Header({ phone = '1-800-555-CASH' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [locationsOpen, setLocationsOpen] = useState(false)

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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar with phone */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <span>Fast Cash When You Need It Most</span>
          <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 hover:text-accent transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Now: {phone}
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-2xl font-display font-bold text-primary">Lion Cash Advance</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition font-medium">
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link href="/services" className="text-gray-700 hover:text-primary transition font-medium flex items-center gap-1">
                Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {servicesOpen && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 mt-1 border">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-primary hover:text-white transition"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setLocationsOpen(true)}
              onMouseLeave={() => setLocationsOpen(false)}
            >
              <Link href="/locations" className="text-gray-700 hover:text-primary transition font-medium flex items-center gap-1">
                Locations
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {locationsOpen && (
                <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg py-2 mt-1 border">
                  {states.map((state) => (
                    <Link
                      key={state.slug}
                      href={`/locations/${state.slug}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-primary hover:text-white transition"
                    >
                      {state.name}
                    </Link>
                  ))}
                  <hr className="my-2 border-gray-200" />
                  <Link
                    href="/locations"
                    className="block px-4 py-2 text-primary hover:bg-primary hover:text-white transition font-medium"
                  >
                    View All Locations
                  </Link>
                </div>
              )}
            </div>

            <Link href="/about" className="text-gray-700 hover:text-primary transition font-medium">
              About Us
            </Link>

            <Link href="/contact" className="text-gray-700 hover:text-primary transition font-medium">
              Contact
            </Link>

            {/* CTA Button */}
            <Link
              href="/apply"
              className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/services" className="text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Services</Link>
              <div className="pl-4 space-y-2">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="block text-gray-600 text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
              <Link href="/locations" className="text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Locations</Link>
              <div className="pl-4 space-y-2">
                {states.map((state) => (
                  <Link
                    key={state.slug}
                    href={`/locations/${state.slug}`}
                    className="block text-gray-600 text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {state.name}
                  </Link>
                ))}
              </div>
              <Link href="/about" className="text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link href="/contact" className="text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                className="bg-primary text-white text-center py-3 rounded-lg font-semibold"
              >
                Call {phone}
              </a>
              <Link
                href="/apply"
                className="bg-accent text-white text-center py-3 rounded-lg font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
