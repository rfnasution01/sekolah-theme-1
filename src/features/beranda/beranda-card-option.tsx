import { CardType1, CardType2, CardType3, CardType4 } from '@/components/cards'
import { BerandaType } from '@/libs/types/beranda-type'

export function BerandaCardOption({
  angka,
  data,
  kelompok,
  color,
}: {
  angka: number
  data: BerandaType
  kelompok: string
  color: string
}) {
  const index = angka % 4

  switch (index) {
    case 1:
      return <CardType2 data={data} kelompok={kelompok} color={color} />
    case 2:
      return <CardType3 data={data} kelompok={kelompok} color={color} />
    case 3:
      return (
        <CardType4
          data={data}
          angka={angka + 1}
          kelompok={kelompok}
          color={color}
        />
      )
    case 0:
      return (
        <CardType1
          data={data}
          angka={angka}
          kelompok={kelompok}
          color={color}
        />
      )
    default:
      return 'Index tidak ditemukan'
  }
}
