"use client"

import { PetCard } from "@/features/pets"
import { Button } from "@/shared/ui/button";
import { useRouter } from 'next/navigation';

export default function PetProfile() {
  const router = useRouter();

  return (
      <div className="flex flex-col items-center justify-center">

        <p className="text-center text-[#0F1B65] text-[35px] font-bold mr-auto ml-80 mb-8">
            Страница питомца
        </p>

        <PetCard
            name="Барсик"
            category="Кот"
            age={3}
            breed="Британец"
            description="Ласковый, спокойный, любит спать на коленях."
            features="Нет особых заболеваний, кастрирован."
            imageUrl="/img1.png"
        />

        <div className="flex justify-center items-center gap-25 mb-15">
                <Button
                    onClick={() => router.push('/pets')}
                    className="bg-white h-[50px] rounded-[20px] w-[350px] font-normal
                    text-black border font-extralight border-black border-2"
                >
                    Вернуться к просмотру анкет
                </Button>

                <Button
                    onClick={() => router.push('/chats')}
                    className="bg-[#387CCD] h-[50px] rounded-[20px] w-[350px] font-normal hover:bg-[#0F1B65]"
                >
                    Написать владельцу
                </Button>
        </div>
      </div>
    );
}