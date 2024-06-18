import { Breadcrumb } from '@/components/Breadcrumb'
import { GaleriDetailType } from '@/libs/types/galeri-type'
import { useGetGaleriDetailQuery } from '@/store/slices/galeriAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getThemeSlice } from '@/store/reducer/stateTheme'
import { getHalamanSlice } from '@/store/reducer/stateIdHalaman'
import { SingleSkeleton } from '@/components/skeleton'

export default function GaleriPage() {
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

  // --- Galeri Page ---
  const [galeriDetail, setGaleriDetail] = useState<GaleriDetailType>()
  const {
    data: galeryDetailData,
    isLoading: galeryDetailLoading,
    isFetching: galeryDetailFetching,
  } = useGetGaleriDetailQuery(
    {
      id: id,
    },
    { skip: id === '' },
  )

  const loadingGaleriDetail = galeryDetailFetching || galeryDetailLoading

  useEffect(() => {
    if (galeryDetailData?.data) {
      setGaleriDetail(galeryDetailData?.data)
    }
  }, [galeryDetailData?.data, id])

  return (
    <div className="mb-80 mt-32 flex flex-col gap-32">
      <Breadcrumb color={color} />

      {loadingGaleriDetail ? (
        <SingleSkeleton height="h-[40vh]" />
      ) : (
        <div className="flex flex-col gap-32 px-64 phones:px-32">
          {galeriDetail?.lampiran?.map((item, idx) => (
            <div className="h-full w-full flex-1" key={idx}>
              <img
                src={item?.gambar}
                alt={item?.judul}
                className={`h-[65vh] w-full rounded-lg bg-opacity-10 object-cover filter phones:h-[30vh]`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
