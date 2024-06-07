export function PengumumanShare() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex">
        <div className="border-b-4 border-danger-700 pb-8">
          <p className="border-l-4 border-danger-700 px-12 py-8 font-nunito text-[3rem] uppercase">
            Share Via
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-24">
        <img
          src="/icon/facebook-share.svg"
          alt="Facebook"
          loading="lazy"
          className="transform transition-transform hover:translate-y-12 hover:cursor-pointer"
        />
        <img
          src="/icon/twitter-share.svg"
          alt="Twitter"
          loading="lazy"
          className="transform transition-transform hover:translate-y-12 hover:cursor-pointer"
        />
        <img
          src="/icon/wa-share.svg"
          alt="Whatsapp"
          loading="lazy"
          className="transform transition-transform hover:translate-y-12 hover:cursor-pointer"
        />
        <img
          src="/icon/link-share.svg"
          alt="Link"
          loading="lazy"
          className="transform transition-transform hover:translate-y-12 hover:cursor-pointer"
        />
      </div>
    </div>
  )
}
