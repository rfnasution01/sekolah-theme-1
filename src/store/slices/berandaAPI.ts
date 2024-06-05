import {
  BerandaType,
  BeritaDetailType,
  HalamanDetailType,
  IdentitasType,
  MenuType,
  Params,
  ProgramDetailType,
  SliderType,
} from '@/libs/types/beranda-type'
import { Res, api } from '../api'

export const BerandaEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getIdentitas: builder.query<Res<IdentitasType>, void>({
      query: () => ({
        url: `website/identitas`,
        method: 'GET',
      }),
    }),
    getMenuUtama: builder.query<Res<MenuType[]>, void>({
      query: () => ({
        url: `website/menu_utama`,
        method: 'GET',
      }),
    }),
    getMenuTop: builder.query<Res<MenuType[]>, void>({
      query: () => ({
        url: `website/menu_top`,
        method: 'GET',
      }),
    }),
    getSlider: builder.query<Res<SliderType[]>, void>({
      query: () => ({
        url: `website/slider`,
        method: 'GET',
      }),
    }),
    getBeranda: builder.query<Res<BerandaType[]>, void>({
      query: () => ({
        url: `website/beranda`,
        method: 'GET',
      }),
    }),
    getHalamanDetail: builder.query<Res<HalamanDetailType>, { id: string }>({
      query: ({ id }) => ({
        url: `website/halaman`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
    getProgram: builder.query<Res<ProgramDetailType[]>, void>({
      query: () => ({
        url: `website/program`,
        method: 'GET',
      }),
    }),
    getProgramDetail: builder.query<Res<ProgramDetailType>, { id: string }>({
      query: ({ id }) => ({
        url: `website/program/detail`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
    getBerita: builder.query<Res<BeritaDetailType[]>, Params>({
      query: ({ page_size, page_number, search }) => ({
        url: `website/berita`,
        method: 'GET',
        params: {
          page_number: page_number,
          page_size: page_size,
          search: search,
        },
      }),
    }),
    getBeritaDetail: builder.query<Res<BeritaDetailType[]>, { id: string }>({
      query: ({ id }) => ({
        url: `website/berita/detail`,
        method: 'GET',
        params: {
          id: id,
        },
      }),
    }),
  }),
})

export const {
  useGetIdentitasQuery,
  useGetMenuTopQuery,
  useGetMenuUtamaQuery,
  useGetSliderQuery,
  useGetHalamanDetailQuery,
  useGetBerandaQuery,
  useGetProgramQuery,
  useGetProgramDetailQuery,
  useGetBeritaQuery,
  useGetBeritaDetailQuery,
} = BerandaEndpoints
