import { HalamanDetailType } from '@/libs/types/beranda-type'
import './halaman-detail.css'

export function HalamanDetail({ data }: { data: HalamanDetailType }) {
  return (
    <div className="px-[30rem] phones:p-32">
      <div className="flex flex-col gap-32 border bg-white p-64 shadow-lg phones:p-32">
        <p className="font-roboto text-[5rem]">{data?.judul}</p>
        <div className="h-[50vh] w-full">
          <img
            src={data?.url_gambar}
            alt={data?.judul}
            className="h-full w-full"
            loading="lazy"
          />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: data?.isi }}
          className="article-content"
        />
      </div>
    </div>
  )
}
