import { RootHeader } from './root-header'

export default function RootLayout() {
  return (
    <div className="flex h-screen flex-col bg-white text-[2rem] phones:text-[2.4rem]">
      <div className="bg-primary-500 p-24 text-primary-100">
        <RootHeader />
      </div>
      <div className="bg-blue-300">Naviasi</div>
      <div className="scrollbar h-full flex-1 overflow-y-auto bg-red-300">
        <div className="bg-green-300 text-[15rem]">Konten</div>
        <div className="bg-yellow-300">Footer</div>
      </div>
    </div>
  )
}
