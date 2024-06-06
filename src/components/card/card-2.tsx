import { BerandaType } from '@/libs/types/beranda-type'
import clsx from 'clsx'
import { NoData } from '../NoData'

export function Card2({ data }: { data: BerandaType }) {
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
      <div className="grid grid-cols-5 gap-12">
        {data?.berita?.length > 0 ? (
          data?.berita?.map((item, idx) => (
            <div className="col-span-1 phones:col-span-5" key={idx}>
              <div className="flex flex-col gap-12 border bg-white px-12 pb-24 pt-12 shadow hover:cursor-pointer hover:shadow-lg">
                <img
                  src={item?.photo?.gambar}
                  alt={item?.photo?.keterangan}
                  className="h-[20vh] w-full"
                  loading="lazy"
                />
                <div className="flex flex-col gap-4">
                  <p className="text-center">{item?.judul}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-5">
            <NoData />
          </div>
        )}
      </div>
    </div>
  )
}
