import Loading from '@/components/Loading'
import { ProfilBg } from '@/features/profil'
import { ProfilType } from '@/libs/types/profil-type'
import { useGetProfilQuery } from '@/store/slices/profilAPI'
import { useEffect, useState } from 'react'

export default function ProfilPage() {
  //   --- Profil ---
  const [profil, setProfil] = useState<ProfilType>()
  const { data, isFetching, isLoading } = useGetProfilQuery()

  const loadingProfil = isFetching || isLoading

  useEffect(() => {
    if (data?.data) {
      setProfil(data?.data)
    }
  }, [data?.data])

  return (
    <div className="mb-80 flex flex-col gap-32">
      {/* --- Banner --- */}
      {loadingProfil ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-32 bg-red-300">
          <div className="h-[85vh] w-full">
            <ProfilBg
              profil={profil}
              height="h-[85vh]"
              gambar="/img/identitas.png"
            />
          </div>
        </div>
      )}
    </div>
  )
}
