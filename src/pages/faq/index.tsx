import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { FaqDetail, FaqTab } from '@/features/faq'
import { usePathname } from '@/libs/hooks/usePathname'
import { FaqDetailType, FaqType } from '@/libs/types/faq-type'
import {
  useGetFaqByKategoriQuery,
  useGetFaqKategoriQuery,
} from '@/store/slices/faqAPI'
import { useEffect, useState } from 'react'

export default function Faq() {
  // --- Faq Kategori ---
  const [faqKategori, setFaqKategori] = useState<FaqType[]>()

  const {
    data: faqKategoriData,
    isLoading: faqKategoriLoaading,
    isFetching: faqKategoriFetching,
  } = useGetFaqKategoriQuery()

  const loadingFaqKategori = faqKategoriLoaading || faqKategoriFetching

  useEffect(() => {
    if (faqKategoriData?.data) {
      setFaqKategori(faqKategoriData?.data)
    }
  }, [faqKategoriData?.data])

  const [tab, setTab] = useState<string>('f28c86ca-a96b-46e9-a355-4b94f7ef0baa')

  // --- Faq Page ---
  const [faqDetail, setFaqDetail] = useState<FaqDetailType[]>()

  const {
    data: faqDetailData,
    isLoading: faqDetailLoading,
    isFetching: faqDetailFetching,
  } = useGetFaqByKategoriQuery(
    {
      id: tab,
    },
    { skip: tab === null },
  )

  const loadingFaqDetail = faqDetailFetching || faqDetailLoading

  useEffect(() => {
    if (faqDetailData?.data) {
      setFaqDetail(faqDetailData?.data)
    }
  }, [faqDetailData?.data, tab])

  const { firstPathname } = usePathname()

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb />
      <div className="h-[75vh] w-full px-[30rem] phones:p-32">
        <div className="flex h-full border bg-background shadow-lg phones:flex-col">
          {loadingFaqKategori ? (
            <Loading />
          ) : (
            <FaqTab
              menu={faqKategori}
              firstPathname={firstPathname}
              setTab={setTab}
              tab={tab}
            />
          )}
          <div className="scrollbar h-full w-4/5 flex-1 overflow-y-auto phones:w-full">
            {loadingFaqDetail ? <Loading /> : <FaqDetail data={faqDetail} />}
          </div>
        </div>
      </div>
    </div>
  )
}
