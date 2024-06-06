export function FooterKontak() {
  return (
    <div className="flex w-1/3 flex-col gap-48 phones:w-full">
      <p className="font-bold">Kontak Kami</p>
      <p>
        Sampaikan kritik, saran, komentar, aduan yang anda miliki ke kontak kami
        agar kami dapat memberikan layanan terbaik kepada anda
      </p>
      <div className="flex">
        <button
          type="button"
          className="rounded-2xl bg-primary-500 p-12 text-primary-100 hover:bg-primary-400"
        >
          Kontak
        </button>
      </div>
    </div>
  )
}
