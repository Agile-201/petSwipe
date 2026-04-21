import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"

export function FeedbackForm() {
    return(
        <div className="lg:ml-auto w-full lg:w-auto max-w-[500px]">

            <p className="text-base sm:text-lg md:text-[20px] font-bold text-[#0F1B65] max-w-[377px]">
              Если у вас остались вопросы, свяжитесь с нами:
            </p>

            <div className="mt-5 space-y-3">
              <Input
                type="email"
                placeholder="Email:"
                className="rounded-[30px] h-[44px] w-full p-[20px]
                  text-[#0F1B65DB] text-[16px]
                  border border-[#0F1B65DB]
                  outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                  focus-visible:outline-none focus-visible:ring-0
                  active:outline-none active:ring-0
                  hover:outline-none hover:ring-0
                  [&:focus]:border-[#0F1B65DB] [&:focus]:shadow-none
                  placeholder:text-[#0F1B65DB]"
              />
              <Input
                type="text"
                placeholder="Вопрос:"
                className="rounded-[30px] h-[44px] w-full p-[20px]
                  text-[#0F1B65DB] text-[16px]
                  border border-[#0F1B65DB]
                  outline-none focus:outline-none focus:ring-0 focus:ring-offset-0
                  focus-visible:outline-none focus-visible:ring-0
                  active:outline-none active:ring-0
                  hover:outline-none hover:ring-0
                  [&:focus]:border-[#0F1B65DB] [&:focus]:shadow-none
                  placeholder:text-[#0F1B65DB]"
              />
            </div>

            <div className="mt-5 flex justify-end">
              <Button className="bg-[#0F1B65] h-[40px] rounded-[20px] w-full sm:w-[149px] font-normal text-white hover:bg-[#1E2A7A] transition">
                Отправить
              </Button>
            </div>

          </div>
    )
}