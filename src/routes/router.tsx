import { createBrowserRouter } from 'react-router-dom'
import {
  BeritaPage,
  ComingSoonPage,
  HalamanPage,
  HomePage,
  ProgramDetailPage,
  RootLayout,
  TentangKamiPage,
} from './loadables'

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
        path: 'halaman',
        element: <HalamanPage />,
      },
      {
        path: 'tentang-kami',
        element: <TentangKamiPage />,
      },
      {
        path: 'program-details',
        element: <ProgramDetailPage />,
      },
      {
        path: 'berita',
        element: <BeritaPage />,
      },
    ],
  },

  {
    path: '*',
    element: <ComingSoonPage />,
  },
])
