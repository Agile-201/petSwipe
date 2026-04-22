"use client"

import { PetCard } from "@/features/pets"
import { Button } from "@/shared/ui/button";
import { useRouter } from 'next/navigation';

export default function PetProfile() {
  const router = useRouter();

  return (
      <div className="flex items-center flex-col min-h-screen bg-[url('/PAWS_final.png')]
        bg-repeat-y bg-top bg-[length:100%_auto] w-full overflow-x-hidden">

        <p className="pl-1 sm:pl-40 text-left w-full text-[#0F1B65] text-[35px] font-bold mt-4 md:mt-0 md:ml-80 mb-8">
            Страница питомца
        </p>

        <PetCard
            name="Василий"
            category="Кот"
            age={4}
            breed="Мейн-кун"
            description="добрый великан среди кошек с царственной внешностью и мягким, собачьим по преданности характером."
            features="Нет особых заболеваний, кастрирован."
            imageUrl="/img1.png"
        />

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-25 mb-15 w-full md:w-auto px-4 md:px-0">
            <Button
            onClick={() => router.push('/pets')}
            className="bg-white h-[50px] rounded-[20px] w-full md:w-[350px] font-normal
            text-black border font-extralight border-black border-2"
            >
            Вернуться к просмотру анкет
            </Button>

            <Button
            onClick={() => router.push('/chats')}
            className="bg-[#387CCD] h-[50px] rounded-[20px] w-full md:w-[350px] font-normal hover:bg-[#0F1B65]"
            >
            Написать владельцу
            </Button>
        </div>
      </div>
    );
}