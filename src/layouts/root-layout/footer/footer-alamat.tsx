export function FooterAlamat() {
  return (
    <div className="flex w-1/3 flex-col gap-48 phones:w-full">
      <p className="font-bold">Alamat</p>
      <div className="flex flex-col gap-32">
        <div className="flex flex-col gap-8">
          <p className="font-bold">Jalan Kartini Soposurung</p>
          <p>Balige - Toba Samosir</p>
          <p>Sumatera Utara 22312</p>
        </div>
        <div className="flex flex-col gap-8">
          <p className="font-bold">
            <span className="underline">Phone</span>: 0632-4320052
          </p>
          <p>
            <span className="underline">Fax</span>: 0632-4320052
          </p>
          <p>
            <span className="underline">Email</span>: smanduabalige@yahoo.co.id
          </p>
        </div>
        <div className="flex items-center gap-8">
          <img src="/icon/facebook.svg" alt="facebook" loading="lazy" />
          <img src="/icon/google.svg" alt="google" loading="lazy" />
          <img src="/icon/youtube.svg" alt="youtube" loading="lazy" />
          <img src="/icon/instagram.svg" alt="instagram" loading="lazy" />
        </div>
      </div>
    </div>
  )
}
