import { useEffect, useState } from 'react'
import { SearchHeader } from './search'
import { BeritaTerbaruType, MenuType } from '@/libs/types/beranda-type'
import { useGetMenuTopQuery } from '@/store/slices/berandaAPI'
import { SingleSkeleton } from '@/components/skeleton'
import { NavigasiHeader } from './mapping-navigasi'
import { BeritaTerbaru } from './berita-terbaru'

export function RootHeader() {
  // --- Menu Top ---
  const [menuTop, setMenuTop] = useState<MenuType[]>([])
  const [beritaTerbaru, setBeritaTerbaru] = useState<BeritaTerbaruType[]>([])
  const {
    data: menuTopData,
    isLoading: isLoadingMenuTop,
    isFetching: isFetchingMenuTop,
  } = useGetMenuTopQuery()

  const loading = isLoadingMenuTop || isFetchingMenuTop

  useEffect(() => {
    if (menuTopData) {
      setMenuTop(menuTopData?.data)
      setBeritaTerbaru(menuTopData?.berita_terbaru)
    }
  }, [menuTopData])

  return (
    <div className="flex items-center gap-32">
      {loading ? (
        <SingleSkeleton height="h-[3rem]" />
      ) : (
        <div className="flex w-full items-center gap-32">
          <div className="flex w-3/5 items-center gap-32">
            <BeritaTerbaru runningText={beritaTerbaru} />
          </div>
          <div className="flex w-2/5 items-center gap-32">
            <div className="flex-1">
              <NavigasiHeader menu={menuTop} />
            </div>
            <div>
              <SearchHeader />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
