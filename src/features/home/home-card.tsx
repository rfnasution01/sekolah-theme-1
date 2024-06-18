import { NoData } from '@/components/NoData'
import { BerandaType } from '@/libs/types/beranda-type'
import { HomeShowCard } from './home-show-card'

export function HomeCard({
  beranda,
  color,
  loadingBeranda,
}: {
  beranda: BerandaType[]
  color: string
  loadingBeranda: boolean
}) {
  return (
    <div className="flex flex-col gap-32 px-64 phones:px-32">
      <div className="flex flex-col gap-128">
        {beranda?.length > 0 ? (
          beranda?.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-32">
              <HomeShowCard
                angka={idx}
                data={item}
                kelompok={item?.kelompok}
                color={color}
                loadingBeranda={loadingBeranda}
              />
            </div>
          ))
        ) : (
          <NoData />
        )}
      </div>
    </div>
  )
}
