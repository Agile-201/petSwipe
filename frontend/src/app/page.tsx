"use client"

import { Button } from "@/shared/ui/button"


export default function HomePage() {

  return (
    <div className="flex items-center flex-col">
        <p className="text-[50px] text-[#0F1B65] font-bold mt-20">Поможем вам найти хвостика!</p>
        <p className="text-[24px] text-[#0F1B65] font-light mt-4 text-center">PetSwipe - сервис, помогающий будущему хозяину и</p>
        <p className="text-[24px] text-[#0F1B65] font-light mt-[-10px] text-center">питомцу найти друг друга без преград!</p>
        <Button className="bg-[#387CCD] h-[44px] rounded-[30px] w-[202px] font-normal mb-2 self-center mt-3">Узнать больше</Button>
        <img className="ml-8 mb-[-78px]" src='catMain.png'/>
        <div className="h-[163px] bg-[#387CCD] w-full"></div>
        <div className="h-100"></div>
    </div>
  )
}
