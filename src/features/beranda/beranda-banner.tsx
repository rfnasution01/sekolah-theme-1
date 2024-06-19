import { SingleSkeleton } from '@/components/skeleton'
import { bgPrimary200, bgPrimary800 } from '@/libs/helpers/format-color'
import { SliderType } from '@/libs/types/beranda-type'
import { useGetSliderQuery } from '@/store/slices/berandaAPI'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'

export function BerandaBanner({ color }: { color: string }) {
  // --- Slider ---
  const [slider, setSlider] = useState<SliderType[]>([])
  const {
    data: dataSlider,
    isFetching: isFetchingSlider,
    isLoading: isLoadingSlider,
  } = useGetSliderQuery()

  const loadingSlider = isFetchingSlider || isLoadingSlider

  useEffect(() => {
    if (dataSlider?.data) {
      setSlider(dataSlider?.data)
    }
  }, [dataSlider?.data])

  const [isLoaded, setIsLoaded] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  console.log({ isLoaded }, { ref })

  useEffect(() => {
    if (inView) {
      // Simulate data fetching
      setTimeout(() => {
        setIsLoaded(true)
      }, 1000) // Adjust the delay as needed
    }
  }, [inView])

  const [showIndex, setShowIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (showIndex === slider?.length - 1) {
        setShowIndex(0)
      } else {
        setShowIndex(showIndex + 1)
      }
    }, 3000) // Mengganti gambar setiap 3 detik

    return () => clearInterval(interval)
  }, [showIndex])

  return (
    <div className="flex h-full min-h-[30vh]">
      {loadingSlider ? (
        <SingleSkeleton height="h-[30vh]" />
      ) : (
        <div className="flex flex-col gap-32">
          <div className={`relative block`}>
            <img
              src={slider?.[showIndex]?.gambar}
              alt={slider?.[showIndex]?.judul}
              className={`h-[30vh] w-full rounded-lg bg-opacity-10 object-cover filter phones:h-[30vh]`}
              style={{}}
              loading="lazy"
            />
            <Link
              to={slider?.[showIndex]?.url}
              target="_blank"
              className="absolute top-0 flex h-full w-[100%]"
            >
              <div className="h-full w-[10%] bg-black bg-opacity-60 phones:w-[15%]" />
              <div
                className={`relative flex h-full w-[80%] flex-col justify-end border-white`}
              >
                {/* --- Navigation -- */}
                {slider?.length > 1 && (
                  <div
                    className={`absolute bottom-0 top-0 flex w-[80%] flex-grow items-center justify-between px-4 phones:w-[70%]`}
                  >
                    <button
                      type="button"
                      className={clsx('', {
                        'hover:cursor-pointer': showIndex > 0,
                        'hover:cursor-not-allowed': !(showIndex > 0),
                      })}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation
                        if (showIndex > 0) {
                          setShowIndex(showIndex - 1)
                        }
                      }}
                    >
                      <img
                        src="/icon/IconLeft.svg"
                        alt="Icon Left"
                        loading="lazy"
                      />
                    </button>
                    <button
                      type="button"
                      className={clsx('', {
                        'hover:cursor-pointer': showIndex < slider?.length - 1,
                        'hover:cursor-not-allowed': !(
                          showIndex <
                          slider?.length - 1
                        ),
                      })}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (showIndex < slider?.length - 1) {
                          setShowIndex(showIndex + 1)
                        }
                      }}
                    >
                      <img
                        src="/icon/IconRight.svg"
                        alt="Icon Right"
                        loading="lazy"
                      />
                    </button>
                  </div>
                )}
              </div>

              <div className="h-full w-[10%] bg-black bg-opacity-60 phones:w-[15%]" />
            </Link>
          </div>
          {slider?.length > 1 && (
            <div className="flex items-center justify-center gap-x-16">
              {slider?.map((_item, idx) => (
                <div
                  className={`h-16 w-16 rounded-full ${idx === showIndex ? bgPrimary800(color) : bgPrimary200(color)}`}
                  key={idx}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
