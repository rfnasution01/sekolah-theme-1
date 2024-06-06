import { convertSlugToText, convertToSlug } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Breadcrumb({ page }: { page: string }) {
  const { splittedPath } = usePathname()
  return (
    <div className="px-64 phones:px-32">
      <div className="flex items-center gap-12 bg-primary-100 p-12 text-primary-700">
        {splittedPath?.map((item, idx) => (
          <div className="flex items-center gap-12" key={idx}>
            <Link
              to={
                idx !== splittedPath.length - 1
                  ? item === ''
                    ? '/'
                    : convertToSlug(item)
                  : ''
              }
              className={clsx('text-nowrap hover:text-primary-400', {})}
            >
              {item === ''
                ? 'Dashboard'
                : item === 'hasil-ppdb'
                  ? 'Hasil PPDB'
                  : convertSlugToText(item)}
            </Link>
            <p className="text-nowrap">
              <ChevronRight size={16} />
            </p>
          </div>
        ))}
        <p
          className={clsx(
            'text-nowrap hover:cursor-not-allowed hover:text-primary-400',
          )}
        >
          {page}
        </p>
      </div>
    </div>
  )
}
