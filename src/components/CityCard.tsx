import Link from 'next/link'

interface CityCardProps {
  name: string
  slug: string
  state: string
  stateSlug: string
  county?: string
  population?: number
  phone?: string
  distanceMiles?: number
  variant?: 'default' | 'compact' | 'nearby'
}

export function CityCard({
  name,
  slug,
  state,
  stateSlug,
  county,
  population,
  phone,
  distanceMiles,
  variant = 'default',
}: CityCardProps) {
  const url = `/locations/${stateSlug}/${slug}`

  if (variant === 'nearby') {
    return (
      <Link
        href={url}
        className="flex items-center justify-between p-3 bg-white rounded border hover:border-primary hover:shadow-sm transition"
      >
        <span className="font-medium text-gray-900">{name}</span>
        {distanceMiles && (
          <span className="text-sm text-gray-500">({distanceMiles} mi)</span>
        )}
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link
        href={url}
        className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition">
              {name}, {state}
            </h3>
            {county && (
              <p className="text-sm text-gray-500">{county} County</p>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        {population && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            Pop. {population.toLocaleString()}
          </span>
        )}
      </div>

      <h3 className="text-xl font-display font-bold text-gray-900 mb-1 group-hover:text-primary transition">
        {name}
      </h3>
      <p className="text-gray-600 mb-4">
        {county && `${county} County, `}{state}
      </p>

      {phone && (
        <a
          href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
          className="flex items-center gap-2 text-primary hover:text-accent transition mb-4"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {phone}
        </a>
      )}

      <Link
        href={url}
        className="inline-flex items-center text-primary font-semibold hover:text-accent transition"
      >
        View Location
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
