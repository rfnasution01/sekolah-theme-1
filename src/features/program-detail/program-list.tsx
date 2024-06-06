import { ProgramDetailType } from '@/libs/types/beranda-type'
import './program-detail.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'

export function ProgramList({ data }: { data: ProgramDetailType[] }) {
  const dispatch = useDispatch()

  return (
    <div className="px-[30rem] phones:p-32">
      <div
        className={
          'flex flex-col gap-32 border bg-background p-64 shadow-lg phones:p-32'
        }
      >
        <p className="font-roboto text-[5rem]">Program</p>
        <div className="grid grid-cols-4 gap-32">
          {data?.map((item, idx) => (
            <div
              className="col-span-1 phones:col-span-2"
              key={idx}
              onClick={() => {
                dispatch(setStateHalaman({ id: item?.id, page: item?.seo }))
              }}
            >
              <Link
                to={`/program-details?page=${item?.seo}`}
                className="flex flex-col gap-24 rounded-2xl bg-white px-24 pb-32 pt-24 shadow hover:cursor-pointer hover:shadow-lg"
              >
                <div className="h-[25vh] w-full">
                  <img
                    src={item?.photo}
                    alt={item?.judul}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <p className="font-roboto text-[2.4rem] phones:text-[2.8rem]">
                    {item?.judul ?? '-'}
                  </p>
                  <p className="line-clamp-3">{item?.isi_singkat ?? '-'}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
