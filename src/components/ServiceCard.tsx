import Link from 'next/link'

interface ServiceCardProps {
  name: string
  slug: string
  description: string
  amountRange?: string
  termRange?: string
  bestFor?: string
  variant?: 'default' | 'compact' | 'featured'
}

export function ServiceCard({
  name,
  slug,
  description,
  amountRange,
  termRange,
  bestFor,
  variant = 'default',
}: ServiceCardProps) {
  const icons: Record<string, JSX.Element> = {
    'cash-advance-loans': (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'payday-loans': (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    'installment-loans': (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    'same-day-loans': (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    'bad-credit-loans': (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }

  const defaultIcon = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )

  if (variant === 'compact') {
    return (
      <Link
        href={`/services/${slug}`}
        className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition group"
      >
        <div className="flex items-center gap-3">
          <div className="text-primary group-hover:text-accent transition">
            {icons[slug] || defaultIcon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition">{name}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-8 shadow-lg">
        <div className="text-accent mb-4">{icons[slug] || defaultIcon}</div>
        <h3 className="text-2xl font-display font-bold mb-3">{name}</h3>
        <p className="text-white/90 mb-4">{description}</p>
        {amountRange && (
          <div className="mb-2">
            <span className="text-accent font-semibold">Amount:</span> {amountRange}
          </div>
        )}
        {termRange && (
          <div className="mb-4">
            <span className="text-accent font-semibold">Term:</span> {termRange}
          </div>
        )}
        <Link
          href={`/services/${slug}`}
          className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          Learn More
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group">
      <div className="text-primary group-hover:text-accent transition mb-4">
        {icons[slug] || defaultIcon}
      </div>
      <h3 className="text-xl font-display font-bold text-gray-900 mb-2 group-hover:text-primary transition">
        {name}
      </h3>
      <p className="text-gray-600 mb-4">{description}</p>

      {(amountRange || termRange) && (
        <div className="space-y-1 mb-4 text-sm">
          {amountRange && (
            <div className="flex justify-between">
              <span className="text-gray-500">Amount:</span>
              <span className="font-medium text-gray-900">{amountRange}</span>
            </div>
          )}
          {termRange && (
            <div className="flex justify-between">
              <span className="text-gray-500">Term:</span>
              <span className="font-medium text-gray-900">{termRange}</span>
            </div>
          )}
        </div>
      )}

      {bestFor && (
        <div className="bg-primary/5 rounded-lg p-3 mb-4">
          <p className="text-sm">
            <span className="font-semibold text-primary">Best for:</span>{' '}
            <span className="text-gray-700">{bestFor}</span>
          </p>
        </div>
      )}

      <Link
        href={`/services/${slug}`}
        className="inline-flex items-center text-primary font-semibold hover:text-accent transition"
      >
        Learn More
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
