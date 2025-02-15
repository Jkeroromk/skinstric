"use client";

import React, { useState } from "react";
import Diamond from "@/components/diamond";
import { Button } from "./ui/button";

const Hero = () => {
  const [hoveredDiamond, setHoveredDiamond] = useState(null);

  let headingShift = "translate-x-0";
  if (hoveredDiamond === "left") {
    headingShift = "translate-x-[24vw]";
  } else if (hoveredDiamond === "right") {
    headingShift = "-translate-x-[24vw]";
  }

  return (
    <>
      <div
        className="
          relative 
          flex flex-col items-center justify-center
          h-auto min-h-[90vh] md:h-[90vh] 
          md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
        "
      >
        {/* Mobile Diamonds */}
        <Diamond
          className="absolute top-36 -left-2 right-0 mx-auto z-10 block lg:hidden"
          size="w-[320px] h-[320px]"
          dotted
          borderColorClass="border-black"
        />
        <Diamond
          className="absolute top-[165px] -left-2 right-0 mx-auto z-10 block lg:hidden"
          size="w-[280px] h-[280px]"
          dotted
          borderColorClass="border-black"
        />

        {/* Heading (centered, shifts via transform) */}
        <div
          className={`
            z-10 flex flex-col items-center justify-center text-center
            -translate-y-8 -translate-x-1
            transition-transform duration-700 ease-in-out
            ${headingShift}
          `}
        >
          <h1 className="text-[60px] lg:text-[100px] font-inter font-normal tracking-tighter leading-none">
            Sophisticated
            <br />
            <span
              className={`
                block transition-transform duration-700 ease-in-out
                ${
                  hoveredDiamond === "left"
                    ? "translate-x-[7vw]"
                    : hoveredDiamond === "right"
                    ? "-translate-x-[7vw]"
                    : "translate-x-0"
                }
              `}
            >
              skincare
            </span>
          </h1>
        </div>

        {/* Mobile text */}
        <p
          className="
            block lg:hidden
            mt-4 mb-8 w-[30ch]
            text-[10px] font-semibold
            text-center text-muted-foreground
          "
        >
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>

        {/* Mobile button */}
        <div className="mt-4">
          <button className="relative flex flex-row items-center justify-center gap-4 lg:hidden">
            <span className="text-[8px] font-bold">ENTER EXPERIENCE</span>
            <Diamond
              className="rotate-45"
              size="w-[24px] h-[24px]"
              dotted={false}
            />
            <span className="absolute left-[100px] scale-[0.5]">
              &#x25B6;
            </span>
          </button>
        </div>
      </div>

      {/* Desktop text */}
      <div
        className="
          hidden lg:block
          fixed bottom-10 left-10
          font-normal text-sm text-black
          space-y-3
        "
      >
        <p>
          Skinstric developed an A.I. that creates a
          <br />
          highly-personalised routine tailored to
          <br />
          what your skin needs.
        </p>
      </div>

      {/* LEFT Diamond */}
      <div
        className={`
          hidden
          lg:block
          absolute
          top-1/2
          left-[-350px]
          -translate-y-1/2
          w-[500px]
          h-[500px]
          transition-opacity duration-500 ease-in-out
          ${
            hoveredDiamond === "right"
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }
        `}
      >
        <div className="relative w-full h-full">
          <Diamond
            className="absolute inset-0"
            size="w-full h-full"
            dotted
            borderColorClass="border-black"
          />
          <Button
            onMouseEnter={() => setHoveredDiamond("left")}
            onMouseLeave={() => setHoveredDiamond(null)}
            className="
              absolute
              top-1/2
              right-0
              -translate-y-1/2
              translate-x-1/2
              px-3 py-1
            "
            variant="ghost"
          >
            Discover A.I.
            <Diamond
              className="rotate-45"
              size="w-[30px] h-[30px]"
              dotted={false}
            />
            <span className="absolute left-[115px] scale-[0.6]">&#x25B6;</span>
          </Button>
        </div>
      </div>

      {/* RIGHT Diamond */}
      <div
        className={`
          hidden
          lg:block
          absolute
          top-1/2
          right-[-350px]
          -translate-y-1/2
          w-[500px]
          h-[500px]
          transition-opacity duration-500 ease-in-out
          ${
            hoveredDiamond === "left"
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }
        `}
      >
        <div className="relative w-full h-full">
          <Diamond
            className="absolute inset-0"
            size="w-full h-full"
            dotted
            borderColorClass="border-black"
          />
          <Button
            onMouseEnter={() => setHoveredDiamond("right")}
            onMouseLeave={() => setHoveredDiamond(null)}
            className="
              absolute
              top-1/2
              left-0
              -translate-y-1/2
              -translate-x-1/2
              px-3 py-1
            "
            variant="ghost"
          >
            <Diamond
              className="rotate-45"
              size="w-[30px] h-[30px]"
              dotted={false}
            />
            <span className="absolute left-[20px] scale-[0.6] rotate-180">
              &#x25B6;
            </span>
            Take the Test
          </Button>
        </div>
      </div>
    </>
  );
};

export default Hero;
