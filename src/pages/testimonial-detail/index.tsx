import { Breadcrumb } from '@/components/Breadcrumb'
import Loading from '@/components/Loading'
import { TestimonialDetails } from '@/features/testimonial'
import { TestimoniType } from '@/libs/types/testimoni-type'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { useGetTestimoniIdQuery } from '@/store/slices/testimoniAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function TestimonialDetail() {
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

  const stateId = useSelector(getHalamanSlice)?.id

  useEffect(() => {
    if (stateId) {
      setId(stateId)
    }
  }, [stateId])

  const idParams = localStorage.getItem('beritaID')

  const [id, setId] = useState<string>(idParams ?? stateId ?? '')

  // --- Testimonial Page ---
  const [testimonialDetail, setTestimonialDetail] = useState<TestimoniType>()
  const {
    data: testimonialDetailData,
    isLoading,
    isFetching,
  } = useGetTestimoniIdQuery({
    id: id,
  })

  const loadingTestimonialDetail = isLoading || isFetching

  useEffect(() => {
    if (testimonialDetailData?.data) {
      setTestimonialDetail(testimonialDetailData?.data)
    }
  }, [testimonialDetailData?.data, id])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />
      {loadingTestimonialDetail ? (
        <Loading />
      ) : (
        <TestimonialDetails data={testimonialDetail} />
      )}
    </div>
  )
}
