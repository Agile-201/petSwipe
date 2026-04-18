'use client';

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export const RegisterForm = () => {
    return(
        <div className="flex flex-col items-center">
            <Input
                type="email"
                placeholder="Email"
                className="mt-10 rounded-[30px] h-[44px] w-[454px] p-[20px]
                text-black text-[16px] bg-white w-[552px] border-none
                outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                focus-visible:outline-none focus-visible:ring-0
                active:outline-none active:ring-0
                hover:outline-none hover:ring-0
                [&:focus]:border-none [&:focus]:shadow-none
                placeholder:text-black"
            />

            <Input
                type="text"
                placeholder="Пароль"
                className="mt-5 mb-5 rounded-[30px] h-[44px] w-[454px] p-[20px]
                text-black text-[16px] bg-white w-[552px] border-none
                outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                focus-visible:outline-none focus-visible:ring-0
                active:outline-none active:ring-0
                hover:outline-none hover:ring-0
                [&:focus]:border-none [&:focus]:shadow-none
                placeholder:text-black"
            />

            <Input
                type="password"
                placeholder="Подтвердите пароль"
                className="rounded-[30px] h-[44px] w-[454px] p-[20px]
                text-black text-[16px] bg-white w-[552px] border-none
                outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                focus-visible:outline-none focus-visible:ring-0
                active:outline-none active:ring-0
                hover:outline-none hover:ring-0
                [&:focus]:border-none [&:focus]:shadow-none
                placeholder:text-black mb-14"
            />
        
            <Button className="bg-[#387CCD] h-[50px] w-[552px] text-white font-light text-[18px] rounded-[30px]">
                Зарегистрироваться
            </Button>
        </div>
    )
}