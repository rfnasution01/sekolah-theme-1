import './detail.css'
import 'dayjs/locale/id'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import { IconLabel } from '@/components/IconLabel'
import { CalendarDays, Eye, User } from 'lucide-react'
import dayjs from 'dayjs'
import { Slider3 } from '@/components/slider/slider-3'
import Loading from '@/components/Loading'
import { Breadcrumb } from '@/components/Breadcrumb'
import { DetailType } from '@/libs/types/detail-type'
import { usePathname } from '@/libs/hooks/usePathname'
import { useGetDetailQuery } from '@/store/slices/detailAPI'
import { DetailRelated, DetailShare, DetailTag } from '@/features/detail'

export default function Detail() {
  const { firstPathname } = usePathname()
  const stateId = useSelector(getHalamanSlice)?.id
  const statePage = useSelector(getHalamanSlice)?.page

  useEffect(() => {
    if (stateId) {
      setId(stateId)
    }
  }, [stateId])

  useEffect(() => {
    if (statePage) {
      setPage(statePage)
    }
  }, [statePage])

  const searchParams = new URLSearchParams(location.search)
  const pageParams = searchParams.get('page')

  const idParams = localStorage.getItem('beritaID')

  const [id, setId] = useState<string>(idParams ?? stateId ?? '')
  const [page, setPage] = useState<string>(pageParams ?? statePage ?? '')

  // --- Berita Detail Page ---
  const [detail, setDetail] = useState<DetailType>()
  const {
    data: detailData,
    isLoading: detailIsLoading,
    isFetching: detailIsFetching,
  } = useGetDetailQuery({
    id: id,
    jenis: firstPathname,
  })

  const loadingDetail = detailIsLoading || detailIsFetching

  useEffect(() => {
    if (detailData?.data) {
      setDetail(detailData?.data)
    }
  }, [detailData?.data, id])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb page={page} />

      {loadingDetail ? (
        <Loading />
      ) : (
        <div className="px-[30rem] phones:p-32">
          <div
            className={
              'flex flex-col gap-32 border bg-background p-64 shadow-lg phones:p-32'
            }
          >
            <div className="flex flex-col gap-16">
              <p className="font-roboto text-[5rem]">{detail?.judul}</p>
              <div className="flex flex-wrap items-center gap-24">
                <IconLabel
                  icon={<CalendarDays size={16} />}
                  label={dayjs(detail?.tanggal)
                    .locale('id')
                    .format('DD MMMM YYYY HH:mm')}
                />
                <IconLabel icon={<User size={16} />} label={detail?.penulis} />
                <IconLabel
                  icon={<Eye size={16} />}
                  label={`${detail?.hits} Views`}
                />
              </div>
            </div>
            <div className="h-[50vh] w-full">
              <Slider3
                listImage={detail?.photo}
                height="h-[50vh]"
                kategori={detail?.kategori}
                seo_kategori={detail?.seo_kategori}
                kelompok={firstPathname}
              />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: detail?.isi }}
              className="article-content"
            />
            <DetailTag data={detail} />
            <DetailShare />
            <DetailRelated id={id} />
          </div>
        </div>
      )}
    </div>
  )
}
