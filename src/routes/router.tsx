import { createBrowserRouter } from 'react-router-dom'
import {
  AgendaPage,
  BeritaPage,
  ComingSoonPage,
  DetailLayout,
  HalamanPage,
  HomePage,
  KategoriLayout,
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
        path: 'berita/:kategori',
        element: <KategoriLayout />,
      },
      { path: 'berita/page/:id', element: <DetailLayout /> },
      {
        path: 'pengumuman',
        element: <PengumumanPage />,
      },
      {
        path: 'pengumuman/:kategori',
        element: <KategoriLayout />,
      },
      { path: 'pengumuman/page/:id', element: <DetailLayout /> },
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
