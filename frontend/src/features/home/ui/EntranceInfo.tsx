"use client"

import { Button } from "@/shared/ui/button"
import { useRouter } from 'next/navigation';


export function EntranceInfo() {
    const router = useRouter();
    
    return (
        <div className="flex items-center flex-col">
            <p className="text-center mx-5 text-[40px] sm:text-[50px] text-[#0F1B65] font-bold mt-10 sm:mt-20 ">Поможем вам найти хвостика!</p>

            <p className="text-[24px] text-[#0F1B65] font-light mt-4 text-center max-w-120 sm:max-w-160 mb-3">PetSwipe - сервис, помогающий будущему хозяину и питомцу найти друг друга без преград!</p>

            <Button
                className="bg-[#387CCD] h-[44px] rounded-[30px] w-[220px] font-normal mb-2 self-center mt-3 hover:bg-[#0F1B65]"
                onClick={() => router.push('/about')}
                >
                Узнать больше
            </Button>
        </div>
    )
}