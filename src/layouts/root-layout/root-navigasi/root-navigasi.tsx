import { IdentitasType, MenuType } from '@/libs/types/beranda-type'
import { LogoNavigasi } from './logo'
import { MappingNavigasi } from './mapping-navigasi'

export function RootNavigasi({
  loading,
  menuUtama,
  loadingIdentitas,
  identitas,
}: {
  loading: boolean
  menuUtama: MenuType[]
  loadingIdentitas: boolean
  identitas: IdentitasType
}) {
  return (
    <div className="flex items-center justify-between gap-32 bg-primary-700 pl-64 text-primary-100">
      <LogoNavigasi loading={loadingIdentitas} identitas={identitas} />
      <MappingNavigasi loading={loading} menuUtama={menuUtama} />
    </div>
  )
}
