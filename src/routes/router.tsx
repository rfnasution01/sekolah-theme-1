import { createBrowserRouter } from 'react-router-dom'
import {
  ComingSoonPage,
  DetailLayout,
  HalamanPage,
  HomePage,
  KategoriLayout,
  ProgramDetailPage,
  ProgramPage,
  RootLayout,
  RouteLayout,
  TentangKamiPage,
} from './loadables'

const categories = ['berita', 'pengumuman', 'agenda', 'prestasi']

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },

      {
        path: 'halaman/page/:id',
        element: <HalamanPage />,
      },
      {
        path: 'tentang-kami',
        element: <TentangKamiPage />,
      },
      {
        path: 'program',
        element: <ProgramPage />,
      },
      {
        path: 'program-details/page/:id',
        element: <ProgramDetailPage />,
      },
      ...categories.flatMap((category) => [
        { path: category, element: <RouteLayout /> },
        { path: `${category}/:kategori`, element: <KategoriLayout /> },
        { path: `${category}/page/:id`, element: <DetailLayout /> },
      ]),
    ],
  },

  {
    path: '*',
    element: <ComingSoonPage />,
  },
])
