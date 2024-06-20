import { BeritaPopuler } from '@/libs/types/beranda-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { useGetBeritaPopulerQuery } from '@/store/slices/berandaAPI'
import dayjs from 'dayjs'
import { CalendarDays } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function FooterPopuler() {
  // --- Populer ---
  const [populer, setPopuler] = useState<BeritaPopuler[]>([])
  const { data: dataPopuler } = useGetBeritaPopulerQuery({ jumlah: 2 })

  useEffect(() => {
    if (dataPopuler?.data) {
      setPopuler(dataPopuler?.data)
    }
  }, [dataPopuler?.data])

  const dispatch = useDispatch()

  return (
    <div className="flex w-1/3 flex-col gap-48 phones:w-full">
      <p className="font-bold">Populer</p>
      <div className="flex flex-col gap-32">
        {populer?.length > 0 &&
          populer?.map((item, idx) => (
            <Link
              to={`/berita/page/${item?.seo}`}
              onClick={() => {
                dispatch(setStateHalaman({ page: item?.judul, id: item?.id }))
                localStorage.setItem('beritaID', item?.id)
              }}
              className="flex transform-gpu items-start gap-24 border-b border-white pb-16 duration-300 hover:translate-x-24"
              key={idx}
            >
              <div className="w-2/5">
                <img
                  src={item?.gambar?.gambar}
                  alt={item?.gambar?.keterangan}
                  loading="lazy"
                  className="h-[10vh] w-full rounded-lg"
                />
              </div>
              <div className="flex w-3/5 flex-col gap-24">
                <p className="line-clamp-2 font-bold">{item?.judul}</p>
                <div className="flex items-center gap-8 text-[1.6rem]">
                  <span>
                    <CalendarDays size={14} />
                  </span>
                  <p>
                    {dayjs(item?.tanggal).locale('id').format('DD MMMM YYYY')}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
