import { LogoNavigasi } from './logo'
import { MappingNavigasi } from './mapping-navigasi'

export function RootNavigasi() {
  return (
    <div className="flex items-center justify-between gap-32 bg-primary-700 pl-64 text-primary-100">
      <LogoNavigasi />
      <MappingNavigasi />
    </div>
  )
}
