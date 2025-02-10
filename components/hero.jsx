import React from "react";

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-[90vh] md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
      {/* Outer Diamond */}
      <div className="absolute top-44 -left-2 right-0 mx-auto w-[450px] h-[450px] border border-dotted border-black rotate-45 z-10 block lg:hidden"></div>

      {/* Inner Diamond */}
      <div className="absolute top-[200px] -left-2 right-0 mx-auto w-[400px] h-[400px] border border-dotted border-black rotate-45 z-10 block lg:hidden"></div>

      {/* Text Content */}
      <div className="z-10 flex flex-col items-center justify-center text-center -translate-y-8 -translate-x-1">
        <h1 className="text-[80px] lg:text-[100px] font-inter font-normal tracking-tighter leading-none">
          Sophisticated
          <br />
          skincare
        </h1>
      </div>

      {/* Desktop-specific placement for paragraph */}
      <div className="flex lg:fixed lg:bottom-10 lg:right-100 lg:text-start">
        <p className="mt-4 mb-8 w-[38ch] sm:text-xs lg:text-lg font-semibold text-center lg:text-left sm:text-muted-foreground lg:text-black">
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>
      </div>

      {/* Button */}
      <div className="mt-8">
        <button className="relative flex flex-row items-center justify-center gap-4 lg:hidden">
          <span className="text-[10px] font-bold">ENTER EXPERIENCE</span>
          <div className="w-[30px] h-[30px] border border-solid border-black rotate-45"></div>
          <span className="absolute left-[80px] sm:left-[123px] lg:left-[123px] scale-[0.6]">
            &#x25B6;
          </span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
