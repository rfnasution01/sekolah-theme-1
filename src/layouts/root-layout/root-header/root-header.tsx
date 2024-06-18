import { Dispatch, SetStateAction } from 'react'
import { SearchHeader } from './search'
import { BeritaTerbaruType, MenuType } from '@/libs/types/beranda-type'
import { NavigasiHeader } from './mapping-navigasi'
import { BeritaTerbaru } from './berita-terbaru'
import { LayoutDashboard, Search, X } from 'lucide-react'
import { bgPrimary100 } from '@/libs/helpers/format-color'

export function RootHeader({
  setIsShow,
  isShow,
  beritaTerbaru,
  menuTop,
  color,
}: {
  setIsShow: Dispatch<SetStateAction<boolean>>
  isShow: boolean
  beritaTerbaru: BeritaTerbaruType[]
  menuTop: MenuType[]
  color: string
}) {
  return (
    <div className="flex w-full items-center gap-32 phones:flex-col phones:items-start">
      <div className="flex w-full items-center gap-32">
        <div className="flex w-3/5 items-center gap-32 phones:flex-1">
          <BeritaTerbaru runningText={beritaTerbaru} color={color} />
        </div>
        <div className="flex w-2/5 items-center gap-32 phones:hidden">
          <div className="flex-1">
            <NavigasiHeader menu={menuTop} color={color} />
          </div>
          <div>
            <SearchHeader color={color} />
          </div>
        </div>
      </div>
      <div className="hidden w-full phones:block">
        <div className="flex items-center gap-32">
          <span
            onClick={() => {
              setIsShow(!isShow)
            }}
          >
            {!isShow ? <LayoutDashboard size={20} /> : <X size={20} />}
          </span>
          <div className="flex-1 ">
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
          </div>
        </div>
      </div>
    </div>
  )
}
