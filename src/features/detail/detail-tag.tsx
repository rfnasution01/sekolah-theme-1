import { DetailType } from '@/libs/types/detail-type'

export function DetailTag({ data }: { data: DetailType }) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex">
        <div className="border-b-4 border-danger-700 pb-8">
          <p className="border-l-4 border-danger-700 px-12 py-8 font-nunito text-[3rem] uppercase">
            Tag
          </p>
        </div>
      </div>
      <div className="flex flex-shrink items-center gap-24">
        {data?.tag?.map((item, idx) => (
          <div
            className="rounded-lg bg-primary-800 px-16 py-8 text-primary-100 hover:cursor-pointer hover:bg-primary-500"
            key={idx}
          >
            {item?.nama}
          </div>
        ))}
      </div>
    </div>
  )
}
