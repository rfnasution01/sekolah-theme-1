import { SingleSkeleton } from '@/components/skeleton'
import { IdentitasType } from '@/libs/types/beranda-type'

export function FooterCopyright({
  identitas,
  loading,
}: {
  identitas: IdentitasType
  loading: boolean
}) {
  return (
    <div className="w-full bg-primary-footer">
      <div className="flex flex-col gap-16 px-64 py-32 phones:text-center">
        {loading ? (
          <SingleSkeleton height="h-[2.4rem]" width="w-2/6" />
        ) : (
          <p>
            Copyright &#169; 2024 All rights reserves by{' '}
            <span className="font-bold">{identitas?.footer}</span>
          </p>
        )}
        {loading ? (
          <SingleSkeleton height="h-[2rem]" width="w-1/6" />
        ) : (
          <p>
            Designer and maintained by:{' '}
            <span className="font-bold">{identitas?.nama_website}</span>
          </p>
        )}
      </div>
    </div>
  )
}
