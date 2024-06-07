import Loading from '@/components/Loading'
import { Card3 } from '@/components/card/card-3'
import { RelatedType } from '@/libs/types/beranda-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { useGetAgendaRelatedQuery } from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function AgendaRelated({ id }: { id: string }) {
  // --- Berita Detail Page ---
  const [agendaDetailRelated, setAgendaDetailRelated] =
    useState<RelatedType[]>()
  const {
    data: agendaDetailData,
    isLoading: agendaDetailIsLoading,
    isFetching: agendaDetailIsFetching,
  } = useGetAgendaRelatedQuery({
    id: id,
  })

  const loadingagendaDetail = agendaDetailIsLoading || agendaDetailIsFetching

  useEffect(() => {
    if (agendaDetailData?.related) {
      setAgendaDetailRelated(agendaDetailData?.related)
    }
  }, [agendaDetailData?.related, id])

  const dispatch = useDispatch()

  return (
    <div className="flex w-3/5 flex-col gap-12 phones:w-full">
      <div className="flex border-b-4 border-danger-700 pb-8">
        <p className="border-l-4 border-danger-700 px-12 py-8 font-nunito text-[3rem] uppercase">
          berita lainnya
        </p>
      </div>

      {loadingagendaDetail ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          {agendaDetailRelated?.map((item, idx) => (
            <Link
              to={`/agenda?page=${item?.seo}`}
              onClick={() => {
                dispatch(setStateHalaman({ id: item?.id, page: item?.seo }))
              }}
              key={idx}
            >
              <Card3
                judul={item?.judul}
                hits={item?.hits}
                tanggal={item?.tanggal}
                gambar={item?.photo}
                kelompok={item?.kelompok}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
