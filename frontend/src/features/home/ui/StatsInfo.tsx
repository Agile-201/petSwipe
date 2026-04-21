export function StatsInfo() {
    return (
        <div className="bg-[#387CCD] w-full flex flex-col md:flex-row justify-center items-center gap-5 py-8 md:py-0 md:h-[163px] text-white">
          <div className="flex gap-4 items-center w-[280px] md:w-[330px] justify-center">
            <p className="text-[36px] md:text-[44px]">150+</p>
            <p className="w-[160px] md:w-[200px] text-[14px] md:text-[16px] font-light">
              Хвостиков ждут своих хозяев 
            </p>
          </div>

          <div className="flex gap-4 items-center w-[280px] md:w-[330px] justify-center">
            <p className="text-[36px] md:text-[44px]">450+</p>
            <p className="w-[160px] md:w-[200px] text-[14px] md:text-[16px] font-light">
              Хвостиков находятся в любящей семье
            </p>
          </div>
        </div>
    )
}