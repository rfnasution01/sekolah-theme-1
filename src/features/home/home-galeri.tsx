import { CardNextPrev } from '@/components/card/CardNextPrev'
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
    <div className="scrollbar flex w-full flex-col gap-32 overflow-x-auto px-64 phones:px-32">
      <div className="flex w-full items-center">
        <hr className="flex-1 border border-primary-100" />
        <p className="rounded-2xl border border-primary-100 p-24 text-center font-roboto text-[5rem]">
          Galeri
        </p>
        <hr className="flex-1 border border-primary-100" />
      </div>
      <div className="block phones:hidden">
        <CardNextPrev
          setShowIndex={setShowIndex}
          showIndex={showIndex}
          is4PerPage
          length={galeri?.length}
        >
          {loadingGaleri ? (
            <SingleSkeleton height="h-[50vh]" width="w-[20%]" />
          ) : (
            <div className="grid w-full grid-cols-12 gap-32">
              {galeri?.slice(showIndex, showIndex + 4)?.map((item, idx) => (
                <Link
                  to={`/galeri-detail/page/${convertToSlug(item?.judul)}`}
                  onClick={() => {
                    dispatch(
                      setStateHalaman({
                        page: convertToSlug(item?.judul),
                        id: item?.id,
                      }),
                    )
                    localStorage.setItem('beritaID', item?.id)
                  }}
                  className="relative col-span-3 block transform-gpu duration-300 hover:-translate-y-16 hover:cursor-pointer phones:col-span-12 phones:w-9/12"
                  key={idx}
                >
                  <img
                    src={item?.gambar}
                    alt="Galeri"
                    className="h-[50vh] w-full rounded-3xl bg-opacity-10 object-cover filter"
                  />
                  <div className="absolute top-0 flex h-full w-[100%] items-end">
                    <div
                      className="flex w-full flex-col gap-24 bg-black bg-opacity-45 p-24 text-white"
                      style={{
                        borderBottomLeftRadius: '1.25rem',
                        borderBottomRightRadius: '1.25rem',
                      }}
                    >
                      <p className="text-[2.4rem] font-bold tracking-1.25">
                        {`${item?.judul}`}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardNextPrev>
      </div>
      <div className="hidden phones:block">
        <CardNextPrev
          setShowIndex={setShowIndex}
          showIndex={showIndex}
          length={galeri?.length}
        >
          {loadingGaleri ? (
            <SingleSkeleton height="h-[50vh]" width="w-[20%]" />
          ) : (
            <div className="flex gap-32 overflow-x-auto phones:w-full">
              {galeri?.slice(showIndex, showIndex + 1)?.map((item, idx) => (
                <Link
                  to={`/galeri-detail/page/${item?.url}`}
                  onClick={() => {
                    dispatch(
                      setStateHalaman({
                        page: convertToSlug(item?.judul),
                        id: item?.id,
                      }),
                    )
                    localStorage.setItem('beritaID', item?.id)
                  }}
                  className="relative transform-gpu duration-300 hover:-translate-y-16 hover:cursor-pointer phones:w-full"
                  key={idx}
                >
                  <img
                    src={item?.gambar}
                    alt="Galeri"
                    className="h-[50vh] w-full rounded-3xl bg-opacity-10 object-cover filter"
                  />
                  <div className="absolute top-0 flex h-full w-[100%] items-end">
                    <div
                      className="flex w-full flex-col gap-24 bg-black bg-opacity-45 p-24 text-white"
                      style={{
                        borderBottomLeftRadius: '1.25rem',
                        borderBottomRightRadius: '1.25rem',
                      }}
                    >
                      <p className="text-[2.4rem] font-bold tracking-1.25">
                        {`${item?.judul}`}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardNextPrev>
      </div>
    </div>
  )
}
