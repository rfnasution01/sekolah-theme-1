import { SingleSkeleton } from '@/components/skeleton'
import { IdentitasType } from '@/libs/types/beranda-type'
import { Link } from 'react-router-dom'

export function LogoNavigasi({
  identitas,
  loading,
}: {
  identitas: IdentitasType
  loading: boolean
}) {
  return (
    <Link to="/" className="flex items-center gap-12">
      <img
        src={identitas?.logo ?? '/img/logo.png'}
        alt="logo"
        className="h-[5rem] w-[5rem]"
        loading="lazy"
      />
      {loading ? (
        <SingleSkeleton />
      ) : (
        <p className="font-sf-pro uppercase">
          {identitas?.nama_website ?? '-'}
        </p>
      )}
    </Link>
  )
}
