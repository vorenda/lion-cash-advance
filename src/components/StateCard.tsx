import Link from 'next/link'

interface StateCardProps {
  name: string
  slug: string
  code: string
  cityCount: number
  variant?: 'default' | 'compact'
}

export function StateCard({
  name,
  slug,
  code,
  cityCount,
  variant = 'default',
}: StateCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        href={`/locations/${slug}`}
        className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition group"
      >
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
            {code}
          </span>
          <span className="font-semibold text-gray-900 group-hover:text-primary transition">
            {name}
          </span>
        </div>
        <span className="text-sm text-gray-500">{cityCount} cities</span>
      </Link>
    )
  }

  return (
    <Link
      href={`/locations/${slug}`}
      className="block bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary transition group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-xl">{code}</span>
        </div>
        <span className="bg-accent/10 text-accent font-semibold text-sm px-3 py-1 rounded-full">
          {cityCount} cities
        </span>
      </div>

      <h3 className="text-xl font-display font-bold text-gray-900 mb-2 group-hover:text-primary transition">
        {name}
      </h3>

      <p className="text-gray-600 text-sm mb-4">
        Cash advance loans available across {cityCount} cities in {name}. Same-day approval with no credit check.
      </p>

      <span className="inline-flex items-center text-primary font-semibold group-hover:text-accent transition">
        View Locations
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  )
}
