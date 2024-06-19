import './detail.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Loading from '@/components/Loading'
import { convertSlugToText } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import { Breadcrumb } from '@/components/Breadcrumb'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { TestimoniType } from '@/libs/types/testimoni-type'
import { useGetTestimoniQuery } from '@/store/slices/testimoniAPI'

export default function Testimonial() {
  const { firstPathname } = usePathname()
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

  // --- Testimoni ---
  const [testimoni, setTestimoni] = useState<TestimoniType[]>([])
  const {
    data: dataTestimoni,
    isFetching: isFetchingTestimoni,
    isLoading: isLoadingTestimoni,
  } = useGetTestimoniQuery({
    page_number: 1,
    page_size: 100,
  })

  const loadingTestimoni = isFetchingTestimoni || isLoadingTestimoni

  useEffect(() => {
    if (dataTestimoni?.data) {
      setTestimoni(dataTestimoni?.data)
    }
  }, [dataTestimoni?.data])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />

      {loadingTestimoni ? (
        <Loading />
      ) : (
        <div className="px-64 phones:p-32">
          <div
            className={
              'flex flex-col gap-32 border bg-background p-64 shadow-lg phones:border-transparent phones:bg-white phones:p-0 phones:shadow-none'
            }
          >
            <div className="flex items-center justify-between gap-32">
              <p className="font-roboto text-[5rem]">
                {convertSlugToText(firstPathname)}
              </p>
            </div>

            {loadingTestimoni ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-12 gap-32">
                {testimoni?.map((item, idx) => (
                  <div className="col-span-4 phones:col-span-12" key={idx}>
                    <div className="flex h-full flex-col gap-24 rounded-2xl bg-white px-24 pb-32 pt-24 shadow hover:cursor-pointer hover:shadow-lg">
                      <div className="h-[25vh] w-full">
                        <img
                          src={item?.photo}
                          alt={item?.nama}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <p className="line-clamp-2 font-roboto text-[2.4rem] phones:text-[2.8rem]">
                          {item?.nama ?? '-'}
                        </p>
                        <div
                          dangerouslySetInnerHTML={{ __html: item?.isi }}
                          className="article-content line-clamp-3"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
