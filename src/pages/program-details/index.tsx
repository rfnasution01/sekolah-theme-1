import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { ProgramDetail } from '@/features/program-detail'
import { ProgramDetailType } from '@/libs/types/beranda-type'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import { useGetProgramDetailQuery } from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function ProgramDetailsPage() {
  const stateId = useSelector(getHalamanSlice)?.id

  useEffect(() => {
    if (stateId) {
      setId(stateId)
    }
  }, [stateId])

  const idParams = localStorage.getItem('beritaID')

  const [id, setId] = useState<string>(idParams ?? stateId ?? '')

  // --- Program Detail Page ---
  const [programDetail, setProgramDetail] = useState<ProgramDetailType>()
  const {
    data: programDetailData,
    isLoading: programDetailIsLoading,
    isFetching: programDetailIsFetching,
  } = useGetProgramDetailQuery({
    id: id,
  })

  const loadingProgramDetail = programDetailIsLoading || programDetailIsFetching

  useEffect(() => {
    if (programDetailData?.data) {
      setProgramDetail(programDetailData?.data)
    }
  }, [programDetailData?.data, id])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb />
      {loadingProgramDetail ? (
        <Loading />
      ) : (
        <ProgramDetail data={programDetail} />
      )}
    </div>
  )
}
