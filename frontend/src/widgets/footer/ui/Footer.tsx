import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"

export function Footer(){
    return(
        <div className="bg-[#A0CAF0CC] h-[260px] flex items-center">
            <div className="ml-[150px]">
                <Link href="/">
                    <svg width="191" height="161">
                        <image href="logo.png" width="191" height="161"/>
                    </svg>
                </Link>
            </div>

            <div className="ml-[40px] flex flex-col gap-y-2">
                <Link href="/pets"><div className="text-[16px] font-light">Питомцы</div></Link>
                <Link href="/owners"><div className="text-[16px] font-light">Владельцы</div></Link>
                <Link href="/about"><div className="text-[16px] font-light">О нас</div></Link>
                <Link href="/about"><div className="text-[16px] font-light">Политика конфиденциальности</div></Link>
                <Link href="/about"><div className="text-[16px] font-light">Условия использования</div></Link>
            </div>

            <div className="ml-auto mr-[150px]">
                <div className="text-[20px] font-bold w-[377px] text-[#0F1B65]">Если у вас остались вопросы, свяжитесь с нами:</div>
                <Input
                    type="text"
                    placeholder="Вопрос:"
                    className="
                       mt-5 mb-5 rounded-[30px] h-[44px] w-[454px] p-[20px]
                        text-[#0F1B65DB] text-[16px]
                        border border-[#0F1B65DB]
                        outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                        focus-visible:outline-none focus-visible:ring-0
                        active:outline-none active:ring-0
                        hover:outline-none hover:ring-0
                        [&:focus]:border-[#0F1B65DB] [&:focus]:shadow-none
                        placeholder:text-[#0F1B65DB]
                        "
                />
                <div className="justify-self-end"><Button className="bg-[#0F1B65] h-[40px] rounded-[20px] w-[149px] font-normal">Отправить</Button></div>
            </div>
        </div>
    )
}