import { SliderType } from '@/libs/types/beranda-type'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'

export function Slider5({
  height = 'h-[80vh]',
  gambar,
  keterangan,
  seo,
  isShadow,
  slider,
  showIndex,
  setShowIndex,
  isShowNext,
}: {
  height?: string
  gambar: string
  keterangan: string
  seo: string
  isShadow?: boolean
  slider: SliderType[]
  showIndex?: number
  setShowIndex: Dispatch<SetStateAction<number>>
  isShowNext?: boolean
}) {
  return (
    <Link to={`/${seo}`} className={`relative block`}>
      <img
        src={gambar}
        alt={keterangan}
        className={`phones:h-[30vh] ${height} w-full rounded-lg bg-opacity-10 object-cover filter`}
        loading="lazy"
      />
      <div
        className={`absolute top-0 flex h-full w-[100%] ${isShadow ? `bg-black-100 bg-opacity-80` : ''}`}
      >
        {isShowNext && (
          <div
            className={`relative flex h-full w-full flex-col justify-end border-white `}
          >
            {slider?.length > 1 && (
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
                    'hover:cursor-pointer': showIndex < slider?.length - 1,
                    'hover:cursor-not-allowed': !(
                      showIndex <
                      slider?.length - 1
                    ),
                  })}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (showIndex < slider?.length - 1) {
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
        )}
      </div>
    </Link>
  )
}
