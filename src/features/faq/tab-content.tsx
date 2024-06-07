import { convertToSlug } from '@/libs/helpers/format-text'
import { FaqType } from '@/libs/types/faq-type'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

export function FaqTab({
  menu,
  firstPathname,
  tab,
  setTab,
}: {
  menu: FaqType[]
  firstPathname: string
  tab: string
  setTab: Dispatch<SetStateAction<string>>
}) {
  return (
    <div className="flex w-1/5 flex-col gap-32 bg-primary-500 p-64 text-primary-100 phones:w-full phones:p-32">
      <p className="font-roboto text-[3rem] uppercase">{firstPathname}</p>
      <div className="flex flex-col gap-16">
        {menu?.map((item, idx) => (
          <div
            key={idx}
            className={clsx('border-l-4 p-8 hover:cursor-pointer', {
              'border-primary-100 bg-primary-100 bg-opacity-10':
                convertToSlug(item?.kategori) === tab ||
                (tab === undefined && idx === 0),
              'border-transparent': convertToSlug(item?.kategori) !== tab,
            })}
            onClick={() => setTab(convertToSlug(item?.kategori))}
          >
            {item?.kategori}
          </div>
        ))}
      </div>
    </div>
  )
}
