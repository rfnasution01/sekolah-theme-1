import { createBrowserRouter } from 'react-router-dom'
import {
  ComingSoonPage,
  DetailLayout,
  FaqPage,
  GaleriPage,
  HalamanPage,
  HomePage,
  KategoriLayout,
  ProfilPage,
  ProgramDetailPage,
  ProgramPage,
  RootLayout,
  RouteLayout,
  TentangKamiPage,
  TestimonialDetailPage,
  TestimonialPage,
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
        path: 'profil',
        element: <ProfilPage />,
      },
      {
        path: 'galeri-detail/page/:id',
        element: <GaleriPage />,
      },
      {
        path: 'faq',
        element: <FaqPage />,
      },
      {
        path: 'testimonial',
        element: <TestimonialPage />,
      },
      {
        path: 'program-details/page/:id',
        element: <ProgramDetailPage />,
      },
      {
        path: 'testimonial/page/:id',
        element: <TestimonialDetailPage />,
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
