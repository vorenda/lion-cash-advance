interface TrustBadgesProps {
  variant?: 'default' | 'compact' | 'hero'
}

export function TrustBadges({ variant = 'default' }: TrustBadgesProps) {
  const badges = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Licensed & Insured',
      description: 'State licensed lender',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Same-Day Approval',
      description: 'Fast 15-minute decisions',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Secure & Private',
      description: 'Your data is protected',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      title: '4.9 Star Rating',
      description: '3,500+ happy customers',
    },
  ]

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap justify-center gap-6">
        {badges.slice(0, 3).map((badge, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-primary">{badge.icon}</span>
            <span>{badge.title}</span>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
          >
            <span className="text-accent">{badge.icon}</span>
            <span className="text-white">{badge.title}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <div className="text-primary mb-3 flex justify-center">{badge.icon}</div>
          <h3 className="font-semibold text-gray-900 mb-1">{badge.title}</h3>
          <p className="text-sm text-gray-600">{badge.description}</p>
        </div>
      ))}
    </div>
  )
}
