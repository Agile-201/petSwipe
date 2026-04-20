'use client'

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { useRouter } from 'next/navigation';


export function ApplicationForm() {
    const router = useRouter();

    return(
        <form className="h-[960px] w-[800px] bg-[#D8ECFF80] rounded-[30px] mb-15">
            <div className="flex justify-center gap-10 mb-10 pt-13">
                <div className="flex flex-col">
                    <img
                        src="loadImage.png"
                        className="w-[300px] h-[330px] object-cover rounded-[30px] mb-5"
                        alt="loadImage"
                    />

                    <Button
                        onClick={() => router.push('/create-application-form')}
                        className="bg-[#D8ECFF80] h-[50px] rounded-[20px] w-[300px] font-normal
                        text-black border font-extralight border-black border-2"
                    >
                        Загрузить фото
                    </Button>
                </div>

                <div className="flex flex-col text-[#0F1B65]">
                    <p className="mb-3 font-[700]">Имя питомца:</p>
                    <Input
                        type="text"
                        placeholder="Например: Василий"
                        className="rounded-[20px] h-[44px] p-[20px]
                        text-[#0F1B65] text-[16px] bg-white w-[400px] border-none
                        outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                        focus-visible:outline-none focus-visible:ring-0
                        active:outline-none active:ring-0
                        hover:outline-none hover:ring-0
                        [&:focus]:border-none [&:focus]:shadow-none
                        placeholder:text-[#0F1B65] mb-4"
                    />
                    <p className="mb-3 font-[700]">Категория питомца:</p>
                    <Input
                        type="text"
                        placeholder="Например: Кошка"
                        className="rounded-[20px] h-[44px] p-[20px]
                        text-[#0F1B65] text-[16px] bg-white w-[400px] border-none
                        outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                        focus-visible:outline-none focus-visible:ring-0
                        active:outline-none active:ring-0
                        hover:outline-none hover:ring-0
                        [&:focus]:border-none [&:focus]:shadow-none
                        placeholder:text-[#0F1B65] mb-4"
                    />
                    <p className="mb-3 font-[700]">Возраст:</p>
                    <Input
                        type="text"
                        placeholder="Например: 15 лет"
                        className="rounded-[20px] h-[44px] p-[20px]
                        text-[#0F1B65] text-[16px] bg-white w-[400px] border-none
                        outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                        focus-visible:outline-none focus-visible:ring-0
                        active:outline-none active:ring-0
                        hover:outline-none hover:ring-0
                        [&:focus]:border-none [&:focus]:shadow-none
                        placeholder:text-[#0F1B65] mb-4"
                    />
                    <p className="mb-3 font-[700]">Порода:</p>
                    <Input
                        type="text"
                        placeholder="Например: Шотландский вислоухий"
                        className="rounded-[20px] h-[44px] p-[20px]
                        text-[#0F1B65] text-[16px] bg-white w-[400px] border-none
                        outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                        focus-visible:outline-none focus-visible:ring-0
                        active:outline-none active:ring-0
                        hover:outline-none hover:ring-0
                        [&:focus]:border-none [&:focus]:shadow-none
                        placeholder:text-[#0F1B65] mb-4"
                    />
                    <p className="mb-3 font-[700] w-[330px]">Описание питомца (внешность, характер):</p>
                    <Textarea
                        placeholder="Например: покладистый, шкодливый, пушистый, спокойный, игривый."
                        className="rounded-[20px] p-[20px] resize-none h-[100px]
                                    text-[#0F1B65] text-[16px] bg-white w-[400px] border-none
                                    outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                                    focus-visible:outline-none focus-visible:ring-0
                                    active:outline-none active:ring-0
                                    hover:outline-none hover:ring-0
                                    [&:focus]:border-none [&:focus]:shadow-none
                                    placeholder:text-[#0F1B65] mb-4"
                        />
                    <p className="mb-3 font-[700] w-[260px]">Особенности питомца (заболевания, ограничения):</p>
                    <Textarea
                        placeholder="Например: стоматит"
                        className="rounded-[20px] p-[20px] resize-none h-[100px]
                                    text-[#0F1B65] text-[16px] bg-white w-[400px] border-none
                                    outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                                    focus-visible:outline-none focus-visible:ring-0
                                    active:outline-none active:ring-0
                                    hover:outline-none hover:ring-0
                                    [&:focus]:border-none [&:focus]:shadow-none
                                    placeholder:text-[#0F1B65] mb-4"
                        />

                </div>
            </div>

            <div className="flex justify-center items-center gap-60 mb-10 mt-24">
                <Button
                    onClick={() => router.push('/pets')}
                    className="bg-[#D8ECFF80] h-[50px] rounded-[20px] w-[200px] font-normal
                    text-black border font-extralight border-black border-2"
                >
                    Удалить анкету
                </Button>

                <Button
                    className="bg-[#387CCD] h-[50px] rounded-[20px] w-[250px] font-normal hover:bg-[#0F1B65]"
                >
                    Сохранить анкету
                </Button>
            </div>
        </form>
    )
}