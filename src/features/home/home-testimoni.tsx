import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loading from '@/components/Loading'
import { NoData } from '@/components/NoData'
import { TestimoniType } from '@/libs/types/testimoni-type'
import { useGetTestimoniQuery } from '@/store/slices/testimoniAPI'
import './detail.css'
import Card from './home-testimoni-card'

export function HomeTestimoni() {
  const [testimoni, setTestimoni] = useState<TestimoniType[]>([])
  const { data, isFetching, isLoading } = useGetTestimoniQuery({
    page_number: 1,
    page_size: 100,
  })

  useEffect(() => {
    if (data?.data) {
      setTestimoni(data?.data)
    }
  }, [data?.data])

  const settings = {
    dots: true,
    fade: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: () => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  }

  return (
    <div className="flex w-full flex-col gap-32 px-64 phones:px-32">
      {/* --- Title --- */}
      <div className="flex w-full items-center">
        <hr className="flex-1 border border-primary-100" />
        <p className="rounded-2xl border border-primary-100 p-24 text-center font-roboto text-[5rem]">
          Apa kata mereka?
        </p>
        <hr className="flex-1 border border-primary-100" />
      </div>
      {isLoading || isFetching ? (
        <Loading />
      ) : testimoni?.length > 0 ? (
        <Slider {...settings}>{testimoni?.map(Card)}</Slider>
      ) : (
        <NoData />
      )}
    </div>
  )
}
