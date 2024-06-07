import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { ProgramDetail, ProgramList } from '@/features/program-detail'
import { ProgramDetailType } from '@/libs/types/beranda-type'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import {
  useGetProgramDetailQuery,
  useGetProgramQuery,
} from '@/store/slices/berandaAPI'
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

  // --- Program Page ---
  const [program, setProgram] = useState<ProgramDetailType[]>()
  const {
    data: programData,
    isLoading: programIsLoading,
    isFetching: programIsFethcing,
  } = useGetProgramQuery()

  const loadingProgram = programIsLoading || programIsFethcing

  useEffect(() => {
    if (programData?.data) {
      setProgram(programData?.data)
    }
  }, [programData?.data])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb />
      {loadingProgramDetail || loadingProgram ? (
        <Loading />
      ) : page === '' ? (
        <ProgramList data={program} />
      ) : (
        <ProgramDetail data={programDetail} />
      )}
    </div>
  )
}
