import { BerandaType } from '@/libs/types/beranda-type'
import { Link, useNavigate } from 'react-router-dom'
import { convertToSlug } from '@/libs/helpers/format-text'
import { useEffect, useState } from 'react'
import {
  bgPrimary400,
  bgPrimary700,
  bgWhite,
  textPrimary700,
} from '@/libs/helpers/format-color'
import { useDispatch } from 'react-redux'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { Card6 } from './card-6'

export function Card5({
  data,
  kelompok,
  color,
}: {
  data: BerandaType
  angka: number
  kelompok: string
  color: string
  loadingBeranda: boolean
}) {
  const [showIndex, setShowIndex] = useState<number>(0)

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

  const handleBeritaClick = (id) => {
    localStorage.setItem('beritaID', id)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-32">
      {/* --- Main Berita --- */}
      <div className="flex items-center gap-32 phones:flex-col phones:items-start phones:gap-24">
        {/* --- Left --- */}
        <div className="w-1/2 phones:w-full">
          <div className="flex flex-col overflow-hidden">
            <div
              className="relative col-span-6 block transition-transform duration-300 ease-in-out hover:scale-105"
              style={{ borderRadius: '3rem' }}
            >
              <img
                src={data?.berita?.[0]?.photo?.gambar}
                alt={data?.berita?.[0]?.photo?.keterangan}
                className="h-[50vh] w-full bg-opacity-10 object-cover filter phones:h-[30vh]"
                loading="lazy"
                style={{
                  borderRadius: '3rem',
                }}
              />
              <div className="absolute top-0 flex h-full w-[100%]">
                <Link
                  to={`/${convertToSlug(kelompok)}/page/${data?.berita?.[0]?.seo}`}
                  onClick={() => {
                    handleBeritaClick(data?.berita?.[0]?.id)
                    dispatch(
                      setStateHalaman({
                        id: data?.berita?.[0]?.id,
                        page: data?.berita?.[0]?.seo,
                      }),
                    )
                  }}
                  style={{ borderRadius: '3rem' }}
                  className={`relative flex h-full w-full flex-col ${bgPrimary700(color)} bg-opacity-20`}
                >
                  <div className="flex flex-shrink flex-col gap-16 p-32">
                    <div className="flex">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          localStorage.setItem(
                            'beritaID',
                            data?.berita?.[0]?.seo_kategori,
                          )
                          dispatch(
                            setStateHalaman({
                              page: data?.berita?.[0]?.kategori,
                              id: data?.berita?.[0]?.seo_kategori,
                            }),
                          )
                          navigate(
                            `/${kelompok}/${data?.berita?.[0]?.seo_kategori}`,
                          )
                        }}
                        className={`flex items-center gap-8 rounded-full bg-white px-24 py-8 ${textPrimary700(color)}`}
                      >
                        <p
                          className={`h-[1.6rem] w-[1.6rem] rounded-full ${bgPrimary400(color)}`}
                        ></p>
                        <p>{data?.berita?.[0]?.kategori}</p>
                      </button>
                    </div>
                    <p
                      className="line-clamp-3 rounded-lg text-[4rem] font-bold tracking-0.25 text-white phones:hidden"
                      style={{ lineHeight: '150%' }}
                    >
                      {data?.berita?.[0]?.judul}
                    </p>
                    <p className="text-[2.4rem] tracking-1.25 text-white phones:hidden">
                      {dayjs(data?.berita?.[0]?.tanggal)
                        .locale('id')
                        .format('DD MMMM YYYY')}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <Link
              to={`/${convertToSlug(kelompok)}/page/${data?.berita?.[0]?.seo}`}
              onClick={() => {
                handleBeritaClick(data?.berita?.[0]?.id)
                dispatch(
                  setStateHalaman({
                    id: data?.berita?.[0]?.id,
                    page: data?.berita?.[0]?.seo,
                  }),
                )
              }}
              className="hidden phones:block"
              style={{
                borderBottomLeftRadius: '3rem',
                borderBottomRightRadius: '3rem',
              }}
            >
              <div
                style={{
                  borderBottomLeftRadius: '3rem',
                  borderBottomRightRadius: '3rem',
                }}
                className={`flex flex-col gap-32 border bg-white p-32 ${textPrimary700(color)}`}
              >
                <p className="text-[2.4rem] tracking-1.25">
                  {dayjs(data?.berita?.[0]?.tanggal)
                    .locale('id')
                    .format('DD MMMM YYYY')}
                </p>
                <p
                  className="line-clamp-3 rounded-lg text-[4rem] font-bold tracking-0.25"
                  style={{ lineHeight: '150%' }}
                >
                  {data?.berita?.[0]?.judul}
                </p>
              </div>
            </Link>
          </div>
        </div>
        {/* --- Right --- */}
        <div className="flex h-[50vh] w-1/2 items-center gap-32 phones:h-auto phones:w-full phones:flex-col phones:items-start">
          {data?.berita?.length > 1 && (
            <Card6
              kelompok={kelompok}
              data={data}
              color={color}
              width="w-1/2"
              index={1}
            />
          )}
          {data?.berita?.length > 2 && (
            <Card6
              kelompok={kelompok}
              data={data}
              color={color}
              width="w-1/2"
              index={2}
            />
          )}
        </div>
      </div>
      {/* --- Berita Lainnya --- */}
      {data?.berita?.length > 3 && (
        <>
          <div className="block phones:hidden">
            <div className="grid grid-cols-6 gap-32">
              {data?.berita?.slice(3, 8)?.map((_item, idx) => (
                <div className="col-span-1 h-full phones:col-span-3" key={idx}>
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
          </div>
          <div className="hidden phones:block">
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
          </div>
        </>
      )}
    </div>
  )
}
