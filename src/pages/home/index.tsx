import Loading from '@/components/Loading'
import { Slider1 } from '@/components/slider/slider-1'
import { HomeCard, HomeLayanan, HomeTestimoni } from '@/features/home'
import { BerandaType, SliderType } from '@/libs/types/beranda-type'
import {
  useGetBerandaQuery,
  useGetSliderQuery,
} from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'

export default function HomePage() {
  // --- Slider ---
  const [slider, setSlider] = useState<SliderType[]>([])
  const {
    data: sliderData,
    isFetching: isFetchingData,
    isLoading: isLoadingData,
  } = useGetSliderQuery()

  const loadingSlider = isFetchingData || isLoadingData

  useEffect(() => {
    if (sliderData?.data) {
      setSlider(sliderData?.data)
    }
  }, [sliderData?.data])

  //   --- Beranda ---
  const [beranda, setBeranda] = useState<BerandaType[]>([])
  const { data, isFetching, isLoading } = useGetBerandaQuery()

  const loadingBeranda = isFetching || isLoading

  useEffect(() => {
    if (data?.data) {
      setBeranda(data?.data)
    }
  }, [data?.data])

  return (
    <div className="mb-80 flex flex-col gap-32">
      {/* --- Banner --- */}
      {loadingSlider ? <Loading /> : <Slider1 listImage={slider} isShadow />}
      <HomeCard loading={loadingBeranda} beranda={beranda} />
      <HomeLayanan />
      <HomeTestimoni />
    </div>
  )
}
