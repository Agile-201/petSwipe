import Link from "next/link"

export function NavLinks() {
    return(
        <div className="flex flex-col gap-y-2 text-sm sm:text-base">
            <Link href="/pets" className="font-light hover:underline">
                Питомцы
            </Link>
            <Link href="/about" className="font-light hover:underline">
                О нас
            </Link>
            <Link href="#" className="font-light hover:underline">
                Политика конфиденциальности
            </Link>
            <Link href="#" className="font-light hover:underline">
                Условия использования
            </Link>
        </div>
    )
}