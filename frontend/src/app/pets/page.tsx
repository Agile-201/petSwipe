"use client"

import { CardSwiper } from "@/widgets/swipe"
import { SearchBar } from "@/features/pets"
import { Button } from "@/shared/ui/button"
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
        <div className="flex justify-center items-center gap-70 mb-5">
          <p className="text-center text-[#0F1B65] text-[40px] font-bold">Питомцы</p>

          <Button
            onClick={() => router.push('/create-application-form')}
            className="bg-white h-[50px] rounded-[30px] w-[290px] font-normal text-black text-[20px] border font-extralight border-black border-2"
          >
            Создать анкету
          </Button>
        </div>

        <SearchBar/>

        <CardSwiper/>
    </div>
  )
}