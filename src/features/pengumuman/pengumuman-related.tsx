import Loading from '@/components/Loading'
import { Card3 } from '@/components/card/card-3'
import { RelatedType } from '@/libs/types/beranda-type'
import { setStateHalaman } from '@/store/reducer/stateIdHalaman'
import { useGetPengumumanRelatedQuery } from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function PengumumanRelated({ id }: { id: string }) {
  // --- Berita Detail Page ---
  const [beritaDetailRelated, setBeritaDetailRelated] =
    useState<RelatedType[]>()
  const {
    data: beritaDetailData,
    isLoading: beritaDetailIsLoading,
    isFetching: beritaDetailIsFetching,
  } = useGetPengumumanRelatedQuery({
    id: id,
  })

  const loadingBeritaDetail = beritaDetailIsLoading || beritaDetailIsFetching

  useEffect(() => {
    if (beritaDetailData?.related) {
      setBeritaDetailRelated(beritaDetailData?.related)
    }
  }, [beritaDetailData?.related, id])

  const dispatch = useDispatch()

  return (
    <div className="flex w-3/5 flex-col gap-12 phones:w-full">
      <div className="flex border-b-4 border-danger-700 pb-8">
        <p className="border-l-4 border-danger-700 px-12 py-8 font-nunito text-[3rem] uppercase">
          berita lainnya
        </p>
      </div>

      {loadingBeritaDetail ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          {beritaDetailRelated?.map((item, idx) => (
            <Link
              to={`/pengumuman?page=${item?.seo}`}
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
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}