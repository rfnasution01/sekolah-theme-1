import { IdentitasType } from '@/libs/types/beranda-type'
import { FooterAlamat } from './footer-alamat'
import { FooterCopyright } from './footer-copyright'
import { FooterKontak } from './footer-kontak'
import { FooterPopuler } from './footer-populer'

export function RootFooter({
  identitas,
  loading,
}: {
  identitas: IdentitasType
  loading: boolean
}) {
  return (
    <div className="flex flex-col text-primary-100">
      {/* --- Info --- */}
      <div className="bg-primary-footer flex w-full gap-32 px-64 py-32 text-primary-100 phones:flex-col phones:items-start phones:gap-64 phones:px-32">
        {/* --- Alamat --- */}
        <FooterAlamat identitas={identitas} loading={loading} />
        {/* --- Populer --- */}
        <FooterPopuler />
        {/* --- Kontak Kami --- */}
        <FooterKontak />
      </div>
      {/* --- Copyright --- */}
      <FooterCopyright identitas={identitas} loading={loading} />
    </div>
  )
}
