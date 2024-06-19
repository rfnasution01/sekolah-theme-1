import { Dispatch, SetStateAction, useState } from 'react'
import { SearchHeader } from './search'
import { BeritaTerbaruType, MenuType } from '@/libs/types/beranda-type'
import { NavigasiHeader } from './mapping-navigasi'
import { BeritaTerbaru } from './berita-terbaru'
import { LayoutDashboard, Search, X } from 'lucide-react'
import { bgPrimary100 } from '@/libs/helpers/format-color'
import { LayananType } from '@/libs/types/layanan-type'
import { Link } from 'react-router-dom'
import Tooltips from '@/components/Tooltip'

export function RootHeader({
  setIsShow,
  isShow,
  beritaTerbaru,
  menuTop,
  color,
  layanan,
}: {
  setIsShow: Dispatch<SetStateAction<boolean>>
  isShow: boolean
  beritaTerbaru: BeritaTerbaruType[]
  menuTop: MenuType[]
  color: string
  layanan: LayananType[]
}) {
  const [isSearch, setIsSearch] = useState<boolean>(false)

  return (
    <div className="flex w-full items-center gap-32 phones:flex-col phones:items-start">
      <div className="flex w-full items-center gap-32 phones:hidden">
        <Tooltips
          color={color}
          triggerComponent={
            <div className={`flex items-center gap-4 uppercase`}>
              <LayoutDashboard size={16} />
            </div>
          }
          tooltipContent={
            <div
              className="flex flex-col gap-y-16 border-l p-12"
              style={{
                borderImage:
                  'linear-gradient(180deg, #FFFFFF 0%, #0D1A4B 100%)',
                borderImageSlice: 1,
              }}
            >
              <div className="mx-16 flex flex-col items-start gap-y-16 text-[2rem]">
                {layanan?.map((list, no) => (
                  <Link to={list?.url} target="_blank" key={no}>
                    <div className={`text-nowrap hover:cursor-pointer`}>
                      {list?.nama_layanan}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          }
          position="bottom"
        />
        <div className="flex w-3/5 items-center gap-32">
          <BeritaTerbaru runningText={beritaTerbaru} color={color} />
        </div>
        <div className="flex w-2/5 items-center gap-32">
          <div className="flex-1">
            <NavigasiHeader menu={menuTop} color={color} />
          </div>
          <div>
            <SearchHeader color={color} />
          </div>
        </div>
      </div>
      <div className="hidden w-full phones:block">
        <div className="flex flex-col gap-24">
          <div className="flex items-center justify-between gap-32">
            <span
              className="flex items-center gap-12"
              onClick={() => {
                setIsShow(!isShow)
              }}
            >
              {!isShow ? <LayoutDashboard size={20} /> : <X size={20} />}
              Menu
            </span>
            <div
              onClick={() => {
                setIsSearch(!isSearch)
              }}
            >
              <Search size={16} />
            </div>
          </div>
          {isSearch && (
            <div className="relative text-black">
              <span className="hidden phones:block">
                <Search
                  className="absolute left-8 top-1/2 -translate-y-1/2 transform phones:left-16"
                  size={14}
                />
              </span>
              <input
                type="text"
                className={`w-full rounded-lg border border-gray-300 ${bgPrimary100(color)} p-8 px-48 text-[2rem] focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 phones:w-full phones:px-48`}
                placeholder="Tulis & Tekan Enter"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
