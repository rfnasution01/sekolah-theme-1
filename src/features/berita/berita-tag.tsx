import { BeritaDetailType } from '@/libs/types/beranda-type'

export function BeritaTag({ data }: { data: BeritaDetailType }) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex">
        <div className="border-danger-700 border-b-4 pb-8">
          <p className="border-danger-700 border-l-4 px-12 py-8 font-nunito text-[3rem] uppercase">
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