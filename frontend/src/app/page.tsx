"use client"

import { Button } from "@/shared/ui/button"
import { useRouter } from 'next/navigation';
import Link from "next/link"


export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex items-center flex-col">
        <p className="text-[50px] text-[#0F1B65] font-bold mt-20">Поможем вам найти хвостика!</p>

        <p className="text-[24px] text-[#0F1B65] font-light mt-4 text-center">PetSwipe - сервис, помогающий будущему хозяину и</p>

        <p className="text-[24px] text-[#0F1B65] font-light mt-[-10px] text-center">питомцу найти друг друга без преград!</p>

        <Button
          className="bg-[#387CCD] h-[44px] rounded-[30px] w-[202px] font-normal mb-2 self-center mt-3"
          onClick={() => router.push('/about')}
        >
          Узнать больше
        </Button>

        <img className="ml-8 mb-[-78px]" src='catMain.png'/>

        <div className="h-[163px] bg-[#387CCD] w-full flex justify-center items-center gap-5 text-white">
          <div className="flex gap-4 items-center w-[330px] justify-center">
            <p className="text-[44px]">
              150+
            </p>
            <p className="w-[200px] text-[16px] font-light">
              Хвостиков ждут своих хозяев 
            </p>
          </div>

          {/* <div className="flex items-center justify-center">
                <Link href="/">
                    <svg width="83" height="70">
                        <image href="logo.png" width="83" height="70"/>
                    </svg>
                </Link>
          </div> */}

          <div className="flex gap-4 items-center w-[330px] justify-center">
            <p className="text-[44px]">
              450+
            </p>
            <p className="w-[200px] text-[16px] font-light">
              Хвостиков находятся в любящей семье
            </p>
          </div>
        </div>

        <p className="text-[50px] text-[#0F1B65] font-bold mt-20">Как мы работаем?</p>

        <div className="h-[163px] w-full flex justify-center items-center gap-20 text-[#0F1B65]">
          <div className="flex flex-col justify-center items-center">
            <p className="text-[30px] font-bold">
              Регистрация
            </p>
            <p className="w-[200px] text-[16px] font-light">
              Зарегестрируйся на нашей платформе и начни поиск своего хвостика!
            </p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="text-[30px] font-bold">
              Лайкни первым
            </p>
            <p className="w-[200px] text-[16px] font-light">
              Посмотри анкеты и поставь сердчеко хвостику
            </p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="text-[30px] font-bold">
              Перейди в чат
            </p>
            <p className="w-[200px] text-[16px] font-light">
              Понравился хвостик? Обсуди детали вашего воссоединения вместе с хозяином или питомником
            </p>
          </div>
        </div>


        <p className="text-[50px] text-[#0F1B65] font-bold mt-20">Наши счастливые хвостики</p>

    </div>
  )
}
