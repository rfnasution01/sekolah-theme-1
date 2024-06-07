import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import {
  PengumumanDetail,
  PengumumanKategori,
  PengumumanList,
} from '@/features/pengumuman'
import {
  BeritaDetailType,
  KategoriType,
  PengumumanType,
} from '@/libs/types/beranda-type'
import { Meta } from '@/store/api'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import { getKategoriSlice } from '@/store/reducer/stateIdKategori'
import {
  useGetPengumumanDetailQuery,
  useGetPengumumanKategoriQuery,
  useGetPengumumanQuery,
} from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function PengumumanPage() {
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

  // --- Pengumuman Detail Page ---
  const [pengumumanDetail, setPengumumanDetail] = useState<BeritaDetailType>()
  const {
    data: pengumumanDetailData,
    isLoading: pengumumanDetailIsLoading,
    isFetching: pengumumanDetailIsFetching,
  } = useGetPengumumanDetailQuery({
    id: id,
  })

  const loadingPengumumanDetail =
    pengumumanDetailIsLoading || pengumumanDetailIsFetching

  useEffect(() => {
    if (pengumumanDetailData?.data) {
      setPengumumanDetail(pengumumanDetailData?.data)
    }
  }, [pengumumanDetailData?.data, id])

  // --- Pengumuman Page ---
  const [pengumuman, setPengumuman] = useState<PengumumanType[]>()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [search, setSearch] = useState<string>('')
  const [meta, setMeta] = useState<Meta>()
  const {
    data: pengumumanData,
    isLoading: pengumumanIsLoading,
    isFetching: pengumumanIsFethcing,
  } = useGetPengumumanQuery({
    page_number: pageNumber,
    page_size: pageSize,
    search: search,
  })

  const loadingPengumuman = pengumumanIsLoading || pengumumanIsFethcing

  useEffect(() => {
    if (pengumumanData) {
      setPengumuman(pengumumanData?.data)
      setMeta(pengumumanData?.meta)
    }
  }, [pengumumanData])

  // --- PengumumanKategori Page ---
  const [pengumumanKategori, setPengumumanKategori] = useState<KategoriType[]>()
  const [pageNumberKategori, setPageNumberKategori] = useState<number>(1)
  const [pageSizeKategori, setPageSizeKategori] = useState<number>(12)
  const [searchKategori, setSearchKategori] = useState<string>('')
  const [metaKategori, setMetaKategori] = useState<Meta>()
  const {
    data: pengumumanKategoriData,
    isLoading: pengumumanKategoriIsLoading,
    isFetching: pengumumanKategoriIsFethcing,
  } = useGetPengumumanKategoriQuery(
    {
      page_number: pageNumberKategori,
      page_size: pageSizeKategori,
      search: searchKategori,
      seo_kategori: kategori,
    },
    { skip: !kategori },
  )

  const loadingPengumumanKategori =
    pengumumanKategoriIsLoading || pengumumanKategoriIsFethcing

  useEffect(() => {
    if (pengumumanKategoriData) {
      setPengumumanKategori(pengumumanKategoriData?.data)
      setMetaKategori(pengumumanKategoriData?.meta)
    }
  }, [pengumumanKategoriData])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb page={page} />
      {loadingPengumumanDetail ? (
        <Loading />
      ) : page === '' ? (
        <PengumumanList
          data={pengumuman}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          setSearch={setSearch}
          loading={loadingPengumuman}
          pageNumber={pageNumber}
          lastPage={meta?.last_page}
        />
      ) : kategori !== '' ? (
        <PengumumanKategori
          data={pengumumanKategori}
          setPageNumber={setPageNumberKategori}
          setPageSize={setPageSizeKategori}
          setSearch={setSearchKategori}
          loading={loadingPengumumanKategori}
          pageNumber={pageNumberKategori}
          lastPage={metaKategori?.last_page}
          id={kategori}
        />
      ) : (
        <PengumumanDetail data={pengumumanDetail} id={id} />
      )}
    </div>
  )
}
