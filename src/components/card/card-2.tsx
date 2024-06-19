import { BerandaType } from '@/libs/types/beranda-type'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { convertToSlug } from '@/libs/helpers/format-text'
import { useDispatch } from 'react-redux'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { bgPrimary700 } from '@/libs/helpers/format-color'
import { SingleSkeleton } from '../skeleton'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export function Card2({
  data,
  kelompok,
  color,
  loadingBeranda,
}: {
  data: BerandaType
  kelompok: string
  color: string
  loadingBeranda: boolean
}) {
  const dispatch = useDispatch()

  const handleBeritaClick = (id) => {
    localStorage.setItem('beritaID', id)
  }

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
    <div
      className={clsx(
        'flex flex-col gap-32 phones:flex-col phones:items-start',
        {},
      )}
    >
      <div className="flex flex-col items-center justify-center gap-12">
        <p className="font-roboto text-[5rem]">{data?.kategori}</p>
        <p className="text-center">{data?.keterangan}</p>
      </div>
      <div ref={ref} className="grid grid-cols-5 gap-12 phones:w-full">
        {isLoaded ? (
          data?.berita?.length > 0 &&
          data?.berita?.map((item, idx) => (
            <Link
              to={`/${convertToSlug(item?.kelompok)}/page/${item?.seo}`}
              className="col-span-1 phones:col-span-5"
              key={idx}
              onClick={() => {
                handleBeritaClick(item?.id)
                dispatch(
                  setStateHalaman({
                    page: item?.seo,
                    id: item?.id,
                  }),
                )
              }}
            >
              {loadingBeranda ? (
                <SingleSkeleton height="h-[40vh]" />
              ) : (
                <div className="flex flex-col gap-12 border bg-white px-12 pb-24 pt-12 shadow hover:cursor-pointer hover:shadow-lg">
                  <img
                    src={item?.photo?.gambar}
                    alt={item?.photo?.keterangan}
                    className="h-[35vh] w-full"
                    loading="lazy"
                  />
                  <div className="flex flex-col gap-4">
                    <p className="text-center">{item?.judul}</p>
                  </div>
                </div>
              )}
            </Link>
          ))
        ) : (
          <div className="col-span-5 flex items-center gap-32 phones:col-span-5 phones:w-full">
            <SingleSkeleton height="h-[30vh]" width="w-1/5 phones:w-full" />
            <SingleSkeleton
              height="h-[30vh]"
              width="w-1/5"
              classname="phones:hidden"
            />
            <SingleSkeleton
              height="h-[30vh]"
              width="w-1/5"
              classname="phones:hidden"
            />
            <SingleSkeleton
              height="h-[30vh]"
              width="w-1/5"
              classname="phones:hidden"
            />
            <SingleSkeleton
              height="h-[30vh]"
              width="w-1/5"
              classname="phones:hidden"
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        <Link
          to={`/${convertToSlug(data?.kelompok)}`}
          className={`rounded-lg px-32 py-12 ${bgPrimary700(color)}`}
        >
          Lihat {kelompok} Lainnya
        </Link>
      </div>
    </div>
  )
}
