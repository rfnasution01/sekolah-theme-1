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
export const TentangKamiPage = loadable(() => import('@/pages/tentang-kami'))
export const ProgramDetailPage = loadable(
  () => import('@/pages/program-details'),
)
export const BeritaPage = loadable(() => import('@/pages/berita'))
export const PengumumanPage = loadable(() => import('@/pages/pengumuman'))
export const AgendaPage = loadable(() => import('@/pages/agenda'))
