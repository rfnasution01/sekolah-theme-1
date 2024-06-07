import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { BeritaDetail, BeritaList } from '@/features/berita'
import { BeritaDetailType, BeritaType } from '@/libs/types/beranda-type'
import { Meta } from '@/store/api'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import {
  useGetBeritaDetailQuery,
  useGetBeritaQuery,
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

  // --- berita Page ---
  const [berita, setBerita] = useState<BeritaType[]>()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [search, setSearch] = useState<string>('')
  const [meta, setMeta] = useState<Meta>()
  const {
    data: beritaData,
    isLoading: beritaIsLoading,
    isFetching: beritaIsFethcing,
  } = useGetBeritaQuery({
    page_number: pageNumber,
    page_size: pageSize,
    search: search,
  })

  const loadingBerita = beritaIsLoading || beritaIsFethcing

  useEffect(() => {
    if (beritaData) {
      setBerita(beritaData?.data)
      setMeta(beritaData?.meta)
    }
  }, [beritaData])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb page={page} />
      {loadingBeritaDetail ? (
        <Loading />
      ) : page === '' ? (
        <BeritaList
          data={berita}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          setSearch={setSearch}
          loading={loadingBerita}
          pageNumber={pageNumber}
          lastPage={meta?.last_page}
        />
      ) : (
        <BeritaDetail data={beritaDetail} id={id} />
      )}
    </div>
  )
}
