import { assets } from "../assets/assets";

function Hero() {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      <div className="w-full flex items-center sm:w-1/2 justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="uppercase font-medium text-sm md:text-base">
              our bestsellers
            </p>
          </div>
          <h1 className="text-3xl prata-regular lg:text-5xl sm:py-3 leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base uppercase">
              Shop nn
            </p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      <img src={assets.hero_img} alt="hero" className="w-full sm:w-1/2" />
    </div>
  );
}

export default Hero;
