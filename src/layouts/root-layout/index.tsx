import { useEffect, useState } from 'react'
import { RootHeader } from './root-header'
import { RootNavigasi } from './root-navigasi'
import { MobileNavigasi } from './mobile-navigasi'
import { BeritaTerbaruType, MenuType } from '@/libs/types/beranda-type'
import {
  useGetMenuTopQuery,
  useGetMenuUtamaQuery,
} from '@/store/slices/berandaAPI'
import { RootFooter } from './footer'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  const [isShow, setIsShow] = useState<boolean>(false)

  // --- Menu Top ---
  const [menuTop, setMenuTop] = useState<MenuType[]>([])
  const [beritaTerbaru, setBeritaTerbaru] = useState<BeritaTerbaruType[]>([])
  const {
    data: menuTopData,
    isLoading: isLoadingMenuTop,
    isFetching: isFetchingMenuTop,
  } = useGetMenuTopQuery()

  const loadingMenuTop = isLoadingMenuTop || isFetchingMenuTop

  useEffect(() => {
    if (menuTopData) {
      setMenuTop(menuTopData?.data)
      setBeritaTerbaru(menuTopData?.berita_terbaru)
    }
  }, [menuTopData])

  // --- Menu Utama ---
  const [menuUtama, setMenuUtama] = useState<MenuType[]>([])
  const {
    data: menuUtamaData,
    isLoading: isLoadingMenuUtama,
    isFetching: isFetchingMenuUtama,
  } = useGetMenuUtamaQuery()

  const loadingMenuUtama = isLoadingMenuUtama || isFetchingMenuUtama

  useEffect(() => {
    if (menuUtamaData?.data) {
      setMenuUtama(menuUtamaData?.data)
    }
  }, [menuUtamaData?.data])

  const sortedDataTop = [...menuTop].sort((a, b) => {
    return parseInt(a.urutan) - parseInt(b.urutan)
  })

  const sortedDataUtama = [...menuUtama].sort((a, b) => {
    return parseInt(a.urutan) - parseInt(b.urutan)
  })

  return (
    <div className="flex h-screen flex-col bg-white text-[2rem] phones:text-[2.4rem]">
      <div className="bg-primary-500 p-24 text-primary-100">
        <RootHeader
          setIsShow={setIsShow}
          isShow={isShow}
          beritaTerbaru={beritaTerbaru}
          menuTop={sortedDataTop}
          loading={loadingMenuTop}
        />
      </div>
      <div className="phones:hidden">
        <RootNavigasi menuUtama={sortedDataUtama} loading={loadingMenuUtama} />
      </div>
      {isShow ? (
        <div className="flex-1">
          <MobileNavigasi
            menuTop={sortedDataTop}
            menuUtama={sortedDataUtama}
            loadingTop={loadingMenuTop}
            loadingUtama={loadingMenuUtama}
            setIsShow={setIsShow}
          />
        </div>
      ) : (
        <div className="scrollbar h-full overflow-y-auto">
          <Outlet />
          <RootFooter />
        </div>
      )}
    </div>
  )
}
