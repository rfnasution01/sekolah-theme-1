import {
  BerandaBanner,
  BerandaCard,
  BerandaGaleri,
  BerandaLayanan,
  BerandaTestimoni,
} from '@/features/beranda'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function HomePage() {
  const stateColor = useSelector(getThemeSlice)?.color

  useEffect(() => {
    if (stateColor) {
      setColor(stateColor)
    }
  }, [stateColor])

  const colorParams = localStorage.getItem('themeColor')

  const baseColor = import.meta.env.VITE_BASE_THEME
  const [color, setColor] = useState<string>(
    colorParams ?? stateColor ?? baseColor,
  )

  return (
    <div className="mb-80 flex flex-col gap-32">
      <BerandaBanner color={color} />
      <BerandaCard color={color} />
      <BerandaLayanan color={color} />
      <BerandaTestimoni color={color} />
      <BerandaGaleri />
    </div>
  )
}
