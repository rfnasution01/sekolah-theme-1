import { NoData } from '@/components/NoData'
import { SingleSkeleton } from '@/components/skeleton'
import { bgPrimary100 } from '@/libs/helpers/format-color'
import { LayananType } from '@/libs/types/layanan-type'
import { useGetLayananQuery } from '@/store/slices/layananAPI'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'

export function BerandaLayanan({ color }: { color: string }) {
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

  //   --- layanan ---
  const [layanan, setLayanan] = useState<LayananType[]>([])
  const {
    data: dataLayanan,
    isFetching: isFetchingLayanan,
    isLoading: isLoadingLayanan,
  } = useGetLayananQuery()

  const loadingLayanan = isFetchingLayanan || isLoadingLayanan

  useEffect(() => {
    if (dataLayanan?.data) {
      setLayanan(dataLayanan?.data)
    }
  }, [dataLayanan?.data])

  return (
    <div className="scrollbar flex w-full flex-col gap-32 overflow-x-auto px-64 phones:px-32">
      <div className="flex w-full items-center">
        <hr className="flex-1 border border-primary-100" />
        <p className="rounded-2xl border border-primary-100 p-24 text-center font-roboto text-[5rem]">
          Layanan
        </p>
        <hr className="flex-1 border border-primary-100" />
      </div>
      {loadingLayanan ? (
        <SingleSkeleton height="h-[40vh]" width="w-[20%]" />
      ) : layanan?.length > 0 ? (
        <div
          ref={ref}
          className="scrollbar flex w-full gap-48 overflow-x-auto phones:gap-32"
        >
          {isLoaded ? (
            layanan?.map((item, idx) => (
              <Link
                to={item?.url}
                target="_blank"
                className={`flex h-[40vh] w-1/6 flex-shrink-0 flex-col items-center justify-center gap-16 rounded-2xl border ${bgPrimary100(color)} p-32 text-center shadow hover:shadow-xl phones:w-3/5`}
                key={idx}
              >
                <div className="h-[16rem] w-[16rem] transition-transform hover:-translate-y-24 hover:cursor-pointer">
                  <img
                    src={item?.icon}
                    alt={item?.nama_layanan}
                    className="h-full w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="font-sf-pro text-[2.4rem] font-semibold">
                  {item?.nama_layanan}
                </p>
              </Link>
            ))
          ) : (
            <>
              <SingleSkeleton height="h-[40vh]" />
              <SingleSkeleton height="h-[40vh]" classname="phones:hidden" />
              <SingleSkeleton height="h-[40vh]" classname="phones:hidden" />
              <SingleSkeleton height="h-[40vh]" classname="phones:hidden" />
              <SingleSkeleton height="h-[40vh]" classname="phones:hidden" />
            </>
          )}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  )
}
