import Link from "next/link"
import { FeedbackForm, NavLinks } from "@/features/footer"


export function Footer() {
  return (
    <footer className="bg-[#A0CAF0CC] py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

          <div className="flex flex-row items-center gap-6 w-full lg:w-auto lg:gap-0">
            <div className="shrink-0">
              <Link href="/">
                <svg
                  viewBox="0 0 191 161"
                  className="w-[120px] h-[100px] sm:w-[150px] sm:h-[130px] md:w-[191px] md:h-[161px]"
                >
                  <image href="/logo.png" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
                </svg>
              </Link>
            </div>

            <div className="lg:hidden">
              <NavLinks />
            </div>
          </div>

          <div className="hidden lg:block">
            <NavLinks />
          </div>

          <div className="lg:ml-auto w-full lg:w-auto max-w-[500px]">
            <FeedbackForm />
          </div>

        </div>
      </div>
    </footer>
  )
}