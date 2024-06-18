import { IdentitasType } from '@/libs/types/beranda-type'
import { FooterAlamat } from './footer-alamat'
import { FooterCopyright } from './footer-copyright'
import { FooterKontak } from './footer-kontak'
import { FooterPopuler } from './footer-populer'

export function RootFooter({ identitas }: { identitas: IdentitasType }) {
  return (
    <div className="flex flex-col text-primary-100">
      {/* --- Info --- */}
      <div className="flex w-full gap-32 bg-primary-footer px-64 py-32 text-primary-100 phones:flex-col phones:items-start phones:gap-64 phones:px-32">
        {/* --- Alamat --- */}
        <FooterAlamat identitas={identitas} />

        {/* --- Populer --- */}
        <FooterPopuler />
        {/* --- Kontak Kami --- */}
        <FooterKontak />
      </div>
      {/* --- Copyright --- */}
      <FooterCopyright identitas={identitas} />
    </div>
  )
}
