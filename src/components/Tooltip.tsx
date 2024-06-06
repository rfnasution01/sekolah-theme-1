import * as Tooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

const Tooltips = ({
  triggerComponent,
  tooltipContent,
  position,
}: {
  triggerComponent: ReactNode
  tooltipContent: ReactNode
  position?: 'bottom' | 'top' | 'left' | 'right'
}) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="hover:cursor-pointer">{triggerComponent} </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-20 w-[15vw] rounded-xl bg-primary-800 p-8 text-black shadow-xl"
            sideOffset={5}
            side={position}
          >
            {tooltipContent}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default Tooltips
