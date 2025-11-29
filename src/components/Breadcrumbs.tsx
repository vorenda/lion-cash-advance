import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  url: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://lioncashadvance.com${item.url}`
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className="bg-background py-3">
        <div className="container mx-auto px-4">
          <ol className="flex items-center flex-wrap gap-2 text-sm">
            {items.map((item, index) => (
              <li key={item.url} className="flex items-center">
                {index > 0 && (
                  <svg className="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {index === items.length - 1 ? (
                  <span className="text-gray-600 font-medium">{item.label}</span>
                ) : (
                  <Link href={item.url} className="text-primary hover:text-primary-dark hover:underline transition">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  )
}
