import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { HalamanDetail } from '@/features/halaman'
import { HalamanDetailType } from '@/libs/types/beranda-type'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import { useGetHalamanDetailQuery } from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function HalamanPage() {
  const stateId = useSelector(getHalamanSlice)?.id

  useEffect(() => {
    if (stateId) {
      setId(stateId)
    }
  }, [stateId])

  const idParams = localStorage.getItem('beritaID')

  const [id, setId] = useState<string>(idParams ?? stateId ?? '')

  // --- Halaman Page ---
  const [halamanDetail, setHalamanDetail] = useState<HalamanDetailType>()
  const {
    data: halamanDetailData,
    isLoading,
    isFetching,
  } = useGetHalamanDetailQuery({
    id: id,
  })

  const loadingHalamanDetail = isLoading || isFetching

  useEffect(() => {
    if (halamanDetailData?.data) {
      setHalamanDetail(halamanDetailData?.data)
    }
  }, [halamanDetailData?.data, id])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb />
      {loadingHalamanDetail ? (
        <Loading />
      ) : (
        <HalamanDetail data={halamanDetail} />
      )}
    </div>
  )
}
