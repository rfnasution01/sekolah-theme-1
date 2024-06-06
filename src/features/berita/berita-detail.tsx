import { BeritaDetailType } from '@/libs/types/beranda-type'
import './berita-detail.css'
import clsx from 'clsx'
import { CalendarDays, Eye, User } from 'lucide-react'
import { IconLabel } from '@/components/IconLabel'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { Slider3 } from '@/components/slider/slider-3'
import { BeritaTag } from './berita-tag'
import { BeritaShare } from './berita-share'
import { BeritaRelated } from './berita-related'

export function BeritaDetail({
  data,
  isDetail,
  id,
}: {
  data: BeritaDetailType
  id: string
  isDetail?: boolean
}) {
  return (
    <div className={clsx('', { 'px-[30rem] phones:p-32': !isDetail })}>
      <div
        className={
          'flex flex-col gap-32 border bg-background p-64 shadow-lg phones:p-32'
        }
      >
        <div className="flex flex-col gap-16">
          <p className="font-roboto text-[5rem]">{data?.judul}</p>
          <div className="flex flex-wrap items-center gap-24">
            <IconLabel
              icon={<CalendarDays size={16} />}
              label={dayjs(data?.tanggal)
                .locale('id')
                .format('DD MMMM YYYY HH:mm')}
            />
            <IconLabel icon={<User size={16} />} label={data?.penulis} />
            <IconLabel icon={<Eye size={16} />} label={`${data?.hits} Views`} />
          </div>
        </div>
        <div className="h-[50vh] w-full">
          <Slider3
            listImage={data?.photo}
            height="h-[50vh]"
            kategori={data?.kategori}
            seo_kategori={data?.seo_kategori}
          />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: data?.isi }}
          className="article-content"
        />
        <BeritaTag data={data} />
        <BeritaShare />
        <BeritaRelated id={id} />
      </div>
    </div>
  )
}
