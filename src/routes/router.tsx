import { createBrowserRouter } from 'react-router-dom'
import {
  AgendaPage,
  BeritaPage,
  ComingSoonPage,
  HalamanPage,
  HomePage,
  PengumumanPage,
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
      {
        path: 'pengumuman',
        element: <PengumumanPage />,
      },
      {
        path: 'agenda',
        element: <AgendaPage />,
      },
    ],
  },

  {
    path: '*',
    element: <ComingSoonPage />,
  },
])
