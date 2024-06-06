import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { ProgramDetail, ProgramList } from '@/features/program-detail'
import { ProgramDetailType } from '@/libs/types/beranda-type'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import { useGetProgramDetailQuery } from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function ProgramDetailsPage() {
  const stateId = useSelector(getHalamanSlice)?.id
  const statePage = useSelector(getHalamanSlice)?.page

  useEffect(() => {
    if (stateId) {
      setId(stateId)
    }
  }, [stateId])

  useEffect(() => {
    if (statePage) {
      setPage(statePage)
    }
  }, [statePage])

  const searchParams = new URLSearchParams(location.search)
  const pageParams = searchParams.get('page')

  const idParams = localStorage.getItem('beritaID')

  const [id, setId] = useState<string>(idParams ?? stateId ?? '')
  const [page, setPage] = useState<string>(pageParams ?? statePage ?? '')

  // --- Halaman Page ---
  const [programDetail, setProgramDetail] = useState<ProgramDetailType>()
  const {
    data: programDetailData,
    isLoading,
    isFetching,
  } = useGetProgramDetailQuery({
    id: id,
  })

  const loadingProgramDetail = isLoading || isFetching

  useEffect(() => {
    if (programDetailData?.data) {
      setProgramDetail(programDetailData?.data)
    }
  }, [programDetailData?.data, id])

  return (
    <div className="my-32 flex flex-col gap-32">
      <p className="text-[5rem]">{page}</p>
      <Breadcrumb page={page} />
      {loadingProgramDetail ? (
        <Loading />
      ) : page === '' ? (
        <ProgramList />
      ) : (
        <ProgramDetail data={programDetail} />
      )}
    </div>
  )
}
