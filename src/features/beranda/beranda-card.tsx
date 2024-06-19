import { BerandaType } from '@/libs/types/beranda-type'
import { useGetBerandaQuery } from '@/store/slices/berandaAPI'
import { useEffect, useState } from 'react'
import { BerandaCardOption } from './beranda-card-option'
import { SingleSkeleton } from '@/components/skeleton'

export function BerandaCard({ color }: { color: string }) {
  //   --- Beranda ---
  const [beranda, setBeranda] = useState<BerandaType[]>([])
  const {
    data: dataBeranda,
    isFetching: isFetchingBeranda,
    isLoading: isLoadingBeranda,
  } = useGetBerandaQuery()

  const loadingBeranda = isFetchingBeranda || isLoadingBeranda

  useEffect(() => {
    if (dataBeranda?.data) {
      setBeranda(dataBeranda?.data)
    }
  }, [dataBeranda?.data])

  return (
    <div className="flex flex-col gap-32 px-64 phones:px-32">
      <div className="flex flex-col gap-128">
        {loadingBeranda ? (
          <SingleSkeleton height="h-[30vh]" />
        ) : (
          beranda?.length > 0 &&
          beranda?.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-32">
              <BerandaCardOption
                angka={idx}
                data={item}
                kelompok={item?.kelompok}
                color={color}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
