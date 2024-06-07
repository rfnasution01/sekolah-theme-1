export type FaqType = {
  kategori: string
  faq: FaqDetailType[]
}

export type FaqDetailType = {
  pertanyaan: string
  jawaban: string
  urutan: string
}
