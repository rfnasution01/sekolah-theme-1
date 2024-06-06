import { MultiSkeleton } from '@/components/skeleton'
import { IdentitasType } from '@/libs/types/beranda-type'
import { Link } from 'react-router-dom'

export function FooterAlamat({
  identitas,
  loading,
}: {
  identitas: IdentitasType
  loading: boolean
}) {
  return (
    <div className="flex w-1/3 flex-col gap-48 phones:w-full">
      <p className="font-bold">Alamat</p>
      <div className="flex flex-col gap-32">
        {loading ? (
          <MultiSkeleton />
        ) : (
          <div className="flex flex-col gap-8">
            <p className="font-bold">{identitas?.alamat ?? '-'}</p>
            <p>{identitas?.kota ?? '-'}</p>
          </div>
        )}
        {loading ? (
          <MultiSkeleton />
        ) : (
          <div className="flex flex-col gap-8">
            <p>
              <span className="underline">Phone</span>:{' '}
              {identitas?.telepon ?? '-'}
            </p>
            <p>
              <span className="underline">Fax</span>: -
            </p>
            <p>
              <span className="underline">Email</span>:{' '}
              {identitas?.email ?? '-'}
            </p>
          </div>
        )}
        {loading ? (
          <MultiSkeleton />
        ) : (
          <div className="flex items-center gap-8">
            <Link
              target="_blank"
              to={`https://www.facebook.com/${identitas?.fb}`}
            >
              <img src="/icon/facebook.svg" alt="facebook" loading="lazy" />
            </Link>
            <Link target="_blank" to={`mailto:${identitas?.email}`}>
              <img src="/icon/google.svg" alt="google" loading="lazy" />
            </Link>
            <Link
              target="_blank"
              to={`https://www.youtube.com/${identitas?.yt}`}
            >
              <img src="/icon/youtube.svg" alt="youtube" loading="lazy" />
            </Link>
            <Link
              target="_blank"
              to={`https://www.instagram.com/${identitas?.ig}`}
            >
              <img src="/icon/instagram.svg" alt="instagram" loading="lazy" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
