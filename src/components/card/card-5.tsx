import { BerandaType } from '@/libs/types/beranda-type'
import { Link } from 'react-router-dom'
import { convertToSlug } from '@/libs/helpers/format-text'
import { useEffect, useState } from 'react'
import { bgWhite } from '@/libs/helpers/format-color'
import 'dayjs/locale/id'
import { Card6 } from './card-6'
import { SingleSkeleton } from '../skeleton'
import { Card8 } from './card-8'
import { useInView } from 'react-intersection-observer'

export function Card5({
  data,
  kelompok,
  color,
  loadingBeranda,
}: {
  data: BerandaType
  angka: number
  kelompok: string
  color: string
  loadingBeranda: boolean
}) {
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (showIndex === data?.berita?.length - 1) {
        setShowIndex(0)
      } else {
        setShowIndex(showIndex + 1)
      }
    }, 3000) // Mengganti gambar setiap 3 detik

    return () => clearInterval(interval)
  }, [showIndex, data?.berita?.length])

  return (
    <div className="flex flex-col gap-32">
      {/* --- Main Berita --- */}
      <div className="flex items-center gap-32 phones:flex-col phones:items-start phones:gap-24">
        {/* --- Left --- */}
        {loadingBeranda ? (
          <SingleSkeleton height="h-[50vh]" width="w-[50%]" />
        ) : (
          <div className="w-1/2 phones:w-full" ref={ref}>
            {isLoaded ? (
              <Card8 kelompok={kelompok} color={color} data={data} index={0} />
            ) : (
              <SingleSkeleton height="h-[50vh]" />
            )}
          </div>
        )}
        {/* --- Right --- */}
        <div
          ref={ref}
          className="flex h-[50vh] w-1/2 items-center gap-32 phones:h-auto phones:w-full phones:flex-col phones:items-start"
        >
          {isLoaded ? (
            <>
              {loadingBeranda ? (
                <SingleSkeleton height="h-[50vh]" />
              ) : (
                data?.berita?.length > 1 && (
                  <Card6
                    kelompok={kelompok}
                    data={data}
                    color={color}
                    width="w-1/2"
                    index={1}
                  />
                )
              )}
              {loadingBeranda ? (
                <SingleSkeleton height="h-[50vh]" />
              ) : (
                data?.berita?.length > 2 && (
                  <Card6
                    kelompok={kelompok}
                    data={data}
                    color={color}
                    width="w-1/2"
                    index={2}
                  />
                )
              )}
            </>
          ) : (
            <>
              <SingleSkeleton
                height="h-[50vh]"
                width="w-1/2"
                classname="phones:hidden"
              />
              <SingleSkeleton height="h-[50vh]" width="w-1/2 phones:w-full" />
            </>
          )}
        </div>
      </div>
      {/* --- Berita Lainnya --- */}
      {loadingBeranda ? (
        <SingleSkeleton height="h-[40vh]" width="w-[20%]" />
      ) : (
        data?.berita?.length > 3 && (
          <>
            <div ref={ref} className="block phones:hidden">
              {isLoaded ? (
                <div className="grid grid-cols-6 gap-32">
                  {data?.berita?.slice(3, 8)?.map((_item, idx) => (
                    <div
                      className="col-span-1 h-full phones:col-span-3"
                      key={idx}
                    >
                      <Card6
                        kelompok={kelompok}
                        data={data}
                        color={color}
                        width="w-full"
                        index={3 + idx}
                        isSmall
                      />
                    </div>
                  ))}
                  <Link
                    to={`/${convertToSlug(kelompok)}`}
                    className={`col-span-1 flex h-full items-center justify-center border bg-white p-32 text-[4rem] ${bgWhite(color)}`}
                    style={{ borderRadius: '3rem', lineHeight: '150%' }}
                  >
                    Lihat Berita Lainnya
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-32">
                  <SingleSkeleton height="h-[40vh]" width="w-1/6" />
                  <SingleSkeleton height="h-[40vh]" width="w-1/6" />
                  <SingleSkeleton height="h-[40vh]" width="w-1/6" />
                  <SingleSkeleton height="h-[40vh]" width="w-1/6" />
                  <SingleSkeleton height="h-[40vh]" width="w-1/6" />
                  <SingleSkeleton height="h-[40vh]" width="w-1/6" />
                </div>
              )}
            </div>
            <div ref={ref} className="hidden phones:block">
              {isLoaded ? (
                <div className="flex h-full w-full items-center gap-32 overflow-x-auto">
                  {data?.berita?.slice(3, 8)?.map((_item, idx) => (
                    <div className="w-3/5 flex-shrink-0 flex-grow" key={idx}>
                      <Card6
                        kelompok={kelompok}
                        data={data}
                        color={color}
                        width="w-full"
                        index={3 + idx}
                        isSmall
                        isShow
                      />
                    </div>
                  ))}
                  <Link
                    to={`/${convertToSlug(kelompok)}`}
                    className={`flex h-full w-3/5 flex-shrink-0 flex-grow items-center justify-center bg-white p-32 text-[4rem] ${bgWhite(color)}`}
                    style={{ borderRadius: '3rem' }}
                  >
                    Lihat Berita Lainnya
                  </Link>
                </div>
              ) : (
                <>
                  <SingleSkeleton height="h-[40vh]" />
                </>
              )}
            </div>
          </>
        )
      )}
    </div>
  )
}
