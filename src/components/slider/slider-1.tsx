import { bgPrimary200, bgPrimary800 } from '@/libs/helpers/format-color'
import { SliderType } from '@/libs/types/beranda-type'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function Slider1({
  listImage,
  height = 'h-[77vh]',
  isShadow,
  color,
}: {
  listImage: SliderType[]
  height?: string
  isShadow?: boolean
  color: string
}) {
  const [showIndex, setShowIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (showIndex === listImage?.length - 1) {
        setShowIndex(0)
      } else {
        setShowIndex(showIndex + 1)
      }
    }, 3000) // Mengganti gambar setiap 3 detik

    return () => clearInterval(interval)
  }, [showIndex])

  return (
    <div className="flex flex-col gap-y-32">
      <div className={`relative col-span-6 block`}>
        <img
          src={listImage?.[showIndex]?.gambar}
          alt={listImage?.[showIndex]?.judul}
          className={`${height} phones:h-[30vh]" w-full rounded-lg bg-opacity-10 object-cover filter`}
          style={{}}
          loading="lazy"
        />
        <Link
          to={listImage?.[showIndex]?.url}
          target="_blank"
          className="absolute top-0 flex h-full w-[100%]"
        >
          {isShadow && (
            <div className="h-full w-[10%] bg-black bg-opacity-60 phones:w-[15%]" />
          )}
          <div
            className={`"relative flex h-full ${isShadow ? 'w-[80%] phones:w-[70%]' : 'w-full'} flex-col justify-end border-white`}
          >
            {/* --- Navigation -- */}
            {listImage?.length > 1 && (
              <div
                className={`absolute bottom-0 top-0 flex ${isShadow ? 'w-[80%] phones:w-[70%]' : 'w-full'} flex-grow items-center justify-between px-4`}
              >
                <button
                  type="button"
                  className={clsx('', {
                    'hover:cursor-pointer': showIndex > 0,
                    'hover:cursor-not-allowed': !(showIndex > 0),
                  })}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation
                    if (showIndex > 0) {
                      setShowIndex(showIndex - 1)
                    }
                  }}
                >
                  <img
                    src="/icon/IconLeft.svg"
                    alt="Icon Left"
                    loading="lazy"
                  />
                </button>
                <button
                  type="button"
                  className={clsx('', {
                    'hover:cursor-pointer': showIndex < listImage?.length - 1,
                    'hover:cursor-not-allowed': !(
                      showIndex <
                      listImage?.length - 1
                    ),
                  })}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (showIndex < listImage?.length - 1) {
                      setShowIndex(showIndex + 1)
                    }
                  }}
                >
                  <img
                    src="/icon/IconRight.svg"
                    alt="Icon Right"
                    loading="lazy"
                  />
                </button>
              </div>
            )}
          </div>

          {isShadow && (
            <div className="h-full w-[10%] bg-black bg-opacity-60 phones:w-[15%]" />
          )}
        </Link>
      </div>
      {listImage?.length > 1 && (
        <div className="flex items-center justify-center gap-x-16">
          {listImage?.map((_item, idx) => (
            <div
              className={`h-16 w-16 rounded-full ${idx === showIndex ? bgPrimary800(color) : bgPrimary200(color)}`}
              key={idx}
            />
          ))}
        </div>
      )}
    </div>
  )
}
