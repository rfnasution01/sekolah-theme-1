import { NoData } from '@/components/NoData'
import { SingleSkeleton } from '@/components/skeleton'
import { LayananType } from '@/libs/types/layanan-type'
import { Link } from 'react-router-dom'

export function HomeLayanan({
  layanan,
  loadingLayanan,
}: {
  layanan: LayananType[]
  loadingLayanan: boolean
}) {
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
        <div className="scrollbar flex w-full gap-48 overflow-x-auto phones:gap-32">
          {layanan?.map((item, idx) => (
            <Link
              to={item?.url}
              target="_blank"
              className="flex h-[40vh] w-1/5  flex-shrink-0 flex-col items-center justify-center gap-16 rounded-2xl border bg-background p-32 text-center shadow hover:shadow-xl phones:w-3/5"
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
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  )
}
