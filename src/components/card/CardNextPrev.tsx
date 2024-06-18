import { Dispatch, ReactNode, SetStateAction } from 'react'

export function CardNextPrev({
  children,
  setShowIndex,
  showIndex,
  is3PerPage,
  is4PerPage,
  length,
}: {
  children: ReactNode
  setShowIndex: Dispatch<SetStateAction<number>>
  showIndex: number
  is3PerPage?: boolean
  is4PerPage?: boolean
  length: number
}) {
  return (
    <div className="scrollbar relative flex h-[60vh] w-full gap-32 overflow-x-hidden">
      {/* --- Navigation -- */}
      <div className="absolute bottom-0 top-0 flex w-full flex-grow items-center justify-between px-4">
        <button
          type="button"
          className="opacity-55 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
          onClick={() => {
            if (showIndex > 0) {
              setShowIndex(showIndex - 1)
            } else {
              setShowIndex(length - (is4PerPage ? 4 : is3PerPage ? 3 : 1))
            }
          }}
        >
          <img src="/icon/IconLeft.svg" alt="Icon Left" />
        </button>
        {children}
        {/* --- Next --- */}
        <button
          type="button"
          className="opacity-55 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
          onClick={() => {
            if (showIndex < length - (is4PerPage ? 4 : is3PerPage ? 3 : 1)) {
              setShowIndex(showIndex + 1)
            } else {
              setShowIndex(0)
            }
          }}
        >
          <img src="/icon/IconRight.svg" alt="Icon Right" />
        </button>
      </div>
    </div>
  )
}
