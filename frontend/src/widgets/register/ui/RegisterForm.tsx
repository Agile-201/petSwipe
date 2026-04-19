'use client';

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/shared/ui/field"
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export const RegisterForm = () => {
    const router = useRouter();
    
    const onSubmit = async () => {
        toast.success("Вы успешно зарегистрировались и вошли в аккаунт");
        router.push('/pets');
    };

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
                type="password"
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

            <RadioGroup defaultValue="comfortable" className="w-fit mb-20">
            <Field orientation="horizontal">
                <RadioGroupItem value="default" id="desc-r1" />
                <FieldContent>
                <FieldLabel htmlFor="desc-r1">Ищу Питомца</FieldLabel>
                <FieldDescription>
                    Ищете себе хвостика
                </FieldDescription>
                </FieldContent>
            </Field>
            <Field orientation="horizontal">
                <RadioGroupItem value="comfortable" id="desc-r2" />
                <FieldContent>
                <FieldLabel htmlFor="desc-r2">Владелец</FieldLabel>
                <FieldDescription>Хотите отдать кому-то хвостика</FieldDescription>
                </FieldContent>
            </Field>
            </RadioGroup>
            
        
            <Button
                onClick={onSubmit}
                className="bg-[#387CCD] h-[50px] w-[552px] text-white font-light text-[18px] rounded-[30px] hover:bg-[#0F1B65]">
                Зарегистрироваться
            </Button>
        </div>
    )
}