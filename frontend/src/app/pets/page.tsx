"use client"

import { CardSwiper } from "@/widgets/swipe"
import { SearchBar } from "@/features/pets"
import { Button } from "@/shared/ui/button"
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    
<div className="flex items-center flex-col min-h-screen bg-[url('/PAWS_final.png')] bg-repeat-y bg-top bg-[length:100%_auto] w-full overflow-x-hidden overflow-y-auto px-4">
        <div className="flex justify-center items-center gap-4 sm:gap-70 mb-5 px-4 flex-wrap">
          <p className="text-center text-[#0F1B65] text-[32px] sm:text-[40px] font-bold">Питомцы</p>

          <Button
            onClick={() => router.push('/create-application-form')}
            className="bg-white h-[50px] rounded-[30px] px-6 font-normal text-black text-[18px] sm:text-[20px] sm:w-74 border border-black border-2 whitespace-nowrap"
          >
            Создать анкету
          </Button>
        </div>
  
        <SearchBar/>

        <CardSwiper/>
    </div>
  )
}