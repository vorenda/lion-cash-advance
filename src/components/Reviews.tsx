interface Review {
  name: string
  rating: number
  text: string
  date?: string
  location?: string
}

interface ReviewsProps {
  reviews: Review[]
  title?: string
}

export function Reviews({ reviews, title = 'What Our Customers Say' }: ReviewsProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-accent' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-display font-bold text-primary mb-8 text-center">{title}</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">{review.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  {review.location && (
                    <p className="text-sm text-gray-500">{review.location}</p>
                  )}
                </div>
              </div>
              {renderStars(review.rating)}
            </div>

            <p className="text-gray-700 leading-relaxed">&ldquo;{review.text}&rdquo;</p>

            {review.date && (
              <p className="text-sm text-gray-400 mt-4">
                {new Date(review.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
