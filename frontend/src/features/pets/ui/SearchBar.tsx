'use client'

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useRouter } from 'next/navigation';


export function SearchBar() {
    const router = useRouter();

    return(
        <div className="flex justify-center items-center gap-4 mb-10 px-4">
            <Input
                type="text"
                placeholder="Поиск питомца"
                className="bg-white h-[50px] rounded-[20px] flex-1 min-w-[255px] font-normal
                text-black text-[16px] sm:text-[20px] sm:w-148 border border-black border-2
                outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                focus-visible:outline-none focus-visible:ring-0
                active:outline-none active:ring-0
                hover:outline-none hover:ring-0
                [&:focus]:shadow-none [&:focus]:border-black
                placeholder:text-black pl-5"
            />
            <Button 
                className="bg-[#387CCD] h-[50px] rounded-[20px] px-6 whitespace-nowrap
                font-normal hover:bg-[#0F1B65] sm:w-40"
            >
                Найти
            </Button>
        </div>
    )
}