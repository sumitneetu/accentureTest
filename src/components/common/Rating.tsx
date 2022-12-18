import React from 'react'
interface RattingProp {
  yellowStar: Number
  grayStar: Number
  percentage: any
  ratingCount: Number
}

export const Rating = ({
  yellowStar,
  grayStar,
  percentage,
  ratingCount,
}: RattingProp) => {
  console.log('yellowStar', yellowStar)

  return (
    <div className="flex items-center px-2">
      {yellowStar &&
        new Array(yellowStar).fill(0).map(() => (
          <svg className="h-4 w-4" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="yellow">
                <stop offset="100%" stop-color="#ffc107" />
                <stop offset="0%" stop-color="#adb5bd" />
              </linearGradient>
            </defs>
            <path
              fill="url(#yellow)"
              d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
  l11.547-1.2L16.026,0.6L20.388,10.918z"
            />
          </svg>
        ))}

      {grayStar &&
        new Array(grayStar).fill(0).map((v, k) =>
          k == 0 ? (
            <svg className="h-4 w-4" viewBox="0 0 32 32">
              sds
              <defs>
                <linearGradient id="gray">
                  <stop offset={`${percentage}%`} stop-color="#ffc107" />
                  <stop offset={`${100 - percentage}%`} stop-color="#adb5bd" />
                </linearGradient>
              </defs>
              <path
                fill="url(#gray)"
                d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
  l11.547-1.2L16.026,0.6L20.388,10.918z"
              />
            </svg>
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 32 32">
              <defs>
                <linearGradient id="grayy">
                  <stop offset="100%" stop-color="#adb5bd" />
                </linearGradient>
              </defs>
              <path
                fill="url(#grayy)"
                d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
  l11.547-1.2L16.026,0.6L20.388,10.918z"
              />
            </svg>
          )
        )}

      <p className="p-1 text-xs">({ratingCount})</p>
    </div>
  )
}

export default Rating
