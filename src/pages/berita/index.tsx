import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { BeritaDetail, BeritaKategori, BeritaList } from '@/features/berita'
import {
  BeritaDetailType,
  BeritaType,
  KategoriType,
} from '@/libs/types/beranda-type'
import { Meta } from '@/store/api'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import { getKategoriSlice } from '@/store/reducer/stateIdKategori'
import {
  useGetBeritaDetailQuery,
  useGetBeritaKategoriQuery,
  useGetBeritaQuery,
} from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function BeritaPage() {
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

  // --- berita Page ---
  const [beritaKategori, setBeritaKategori] = useState<KategoriType[]>()
  const [pageNumberKategori, setPageNumberKategori] = useState<number>(1)
  const [pageSizeKategori, setPageSizeKategori] = useState<number>(12)
  const [searchKategori, setSearchKategori] = useState<string>('')
  const [metaKategori, setMetaKategori] = useState<Meta>()
  const {
    data: beritaKategoriData,
    isLoading: beritaKategoriIsLoading,
    isFetching: beritaKategoriIsFethcing,
  } = useGetBeritaKategoriQuery(
    {
      page_number: pageNumberKategori,
      page_size: pageSizeKategori,
      search: searchKategori,
      seo_kategori: kategori,
    },
    { skip: !kategori },
  )

  const loadingBeritaKategori =
    beritaKategoriIsLoading || beritaKategoriIsFethcing

  useEffect(() => {
    if (beritaKategoriData) {
      setBeritaKategori(beritaKategoriData?.data)
      setMetaKategori(beritaKategoriData?.meta)
    }
  }, [beritaKategoriData])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <p>id: {id}</p>
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
      ) : kategori !== '' ? (
        <BeritaKategori
          data={beritaKategori}
          setPageNumber={setPageNumberKategori}
          setPageSize={setPageSizeKategori}
          setSearch={setSearchKategori}
          loading={loadingBeritaKategori}
          pageNumber={pageNumberKategori}
          lastPage={metaKategori?.last_page}
          id={kategori}
        />
      ) : (
        <BeritaDetail data={beritaDetail} id={id} />
      )}
    </div>
  )
}
