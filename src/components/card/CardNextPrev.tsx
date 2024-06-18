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
    <div className="scrollbar relative flex w-full gap-32 overflow-x-hidden">
      {children}
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
          <img
            src="/icon/IconLeft.svg"
            alt="Icon Left"
            className="block w-[6rem] phones:hidden"
          />
          <img
            src="/icon/CircleLeft.svg"
            alt="Icon Left"
            className="hidden phones:block"
          />
        </button>
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
          <img
            src="/icon/IconRight.svg"
            alt="Icon Right"
            className="block w-[6rem] phones:hidden"
          />
          <img
            src="/icon/CircleRight.svg"
            alt="Icon Right"
            className="hidden phones:block"
          />
        </button>
      </div>
    </div>
  )
}
