import { NoData } from '@/components/NoData'
import { SingleSkeleton } from '@/components/skeleton'
import { convertToSlug } from '@/libs/helpers/format-text'
import { GaleriType } from '@/libs/types/galeri-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { useGetGaleriQuery } from '@/store/slices/galeriAPI'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

export function BerandaGaleri() {
  const [showIndex, setShowIndex] = useState<number>(0)
  const [galeri, setGaleri] = useState<GaleriType[]>()
  const {
    data: galeryData,
    isLoading: galeryLoading,
    isFetching: galeryFetching,
  } = useGetGaleriQuery({
    page_number: 1,
    page_size: 100,
  })

  const loadingGaleri = galeryFetching || galeryLoading

  useEffect(() => {
    if (galeryData?.data) {
      setGaleri(galeryData?.data)
    }
  }, [galeryData?.data])

  const dispatch = useDispatch()

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

  return (
    <>
      {galeri?.length > 0 && (
        <div
          className={`scrollbar relative col-span-4 h-full overflow-auto rounded-2xl hover:shadow-2xl`}
        >
          <img
            src="/img/danau-toba.jpg"
            alt="login"
            className="h-[100vh] w-full rounded-lg object-cover opacity-85"
          />
          <div className="absolute left-0 top-0 h-full w-full">
            <div className="grid h-full grid-cols-12">
              <div className="col-span-12 h-full max-h-screen bg-black bg-opacity-70">
                <div className="flex w-full flex-col gap-64 px-64 phones:px-32">
                  {/* --- Title --- */}
                  <div className="flex flex-col items-center justify-center gap-32">
                    <img
                      src="/img/block-icon-knowledge.png"
                      alt="Agenda"
                      loading="lazy"
                      className="h-[20rem] w-[20rem]"
                    />
                    <p className="text-[4rem] font-bold text-white">Galeri</p>
                  </div>
                  <div ref={ref}>
                    {!isLoaded ? (
                      <>
                        <div className="flex gap-32 phones:hidden">
                          <SingleSkeleton height="h-[40vh]" width="w-1/4" />
                          <SingleSkeleton height="h-[40vh]" width="w-1/4" />
                          <SingleSkeleton height="h-[40vh]" width="w-1/4" />
                          <SingleSkeleton height="h-[40vh]" width="w-1/4" />
                        </div>
                        <div className="hidden phones:block">
                          <div className="flex gap-32">
                            <SingleSkeleton height="h-[40vh]" width="w-full" />
                          </div>
                        </div>
                      </>
                    ) : loadingGaleri ? (
                      <SingleSkeleton height="h-[40vh]" width="w-[20%]" />
                    ) : (
                      <>
                        <div className="block phones:hidden">
                          {galeri?.length > 0 ? (
                            <div className="flex flex-col gap-24">
                              <div className="flex items-center gap-32">
                                {/* Mapping Data */}
                                <div className="grid flex-1 grid-cols-12 gap-32">
                                  {galeri
                                    ?.slice(showIndex, showIndex + 4)
                                    ?.map((item, idx) => (
                                      <Link
                                        to={`/galeri-detail/page/${convertToSlug(item?.judul)}`}
                                        onClick={() => {
                                          localStorage.setItem(
                                            'beritaID',
                                            item?.id,
                                          )
                                          dispatch(
                                            setStateHalaman({
                                              page: item?.judul,
                                              id: item?.id,
                                            }),
                                          )
                                        }}
                                        key={idx}
                                        className="col-span-3 h-full phones:col-span-12"
                                      >
                                        <div className="flex h-full flex-col gap-16 rounded-2xl border bg-white px-16 pb-32 pt-16 shadow hover:cursor-pointer">
                                          <img
                                            src={
                                              item?.gambar ?? '/img/tutwuri.png'
                                            }
                                            alt={item?.judul}
                                            loading="lazy"
                                            className="h-[40rem] w-full rounded-2xl object-cover phones:h-[20rem]"
                                          />
                                          <div className="flex flex-col items-center justify-center gap-8">
                                            <p className="text-[2.4rem] font-bold">
                                              {item?.judul}
                                            </p>
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
                                      setShowIndex(galeri?.length - 4)
                                    }
                                  }}
                                >
                                  <img
                                    src="/icon/IconLeft.svg"
                                    alt="Icon Left"
                                  />
                                </button>
                                <button
                                  type="button"
                                  className="opacity-55 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
                                  onClick={() => {
                                    if (showIndex < galeri?.length - 4) {
                                      setShowIndex(showIndex + 1)
                                    } else {
                                      setShowIndex(0)
                                    }
                                  }}
                                >
                                  <img
                                    src="/icon/IconRight.svg"
                                    alt="Icon Right"
                                  />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <NoData />
                          )}
                        </div>
                        <div className="hidden phones:block">
                          {galeri?.length > 0 ? (
                            <div className="flex items-center gap-32">
                              {/* Mapping Data */}
                              <div className="flex h-full w-full items-center gap-32 overflow-x-auto">
                                {galeri?.map((item, idx) => (
                                  <Link
                                    to={`/galeri-detail/page/${convertToSlug(item?.judul)}`}
                                    onClick={() => {
                                      localStorage.setItem('beritaID', item?.id)
                                      dispatch(
                                        setStateHalaman({
                                          page: item?.judul,
                                          id: item?.id,
                                        }),
                                      )
                                    }}
                                    key={idx}
                                    className="h-full w-4/5 flex-shrink-0 flex-grow"
                                  >
                                    <div className="flex h-full flex-col gap-16 rounded-2xl border bg-white p-32 shadow hover:cursor-pointer">
                                      <img
                                        src={item?.gambar ?? '/img/tutwuri.png'}
                                        alt={item?.judul}
                                        loading="lazy"
                                        className="h-[40rem] w-full rounded-2xl phones:h-[30rem]"
                                      />
                                      <div className="flex flex-col items-center justify-center gap-8">
                                        <p className="text-[3rem] font-bold">
                                          {item?.judul}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <NoData />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
