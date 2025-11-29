import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Lion Cash Advance | Fast Cash Loans with Same-Day Approval',
    template: '%s | Lion Cash Advance'
  },
  description: 'Get fast cash advance loans with same-day approval and no credit check required. Serving Florida and California with payday loans, installment loans, and emergency cash.',
  keywords: ['cash advance', 'payday loans', 'fast cash', 'emergency loans', 'no credit check loans', 'same day loans'],
  authors: [{ name: 'Lion Cash Advance' }],
  creator: 'Lion Cash Advance',
  publisher: 'Lion Cash Advance',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lioncashadvance.com',
    siteName: 'Lion Cash Advance',
    title: 'Lion Cash Advance | Fast Cash Loans with Same-Day Approval',
    description: 'Get fast cash advance loans with same-day approval and no credit check required.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lion Cash Advance | Fast Cash Loans',
    description: 'Same-day approval, no credit check required.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header phone="1-800-555-CASH" />
        <main className="flex-grow">{children}</main>
        <Footer phone="1-800-555-CASH" email="support@lioncashadvance.com" />
      </body>
    </html>
  )
}
