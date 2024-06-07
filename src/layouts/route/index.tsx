import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { NoData } from '@/components/NoData'
import { List } from '@/features/list'
import { usePathname } from '@/libs/hooks/usePathname'
import { ListType } from '@/libs/types/list-type'
import { Meta } from '@/store/api'
import { useGetListQuery } from '@/store/slices/listAPI'
import { useEffect, useState } from 'react'

export default function RouteLayout() {
  const { firstPathname } = usePathname()

  // --- List ---
  const [list, setList] = useState<ListType[]>()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [search, setSearch] = useState<string>('')
  const [meta, setMeta] = useState<Meta>()
  const {
    data: listData,
    isLoading: listIsLoading,
    isFetching: listIsFethcing,
  } = useGetListQuery({
    page_number: pageNumber,
    page_size: pageSize,
    search: search,
    jenis: firstPathname,
  })

  const loadingList = listIsLoading || listIsFethcing

  useEffect(() => {
    if (listData) {
      setList(listData?.data)
      setMeta(listData?.meta)
    }
  }, [listData])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb />
      {loadingList ? (
        <Loading />
      ) : list?.length > 0 ? (
        <List
          data={list}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          setSearch={setSearch}
          loading={loadingList}
          pageNumber={pageNumber}
          lastPage={meta?.last_page}
        />
      ) : (
        <NoData />
      )}
    </div>
  )
}
