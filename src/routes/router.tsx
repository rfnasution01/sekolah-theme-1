import { createBrowserRouter } from 'react-router-dom'
import { ComingSoonPage, HalamanPage, HomePage, RootLayout } from './loadables'

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
    ],
  },

  {
    path: '*',
    element: <ComingSoonPage />,
  },
])
