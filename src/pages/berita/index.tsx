import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { BeritaDetail } from '@/features/berita'
import { ProgramList } from '@/features/program-detail'
import { BeritaDetailType, ProgramDetailType } from '@/libs/types/beranda-type'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import {
  useGetBeritaDetailQuery,
  useGetProgramQuery,
} from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function BeritaPage() {
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

  // --- Berita Detail Page ---
  const [beritaDetail, setBeritaDetail] = useState<BeritaDetailType>()
  const {
    data: beritaDetailData,
    isLoading: beritaDetailIsLoading,
    isFetching: beritaDetailIsFetching,
  } = useGetBeritaDetailQuery({
    id: id,
  })

  const loadingBeritaDetail = beritaDetailIsLoading || beritaDetailIsFetching

  useEffect(() => {
    if (beritaDetailData?.data) {
      setBeritaDetail(beritaDetailData?.data)
    }
  }, [beritaDetailData?.data, id])

  // --- Halaman Page ---
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
      <Breadcrumb page={page} />
      {loadingBeritaDetail || loadingProgram ? (
        <Loading />
      ) : page === '' ? (
        <ProgramList data={program} />
      ) : (
        <BeritaDetail data={beritaDetail} id={id} />
      )}
    </div>
  )
}
