import { MenuType } from '@/libs/types/beranda-type'
import { LogoNavigasi } from './logo'
import { MappingNavigasi } from './mapping-navigasi'

export function RootNavigasi({
  loading,
  menuUtama,
}: {
  loading: boolean
  menuUtama: MenuType[]
}) {
  return (
    <div className="flex items-center justify-between gap-32 bg-primary-700 pl-64 text-primary-100">
      <LogoNavigasi />
      <MappingNavigasi loading={loading} menuUtama={menuUtama} />
    </div>
  )
}
