import './halaman-detail.css'
import clsx from 'clsx'
import { TestimoniType } from '@/libs/types/testimoni-type'

export function TestimonialDetails({
  data,
  isDetail,
}: {
  data: TestimoniType
  isDetail?: boolean
}) {
  return (
    <div className={clsx('', { 'px-[30rem] phones:p-32': !isDetail })}>
      <div
        className={
          'flex flex-col gap-32 border bg-background p-64 shadow-lg phones:border-transparent phones:bg-white phones:p-0 phones:shadow-none'
        }
      >
        {data?.photo && (
          <div className="h-[50vh] w-full">
            <img
              src={data?.photo}
              alt={data?.nama}
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        )}
        <p className="font-roboto text-[5rem]">{data?.nama}</p>

        <div
          dangerouslySetInnerHTML={{ __html: data?.isi }}
          className="article-content"
        />
      </div>
    </div>
  )
}
