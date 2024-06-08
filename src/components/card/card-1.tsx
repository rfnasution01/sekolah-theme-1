import { BerandaType } from '@/libs/types/beranda-type'
import { Link } from 'react-router-dom'
import { Slider2 } from '../slider/slider-2'
import clsx from 'clsx'
import { convertToSlug } from '@/libs/helpers/format-text'

export function Card1({
  data,
  angka,
  kelompok,
}: {
  data: BerandaType
  angka: number
  kelompok: string
}) {
  return (
    <div
      className={clsx('flex gap-32 phones:flex-col phones:items-start', {
        'flex-row': angka % 2 === 0,
        'flex-row-reverse': angka % 2 !== 0,
      })}
    >
      <div className="flex w-full flex-1 flex-col justify-between py-64">
        <div className="flex flex-col gap-16">
          <p className="font-roboto text-[5rem]">{data?.kategori}</p>
          <p>{data?.keterangan}</p>
        </div>
        <div>
          <Link
            to={`/${convertToSlug(data?.kelompok)}`}
            className="rounded-lg bg-primary-700 px-32 py-12 text-primary-100 hover:bg-primary-900"
          >
            Lihat {kelompok} Lainnya
          </Link>
        </div>
      </div>
      <div className="h-[40vh] w-full flex-1">
        {data?.berita?.length > 0 && (
          <Slider2
            listImage={data?.berita}
            height="h-[40vh]"
            kelompok={convertToSlug(kelompok)}
          />
        )}
      </div>
    </div>
  )
}
