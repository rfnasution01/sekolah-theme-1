import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { AgendaDetail, AgendaKategori, AgendaList } from '@/features/agenda'
import {
  BeritaDetailType,
  BeritaType,
  KategoriType,
} from '@/libs/types/beranda-type'
import { Meta } from '@/store/api'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import { getKategoriSlice } from '@/store/reducer/stateIdKategori'
import {
  useGetAgendaDetailQuery,
  useGetAgendaKategoriQuery,
  useGetAgendaQuery,
} from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function AgendaPage() {
  const stateId = useSelector(getHalamanSlice)?.id
  const statePage = useSelector(getHalamanSlice)?.page
  const stateKategori = useSelector(getKategoriSlice)?.id

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

  useEffect(() => {
    if (stateKategori) {
      setKategori(stateKategori)
    }
  }, [stateKategori])

  const searchParams = new URLSearchParams(location.search)
  const pageParams = searchParams.get('page')
  const kategoriParams = searchParams.get('kategori')

  const idParams = localStorage.getItem('beritaID')

  const [id, setId] = useState<string>(idParams ?? stateId ?? '')
  const [page, setPage] = useState<string>(pageParams ?? statePage ?? '')
  const [kategori, setKategori] = useState<string>(
    kategoriParams ?? stateKategori ?? '',
  )

  // --- Agenda Detail Page ---
  const [agendaDetail, setAgendaDetail] = useState<BeritaDetailType>()
  const {
    data: agendaDetailData,
    isLoading: agendaDetailIsLoading,
    isFetching: agendaDetailIsFetching,
  } = useGetAgendaDetailQuery({
    id: id,
  })

  const loadingAgendaDetail = agendaDetailIsLoading || agendaDetailIsFetching

  useEffect(() => {
    if (agendaDetailData?.data) {
      setAgendaDetail(agendaDetailData?.data)
    }
  }, [agendaDetailData?.data, id])

  // --- Agenda Page ---
  const [agenda, setAgenda] = useState<BeritaType[]>()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [search, setSearch] = useState<string>('')
  const [meta, setMeta] = useState<Meta>()
  const {
    data: agendaData,
    isLoading: agendaIsLoading,
    isFetching: agendaIsFethcing,
  } = useGetAgendaQuery({
    page_number: pageNumber,
    page_size: pageSize,
    search: search,
  })

  const loadingAgenda = agendaIsLoading || agendaIsFethcing

  useEffect(() => {
    if (agendaData) {
      setAgenda(agendaData?.data)
      setMeta(agendaData?.meta)
    }
  }, [agendaData])

  // --- Agenda Page ---
  const [agendaKategori, setAgendaKategori] = useState<KategoriType[]>()
  const [pageNumberKategori, setPageNumberKategori] = useState<number>(1)
  const [pageSizeKategori, setPageSizeKategori] = useState<number>(12)
  const [searchKategori, setSearchKategori] = useState<string>('')
  const [metaKategori, setMetaKategori] = useState<Meta>()
  const {
    data: agendaKategoriData,
    isLoading: agendaKategoriIsLoading,
    isFetching: agendaKategoriIsFethcing,
  } = useGetAgendaKategoriQuery(
    {
      page_number: pageNumberKategori,
      page_size: pageSizeKategori,
      search: searchKategori,
      seo_kategori: kategori,
    },
    { skip: !kategori },
  )

  const loadingAgendaKategori =
    agendaKategoriIsLoading || agendaKategoriIsFethcing

  useEffect(() => {
    if (agendaKategoriData) {
      setAgendaKategori(agendaKategoriData?.data)
      setMetaKategori(agendaKategoriData?.meta)
    }
  }, [agendaKategoriData])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb page={page} />
      {loadingAgendaDetail ? (
        <Loading />
      ) : page === '' ? (
        <AgendaList
          data={agenda}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          setSearch={setSearch}
          loading={loadingAgenda}
          pageNumber={pageNumber}
          lastPage={meta?.last_page}
        />
      ) : kategori !== '' ? (
        <AgendaKategori
          data={agendaKategori}
          setPageNumber={setPageNumberKategori}
          setPageSize={setPageSizeKategori}
          setSearch={setSearchKategori}
          loading={loadingAgendaKategori}
          pageNumber={pageNumberKategori}
          lastPage={metaKategori?.last_page}
          id={kategori}
        />
      ) : (
        <AgendaDetail data={agendaDetail} id={id} />
      )}
    </div>
  )
}
