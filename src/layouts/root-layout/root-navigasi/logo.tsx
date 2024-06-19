import { IdentitasType } from '@/libs/types/beranda-type'
import { Link } from 'react-router-dom'

export function LogoNavigasi({ identitas }: { identitas: IdentitasType }) {
  return (
    <div className={`relative col-span-6 block`}>
      <img
        src="/img/indonesia.png"
        alt={identitas?.nama_website}
        className={`h-[20vh] w-full rounded-lg object-cover opacity-15 filter`}
        loading="lazy"
      />
      <div className="absolute top-0 flex h-full w-[100%]">
        <Link
          to={`/`}
          className={`relative flex h-full w-full flex-col items-center justify-center border-white`}
        >
          <div className="flex  items-center gap-32 p-32">
            <img
              src="/img/SMA.png"
              alt={identitas?.nama_website}
              className={`h-[12vh] rounded-lg object-cover filter phones:h-[9vh]`}
              loading="lazy"
            />
            <div className="flex flex-col gap-12">
              <p className="text-[4rem]">{identitas?.nama_website}</p>
              <p className="text-[2rem] phones:hidden">{identitas?.alamat}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
