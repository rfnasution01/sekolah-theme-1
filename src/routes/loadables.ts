import loadable from '@loadable/component'

// ------------------
// ----- Layouts -----
// ------------------

export const RootLayout = loadable(() => import('@/layouts/root-layout'))

// ------------------
// ----- Pages -----
// ------------------

export const ComingSoonPage = loadable(() => import('@/pages/coming-soon'))
export const HomePage = loadable(() => import('@/pages/home'))
export const HalamanPage = loadable(() => import('@/pages/halaman'))
