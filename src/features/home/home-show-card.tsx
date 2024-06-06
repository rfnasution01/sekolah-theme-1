import { Card1, Card2 } from '@/components/card'
import { BerandaType } from '@/libs/types/beranda-type'

export function HomeShowCard({
  angka,
  data,
}: {
  angka: number
  data: BerandaType
}) {
  const index = angka % 4

  switch (index) {
    case 1:
      return <Card1 data={data} angka={angka} />
    case 2:
      return <Card2 data={data} />
    case 3:
      return <Card1 data={data} angka={angka + 1} />
    case 0:
      return <Card1 data={data} angka={angka} />
    default:
      return 'Index tidak ditemukan'
  }
}
