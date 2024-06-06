import Loading from '@/components/Loading'
import { Card3 } from '@/components/card/card-3'
import { RelatedType } from '@/libs/types/beranda-type'
import { useGetBeritaDetailRelatedQuery } from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'

export function BeritaRelated({ id }: { id: string }) {
  // --- Berita Detail Page ---
  const [beritaDetailRelated, setBeritaDetailRelated] =
    useState<RelatedType[]>()
  const {
    data: beritaDetailData,
    isLoading: beritaDetailIsLoading,
    isFetching: beritaDetailIsFetching,
  } = useGetBeritaDetailRelatedQuery({
    id: id,
  })

  const loadingBeritaDetail = beritaDetailIsLoading || beritaDetailIsFetching

  useEffect(() => {
    if (beritaDetailData?.related) {
      setBeritaDetailRelated(beritaDetailData?.related)
    }
  }, [beritaDetailData?.related, id])

  return (
    <div className="flex w-3/5 flex-col gap-12 phones:w-full">
      <div className="border-danger-700 flex border-b-4 pb-8">
        <p className="border-danger-700 border-l-4 px-12 py-8 font-nunito text-[3rem] uppercase">
          berita lainnya
        </p>
      </div>

      {loadingBeritaDetail ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          {beritaDetailRelated?.map((item, idx) => (
            <div key={idx}>
              <Card3
                judul={item?.judul}
                hits={item?.hits}
                tanggal={item?.tanggal}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
