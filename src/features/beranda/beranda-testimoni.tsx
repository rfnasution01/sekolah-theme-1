import { NoData } from '@/components/NoData'
import './detail.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { bgPrimary100, bgPrimary700 } from '@/libs/helpers/format-color'
import { useInView } from 'react-intersection-observer'
import { SingleSkeleton } from '@/components/skeleton'
import { TestimoniType } from '@/libs/types/testimoni-type'
import { useGetTestimoniQuery } from '@/store/slices/testimoniAPI'
import { BerandaCardTestimoni } from './beranda-card-testimoni'
import { ChevronRight } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'

export function BerandaTestimoni({ color }: { color: string }) {
  const [showIndex, setShowIndex] = useState<number>(0)

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

  // --- Testimoni ---
  const [testimoni, setTestimoni] = useState<TestimoniType[]>([])
  const {
    data: dataTestimoni,
    isFetching: isFetchingTestimoni,
    isLoading: isLoadingTestimoni,
  } = useGetTestimoniQuery({
    page_number: 1,
    page_size: 100,
  })

  const loadingTestimoni = isFetchingTestimoni || isLoadingTestimoni

  useEffect(() => {
    if (dataTestimoni?.data) {
      setTestimoni(dataTestimoni?.data)
    }
  }, [dataTestimoni?.data])

  const dispatch = useDispatch()

  return (
    <div className="flex w-full flex-col gap-32 px-64 phones:px-32">
      {/* --- Title --- */}
      <div className="flex w-full items-center">
        <hr className="flex-1 border border-primary-100" />
        <p className="rounded-2xl border border-primary-100 p-24 text-center font-roboto text-[5rem]">
          Apa kata mereka?
        </p>
        <hr className="flex-1 border border-primary-100" />
      </div>
      {loadingTestimoni ? (
        <SingleSkeleton height="h-[30vh]" />
      ) : (
        <div ref={ref}>
          {isLoaded ? (
            <>
              <div className="block phones:hidden">
                {testimoni?.length > 0 ? (
                  <div className="flex flex-col gap-24">
                    <div className="flex items-center gap-32">
                      {/* Mapping Data */}
                      <div className="grid flex-1 grid-cols-12 gap-32">
                        {testimoni
                          ?.slice(showIndex, showIndex + 3)
                          ?.map((item, idx) => (
                            <Link
                              to={`/testimonial/page/${item?.id}`}
                              key={idx}
                              className="col-span-4 h-full phones:col-span-12"
                              onClick={() => {
                                localStorage.setItem('beritaID', item?.id)
                                dispatch(
                                  setStateHalaman({
                                    page: item?.nama,
                                    id: item?.id,
                                  }),
                                )
                              }}
                            >
                              <div className="flex h-full flex-col items-center justify-center gap-32 rounded-2xl border bg-white p-32 shadow hover:cursor-pointer">
                                <div className="flex items-center justify-center">
                                  <img
                                    src={item?.photo ?? '/img/tutwuri.png'}
                                    alt={item?.nama}
                                    loading="lazy"
                                    className="h-[20rem] w-[20rem] rounded-full"
                                  />
                                </div>
                                <div className="flex flex-col items-center justify-center gap-16">
                                  <p className="text-[3rem] font-bold">
                                    {item?.nama}
                                  </p>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: item?.isi,
                                    }}
                                    className="line-clamp-4 text-center"
                                  />
                                </div>
                                <div
                                  className={`p-12 ${bgPrimary100(color)} rounded-full`}
                                >
                                  <ChevronRight size={24} />
                                </div>
                              </div>
                            </Link>
                          ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-24">
                      <button
                        type="button"
                        className="opacity-55 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
                        onClick={() => {
                          if (showIndex > 0) {
                            setShowIndex(showIndex - 1)
                          } else {
                            setShowIndex(testimoni?.length - 3)
                          }
                        }}
                      >
                        <img src="/icon/IconLeft.svg" alt="Icon Left" />
                      </button>
                      <button
                        type="button"
                        className="opacity-55 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
                        onClick={() => {
                          if (showIndex < testimoni?.length - 3) {
                            setShowIndex(showIndex + 1)
                          } else {
                            setShowIndex(0)
                          }
                        }}
                      >
                        <img src="/icon/IconRight.svg" alt="Icon Right" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <NoData />
                )}
              </div>
              <div className="hidden phones:block">
                {testimoni?.length > 0 ? (
                  <div className="flex items-center gap-32">
                    {/* Mapping Data */}
                    <div className="flex h-full w-full items-center overflow-x-auto">
                      {testimoni?.map((item, idx) => (
                        <Link
                          to={`/testimonial/page/${item?.id}`}
                          key={idx}
                          className="w-11/12 flex-shrink-0 flex-grow"
                          onClick={() => {
                            localStorage.setItem('beritaID', item?.id)
                            dispatch(
                              setStateHalaman({
                                page: item?.nama,
                                id: item?.id,
                              }),
                            )
                          }}
                        >
                          <BerandaCardTestimoni props={item} />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NoData />
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-32 phones:hidden">
                <SingleSkeleton height="h-[50vh]" width="w-1/3" />
                <SingleSkeleton height="h-[50vh]" width="w-1/3" />
                <SingleSkeleton height="h-[50vh]" width="w-1/3" />
              </div>
              <div className="hidden phones:block">
                <SingleSkeleton height="h-[50vh]" width="w-full" />
              </div>
            </>
          )}
        </div>
      )}
      <div className="flex items-center justify-center">
        <Link
          to={'/testimonial'}
          className={`${bgPrimary700(color)} rounded-lg px-24 py-12 `}
        >
          Lihat Semua
        </Link>
      </div>
    </div>
  )
}
