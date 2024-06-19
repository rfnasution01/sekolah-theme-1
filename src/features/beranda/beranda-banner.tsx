import { SingleSkeleton } from '@/components/skeleton'
import { Slider5 } from '@/components/slider/slider-5'
import { bgPrimary200, bgPrimary800 } from '@/libs/helpers/format-color'
import { SliderType } from '@/libs/types/beranda-type'
import { useGetSliderQuery } from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

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

  useEffect(() => {
    if (inView) {
      // Simulate data fetching
      setTimeout(() => {
        setIsLoaded(true)
      }, 1000) // Adjust the delay as needed
    }
  }, [inView])

  const [showIndex, setShowIndex] = useState<number>(0)

  return (
    <div className="flex h-full min-h-[30vh]">
      {loadingSlider ? (
        <SingleSkeleton height="h-[30vh]" />
      ) : (
        <div ref={ref} className="flex w-full flex-col gap-32">
          {isLoaded ? (
            <>
              <div className="flex h-full w-full">
                <div className="w-1/12 phones:w-1/12">
                  {showIndex > 0 && (
                    <div className="h-full flex-shrink-0">
                      <Slider5
                        gambar={slider?.[showIndex - 1]?.gambar}
                        keterangan={slider?.[showIndex - 1]?.judul}
                        height="h-[77vh]"
                        seo={slider?.[showIndex - 1]?.judul}
                        isShadow
                        slider={slider}
                        showIndex={showIndex}
                        setShowIndex={setShowIndex}
                      />
                    </div>
                  )}
                </div>
                <div className="w-10/12 flex-shrink-0 phones:w-10/12">
                  <Slider5
                    gambar={slider?.[showIndex]?.gambar}
                    keterangan={slider?.[showIndex]?.judul}
                    height="h-[77vh]"
                    seo={slider?.[showIndex]?.judul}
                    slider={slider}
                    showIndex={showIndex}
                    setShowIndex={setShowIndex}
                    isShowNext
                  />
                </div>
                <div className="w-1/12 flex-shrink-0 phones:w-1/12">
                  {showIndex < slider?.length - 1 && (
                    <div className="h-full">
                      <Slider5
                        gambar={slider?.[showIndex + 1]?.gambar}
                        keterangan={slider?.[showIndex + 1]?.judul}
                        height="h-[77vh]"
                        seo={slider?.[showIndex + 1]?.url}
                        isShadow
                        slider={slider}
                        showIndex={showIndex}
                        setShowIndex={setShowIndex}
                      />
                    </div>
                  )}
                </div>
              </div>
              {slider?.length > 1 && (
                <div className="flex items-center justify-center gap-x-16">
                  {slider?.map((_item, idx) => (
                    <div
                      onClick={() => setShowIndex(idx)}
                      className={`h-16 w-16 rounded-full hover:cursor-pointer ${idx === showIndex ? bgPrimary800(color) : bgPrimary200(color)}`}
                      key={idx}
                    />
                  ))}
                </div>
              )}

              {/* <div className={`relative col-span-6 block`}>
                <img
                  src={slider?.[showIndex]?.gambar}
                  alt={slider?.[showIndex]?.judul}
                  className={`h-[77vh] w-full rounded-lg bg-opacity-10 object-cover filter phones:h-[30vh]`}
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
                    className={`relative flex h-full w-[80%] flex-col justify-end border-white phones:w-[70%]`}
                  >
                    {slider?.length > 1 && (
                      <div
                        className={`absolute bottom-0 top-0 flex w-full flex-grow items-center justify-between px-4 phones:w-full`}
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
                            'hover:cursor-pointer':
                              showIndex < slider?.length - 1,
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
              )} */}
            </>
          ) : (
            <SingleSkeleton height="h-[30vh]" />
          )}
        </div>
      )}
    </div>
  )
}
