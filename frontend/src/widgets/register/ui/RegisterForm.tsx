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
        <div className="flex flex-col items-center w-full">
            <Input
                type="email"
                placeholder="Email"
                className="mt-10 rounded-[30px] h-[44px] p-[20px]
                text-black text-[16px] bg-white w-full border-none
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
                className="mt-5 rounded-[30px] h-[44px] p-[20px]
                text-black text-[16px] bg-white w-full border-none
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
                className="mt-5 rounded-[30px] h-[44px] p-[20px]
                text-black text-[16px] bg-white w-full border-none
                outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                focus-visible:outline-none focus-visible:ring-0
                active:outline-none active:ring-0
                hover:outline-none hover:ring-0
                [&:focus]:border-none [&:focus]:shadow-none
                placeholder:text-black mb-8"
            />

            <RadioGroup defaultValue="default" className="w-full mb-8">
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
                className="bg-[#387CCD] h-[50px] w-full text-white font-light text-[18px] rounded-[30px] hover:bg-[#0F1B65] mt-10 sm:mt-5">
                Зарегистрироваться
            </Button>
        </div>
    )
}