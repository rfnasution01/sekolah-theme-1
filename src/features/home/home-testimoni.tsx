import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { NoData } from '@/components/NoData'
import { TestimoniType } from '@/libs/types/testimoni-type'
import './detail.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { bgPrimary700 } from '@/libs/helpers/format-color'
import Card from './home-testimoni-card'

export function HomeTestimoni({
  testimoni,
  color,
}: {
  testimoni: TestimoniType[]
  color: string
}) {
  const [showIndex, setShowIndex] = useState<number>(0)

  return (
    <div className="flex w-full flex-col gap-32 px-64 phones:px-32">
      {/* --- Title --- */}
      <div className="flex w-full items-center">
        <hr className="flex-1 border border-primary-100" />
        <p className="rounded-2xl border border-primary-100 p-24 text-center font-roboto text-[5rem]">
          Apa kata mereka?
        </p>
        <hr className="flex-1 border border-primary-100" />
      </div>
      <div className="block phones:hidden">
        {testimoni?.length > 0 ? (
          <div className="flex items-center gap-32">
            <button
              type="button"
              className="opacity-55 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
              onClick={() => {
                if (showIndex > 0) {
                  setShowIndex(showIndex - 1)
                } else {
                  setShowIndex(testimoni?.length - 3)
                }
              }}
            >
              <img src="/icon/IconLeft.svg" alt="Icon Left" />
            </button>
            {/* Mapping Data */}
            <div className="grid flex-1 grid-cols-12 gap-32">
              {testimoni?.slice(showIndex, showIndex + 3)?.map((item, idx) => (
                <div key={idx} className="col-span-4 h-full phones:col-span-12">
                  <div className="flex h-full flex-col gap-16 rounded-2xl border bg-white p-32 shadow hover:cursor-pointer">
                    <img
                      src={item?.photo ?? '/img/tutwuri.png'}
                      alt={item?.nama}
                      loading="lazy"
                      className="h-[40rem] w-full rounded-2xl"
                    />
                    <div className="flex flex-col items-center justify-center gap-8">
                      <p className="text-[3rem] font-bold">{item?.nama}</p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item?.keterangan_singkat,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="opacity-55 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
              onClick={() => {
                if (showIndex < testimoni?.length - 3) {
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
      <div className="hidden phones:block">
        {testimoni?.length > 0 ? (
          <div className="flex items-center gap-32">
            {/* Mapping Data */}
            <div className="flex h-full w-full items-center overflow-x-auto">
              {testimoni?.map((item, idx) => (
                <div key={idx} className="w-11/12 flex-shrink-0 flex-grow">
                  <Card props={item} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <NoData />
        )}
      </div>
      <div className="flex items-center justify-center">
        <Link
          to={'/testimonial'}
          className={`${bgPrimary700(color)} rounded-lg px-24 py-12 `}
        >
          Lihat Semua
        </Link>
      </div>
    </div>
  )
}
