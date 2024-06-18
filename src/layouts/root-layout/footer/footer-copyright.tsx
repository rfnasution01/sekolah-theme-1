import { IdentitasType } from '@/libs/types/beranda-type'

export function FooterCopyright({ identitas }: { identitas: IdentitasType }) {
  return (
    <div className="w-full bg-primary-footer">
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
    </div>
  )
}
