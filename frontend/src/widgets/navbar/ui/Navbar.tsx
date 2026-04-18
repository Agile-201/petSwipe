'use client'

import Link from "next/link"
import { Button } from "@/shared/ui/button"
import MsgIcon from '@/../public/msg.svg'
import { useRouter } from 'next/navigation';


export function Navbar(){
    const router = useRouter();

    return(
        <div className="bg-white h-[94px] flex items-center">

            <div className="ml-[150px]">
                <Link href="/">
                    <svg width="83" height="70">
                        <image href="logo.png" width="83" height="70"/>
                    </svg>
                </Link>
            </div>

            <div className="flex gap-[70px] ml-[40px]">
                <Link href="/pets"><div className="text-[22px] font-light">Питомцы</div></Link>
                <Link href="/about"><div className="text-[22px] font-light">О нас</div></Link>
            </div>

            <div className="flex gap-3 ml-auto mr-[150px]">
                <MsgIcon 
                    width="39" 
                    height="33" 
                    fill='#387CCD'
                    strokeWidth={6}
                    className="mt-[5px]"
                />
                <Button 
                    className="bg-[#387CCD] h-[44px] rounded-[20px] w-[242px] font-normal"
                    onClick={() => router.push('/auth')}
                >
                    Зарегистрироваться
                </Button>
            </div>
        </div>
    )
}