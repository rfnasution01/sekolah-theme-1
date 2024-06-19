import { BerandaType } from '@/libs/types/beranda-type'
import { Link } from 'react-router-dom'
import { convertSlugToText, convertToSlug } from '@/libs/helpers/format-text'
import { bgPrimary700 } from '@/libs/helpers/format-color'
import { ArrowRight, Trophy } from 'lucide-react'
import { Card8 } from './card-8'
import { SingleSkeleton } from '../skeleton'

export function Card7({
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
  return (
    <>
      <div className="block phones:hidden">
        <div className="flex gap-32 phones:flex-col phones:items-start">
          {loadingBeranda ? (
            <SingleSkeleton height="h-[50vh]" width="w-[40%]" />
          ) : (
            <div className="flex w-2/5 flex-col gap-32">
              <div className="flex">
                <p
                  className={`${bgPrimary700(color)} flex items-center gap-12 rounded-lg px-24 py-12 text-[3.2rem]`}
                >
                  <span>
                    <Trophy size={20} />
                  </span>
                  {data?.kategori}
                </p>
              </div>
              <p
                className="text-[2rem] tracking-1.25"
                style={{ lineHeight: '130%' }}
              >
                {data?.keterangan}
              </p>
              <Link
                to={`/${convertToSlug(kelompok)}`}
                className="flex items-center gap-12 text-[2rem] font-bold"
              >
                {convertSlugToText(data?.kelompok)} Lainnya
                <span className="transition-transform duration-300 ease-in-out hover:translate-x-24">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          )}
          {loadingBeranda ? (
            <SingleSkeleton height="h-[50vh]" width="w-[20%]" />
          ) : (
            <div className="w-3/5">
              {data?.berita?.length > 0 && (
                <div className="grid grid-cols-3">
                  {data?.berita?.map((_item, idx) => (
                    <div className="col-span-1 h-full" key={idx}>
                      <Card8
                        kelompok={kelompok}
                        data={data}
                        color={color}
                        index={0 + idx}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="hidden phones:block">
        <div className="flex gap-32 phones:flex-col phones:items-start">
          {loadingBeranda ? (
            <SingleSkeleton height="h-[50vh]" width="w-[40%]" />
          ) : (
            <div className="flex w-full flex-col gap-32">
              <div className="flex">
                <p
                  className={`${bgPrimary700(color)} flex items-center gap-12 rounded-lg px-24 py-12 text-[3.2rem]`}
                >
                  <span>
                    <Trophy size={20} />
                  </span>
                  {data?.kategori}
                </p>
              </div>
              <p
                className="text-[2rem] tracking-1.25"
                style={{ lineHeight: '130%' }}
              >
                {data?.keterangan}
              </p>
              <Link
                to={`/${convertToSlug(kelompok)}`}
                className="flex items-center gap-12 text-[2rem] font-bold"
              >
                {convertSlugToText(data?.kelompok)} Lainnya
                <span className="transition-transform duration-300 ease-in-out hover:translate-x-24">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          )}
          {loadingBeranda ? (
            <SingleSkeleton height="h-[50vh]" width="w-[20%]" />
          ) : (
            <div className="flex h-full w-full items-center gap-32 overflow-x-auto">
              {data?.berita?.length > 0 && (
                <div className="w-4/5 flex-shrink-0">
                  {data?.berita?.map((_item, idx) => (
                    <div className="col-span-1 h-full" key={idx}>
                      <Card8
                        kelompok={kelompok}
                        data={data}
                        color={color}
                        index={0 + idx}
                        isShow
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
