import { IdentitasType, MenuType } from '@/libs/types/beranda-type'
import { LogoNavigasi } from './logo'
import { MappingNavigasi } from './mapping-navigasi'
import { SingleSkeleton } from '@/components/skeleton'

export function RootNavigasi({
  menuUtama,
  identitas,
  color,
  loadingMenuUtama,
  loadingIdentitas,
}: {
  menuUtama: MenuType[]
  identitas: IdentitasType
  color: string
  loadingMenuUtama: boolean
  loadingIdentitas: boolean
}) {
  return (
    <div className={`flex flex-col`}>
      {loadingIdentitas ? (
        <SingleSkeleton height="h-[20vh]" />
      ) : (
        <LogoNavigasi identitas={identitas} />
      )}

      {loadingMenuUtama ? (
        <SingleSkeleton />
      ) : (
        <MappingNavigasi menuUtama={menuUtama} color={color} />
      )}
    </div>
  )
}
