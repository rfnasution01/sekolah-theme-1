import { NoData } from '@/components/NoData'
import { SingleSkeleton } from '@/components/skeleton'
import { convertToSlug } from '@/libs/helpers/format-text'
import { GaleriType } from '@/libs/types/galeri-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { useGetGaleriQuery } from '@/store/slices/galeriAPI'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function HomeGaleri() {
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

  return (
    <>
      {galeri?.length > 0 && (
        <div className="flex w-full flex-col gap-32 px-64 phones:px-32">
          {/* --- Title --- */}
          <div className="flex w-full items-center">
            <hr className="flex-1 border border-primary-100" />
            <p className="rounded-2xl border border-primary-100 p-24 text-center font-roboto text-[5rem]">
              Galeri
            </p>
            <hr className="flex-1 border border-primary-100" />
          </div>
          {loadingGaleri ? (
            <SingleSkeleton height="h-[40vh] w-[20%]" />
          ) : (
            <div className="block phones:hidden">
              {galeri?.length > 0 ? (
                <div className="flex items-center gap-32">
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
                    <img src="/icon/IconLeft.svg" alt="Icon Left" />
                  </button>
                  {/* Mapping Data */}
                  <div className="grid flex-1 grid-cols-12 gap-32">
                    {galeri
                      ?.slice(showIndex, showIndex + 4)
                      ?.map((item, idx) => (
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
                          className="col-span-3 h-full phones:col-span-12"
                        >
                          <div className="flex h-full flex-col gap-16 rounded-2xl border bg-white px-16 pb-32 pt-16 shadow hover:cursor-pointer">
                            <img
                              src={item?.gambar ?? '/img/tutwuri.png'}
                              alt={item?.judul}
                              loading="lazy"
                              className="h-[40rem] w-full rounded-2xl phones:h-[20rem]"
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
                    <img src="/icon/IconRight.svg" alt="Icon Right" />
                  </button>
                </div>
              ) : (
                <NoData />
              )}
            </div>
          )}
          {loadingGaleri ? (
            <SingleSkeleton height="h-[40vh] w-[20%]" />
          ) : (
            <div className="hidden phones:block">
              {galeri?.length > 0 ? (
                <div className="flex items-center gap-32">
                  <button
                    type="button"
                    className="opacity-55 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
                    onClick={() => {
                      if (showIndex > 0) {
                        setShowIndex(showIndex - 1)
                      } else {
                        setShowIndex(galeri?.length - 1)
                      }
                    }}
                  >
                    <img src="/icon/IconLeft.svg" alt="Icon Left" />
                  </button>
                  {/* Mapping Data */}
                  <div className="grid flex-1 grid-cols-12 gap-32">
                    {galeri
                      ?.slice(showIndex, showIndex + 1)
                      ?.map((item, idx) => (
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
                          className="col-span-4 h-full phones:col-span-12"
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
                  <button
                    type="button"
                    className="opacity-55 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
                    onClick={() => {
                      if (showIndex < galeri?.length - 1) {
                        setShowIndex(showIndex + 1)
                      } else {
                        setShowIndex(0)
                      }
                    }}
                  >
                    <img src="/icon/IconRight.svg" alt="Icon Right" />
                  </button>
                </div>
              ) : (
                <NoData />
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}
