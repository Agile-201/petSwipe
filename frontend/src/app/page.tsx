"use client"

import { OurWorkInfo, StatsInfo, EntranceInfo } from "@/features/home/";
import { Button } from "@/shared/ui/button"
import { useRouter } from 'next/navigation';


export default function HomePage() {
  const router = useRouter();

  return (
    <div
      className="flex items-center flex-col min-h-screen"
      style={{
        backgroundImage: "url('/PAWS_final.png')",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% auto",
        backgroundPosition: "top",
      }}
    >

        <EntranceInfo/>

        <img className="ml-8 mb-[-78px]" src='catMain.png'/>

        <StatsInfo/>

        <OurWorkInfo/>

        <Button
          onClick={() => router.push('/pets')}
          className="bg-white h-[74px] rounded-[30px] w-[560px] font-normal text-black text-[40px] mb-20 border font-extralight border-black border-2"
        >
          Найди себе питомца!
        </Button>

    </div>
  )
}
