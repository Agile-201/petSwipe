"use client"

import { OurWorkInfo, StatsInfo, EntranceInfo } from "@/features/home/";
import { Button } from "@/shared/ui/button"
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex items-center flex-col min-h-screen bg-[url('/PAWS_final.png')]
      bg-repeat-y bg-top bg-[length:100%_auto] w-full overflow-x-hidden">

        <EntranceInfo/>

        <img className="mb-[-30px] sm:mb-[-78px]" src='catMain.png'/>

        <StatsInfo/>

        <OurWorkInfo/>

        <Button
          onClick={() => router.push('/pets')}
          className="bg-white h-[74px] rounded-[30px] w-full max-w-[360px] sm:max-w-[560px] mx-4 font-normal text-black
                    text-[30px] sm:text-[40px] mb-20 border font-extralight border-black border-2"
        >
          Найди себе питомца!
        </Button>
    </div>
  )
}