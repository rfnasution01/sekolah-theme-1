import { createBrowserRouter } from 'react-router-dom'
import { ComingSoonPage, HomePage, RootLayout } from './loadables'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
    ],
  },

  {
    path: '*',
    element: <ComingSoonPage />,
  },
])
