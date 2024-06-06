import { Link } from 'react-router-dom'

export function LogoNavigasi() {
  return (
    <Link to="/" className="flex items-center gap-12">
      <img
        src="/img/logo.png"
        alt="logo"
        className="h-[5rem] w-[5rem]"
        loading="lazy"
      />
      <p className="font-sf-pro uppercase">Sma Negeri 2 balige</p>
    </Link>
  )
}
