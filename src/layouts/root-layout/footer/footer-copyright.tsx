import { SingleSkeleton } from '@/components/skeleton'
import { bgPrimary900 } from '@/libs/helpers/format-color'
import { IdentitasType } from '@/libs/types/beranda-type'

export function FooterCopyright({
  identitas,
  color,
  loadingFooter,
}: {
  identitas: IdentitasType
  color: string
  loadingFooter: boolean
}) {
  return (
    <div className={`w-full ${bgPrimary900(color)}`}>
      {loadingFooter ? (
        <div className="px-64 py-32">
          <SingleSkeleton />
        </div>
      ) : (
        <div className="flex flex-col gap-16 px-64 py-32 phones:text-center">
          <p>
            Copyright &#169; 2024 All rights reserves by{' '}
            <span className="font-bold">{identitas?.footer}</span>
          </p>

          <p>
            Designer and maintained by:{' '}
            <span className="font-bold">{identitas?.nama_website}</span>
          </p>
        </div>
      )}
    </div>
  )
}
