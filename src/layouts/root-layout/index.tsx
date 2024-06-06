import { RootHeader } from './root-header'
import { RootNavigasi } from './root-navigasi'

export default function RootLayout() {
  return (
    <div className="flex h-screen flex-col bg-white text-[2rem] phones:text-[2.4rem]">
      <div className="bg-primary-500 p-24 text-primary-100">
        <RootHeader />
      </div>
      <RootNavigasi />
      <div className="scrollbar h-full flex-1 overflow-y-auto bg-red-300">
        <div className="bg-green-300 text-[15rem]">Konten</div>
        <div className="bg-yellow-300">Footer</div>
      </div>
    </div>
  )
}
