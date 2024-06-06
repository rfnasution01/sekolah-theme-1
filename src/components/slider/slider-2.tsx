import { BeritaType } from '@/libs/types/beranda-type'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

export function Slider2({
  listImage,
  height = 'h-[80vh]',
  isShadow,
}: {
  listImage: BeritaType[]
  height?: string
  isShadow?: boolean
}) {
  const [showIndex, setShowIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (showIndex === listImage?.length - 1) {
        setShowIndex(0)
      } else {
        setShowIndex(showIndex + 1)
      }
    }, 3000) // Mengganti gambar setiap 5 detik

    return () => clearInterval(interval)
  }, [showIndex])

  return (
    <div className="flex flex-col gap-y-32">
      <div className={`relative col-span-6 block`}>
        <img
          src={listImage?.[showIndex]?.photo?.gambar}
          alt={listImage?.[showIndex]?.photo?.keterangan}
          className={`phones:h-[30vh] ${height} w-full rounded-lg bg-opacity-10 object-cover filter`}
          style={{}}
          loading="lazy"
        />
        <div className="absolute top-0 flex h-full w-[100%]">
          {isShadow && (
            <div className="h-full w-[10%] bg-black bg-opacity-60" />
          )}
          <div
            className={`"relative flex h-full ${isShadow ? 'w-[80%]' : 'w-full'} border-white" flex-col justify-end`}
          >
            {/* --- Navigation -- */}
            <div
              className={`absolute bottom-0 top-0 flex ${isShadow ? 'w-[80%]' : 'w-full'} flex-grow items-center justify-between px-4`}
            >
              <span
                className={clsx('', {
                  'hover:cursor-pointer': showIndex > 0,
                  'hover:cursor-not-allowed': !(showIndex > 0),
                })}
                onClick={() => {
                  if (showIndex > 0) {
                    setShowIndex(showIndex - 1)
                  }
                }}
              >
                <img
                  src="/icon/IconLeft.svg"
                  alt="Icon Left"
                  className="block phones:hidden"
                  loading="lazy"
                />
                <img
                  src="/icon/CircleLeft.svg"
                  alt="Icon Left"
                  className="hidden phones:block"
                  loading="lazy"
                />
              </span>
              <span
                className={clsx('', {
                  'hover:cursor-pointer': showIndex < listImage?.length - 1,
                  'hover:cursor-not-allowed': !(
                    showIndex <
                    listImage?.length - 1
                  ),
                })}
                onClick={() => {
                  if (showIndex < listImage?.length - 1) {
                    setShowIndex(showIndex + 1)
                  }
                }}
              >
                <img
                  src="/icon/IconRight.svg"
                  alt="Icon Right"
                  className="block phones:hidden"
                  loading="lazy"
                />
                <img
                  src="/icon/CircleRight.svg"
                  alt="Icon Right"
                  className="hidden phones:block"
                  loading="lazy"
                />
              </span>
            </div>
          </div>

          {isShadow && (
            <div className="h-full w-[10%] bg-black bg-opacity-60" />
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-16">
        {listImage?.map((_item, idx) => (
          <div
            className={clsx('h-16 w-16 rounded-full', {
              'bg-primary-800': idx === showIndex,
              'bg-primary-200': idx !== showIndex,
            })}
            key={idx}
          />
        ))}
      </div>
    </div>
  )
}
