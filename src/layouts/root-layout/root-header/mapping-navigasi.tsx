import { enumRoute } from '@/libs/enum/enum-route'
import { MenuType } from '@/libs/types/beranda-type'
import { Link } from 'react-router-dom'

export function NavigasiHeader({ menu }: { menu: MenuType[] }) {
  const sortedData = [...menu].sort((a, b) => {
    return parseInt(a.urutan) - parseInt(b.urutan)
  })
  return (
    <div className="flex items-center gap-32">
      {sortedData?.slice(0, 3).map((item, idx) => (
        <Link
          to={
            item?.nama_menu === 'Home'
              ? '/'
              : item?.jenis_menu === enumRoute.ROUTE
                ? item?.slug
                : item?.jenis_menu === enumRoute.HALAMAN
                  ? `/halaman/page/${item?.slug}`
                  : item?.jenis_menu === enumRoute.PROGRAM
                    ? `/program-details/page/${item?.slug}`
                    : item?.jenis_menu === enumRoute.BERITA
                      ? `/berita`
                      : item?.jenis_menu === enumRoute.AGENDA
                        ? `/agenda`
                        : item?.jenis_menu === enumRoute.PENGUMUMAN
                          ? `/pengumuman`
                          : item?.jenis_menu === enumRoute.PRESTASI
                            ? `/prestasi`
                            : item?.jenis_menu === enumRoute.URL
                              ? item?.id_konten
                              : item?.slug
          }
          target={item?.jenis_menu === enumRoute.URL ? '_blank' : '_self'}
          className="text-nowrap font-light text-success-100 hover:cursor-pointer hover:text-success-700"
          key={idx}
        >
          {item?.nama_menu}
        </Link>
      ))}
    </div>
  )
}
