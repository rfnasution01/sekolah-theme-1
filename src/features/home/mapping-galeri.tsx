import { NoData } from '@/components/NoData'
import { convertToSlug } from '@/libs/helpers/format-text'
import { GaleriType } from '@/libs/types/galeri-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function MappingGaleri({ data }: { data: GaleriType[] }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-12 gap-32">
      {data?.length > 0 ? (
        data?.map((item, idx) => (
          <div
            className="col-span-3 duration-300 hover:-translate-y-24 hover:cursor-pointer hover:shadow-lg phones:col-span-12"
            key={idx}
            onClick={() => {
              dispatch(setStateHalaman({ page: item?.judul, id: item?.id }))
              localStorage.setItem('beritaID', item?.id)
              navigate(`/galeri-detail/page/${convertToSlug(item?.judul)}`)
            }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-16 rounded-2xl border px-8 pb-32 pt-8 text-center shadow">
              <div className="w-full flex-1">
                <img
                  src={item?.gambar}
                  alt={item?.judul}
                  className="h-[38vh] rounded-2xl object-cover"
                  loading="lazy"
                />
              </div>
              <p className="line-clamp-2 text-[2.4rem]">{item?.judul}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-12">
          <NoData />
        </div>
      )}
    </div>
  )
}
