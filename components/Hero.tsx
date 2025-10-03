"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import { Button } from "./ui/button";
import Image, { StaticImageData } from "next/image";
import SignIn from "./SignIn";

interface HeroData {
  id: number;
  title: string;
  offer: string;
  buttonText1: string;
  buttonText2: string;
  imgSrc: string | StaticImageData;
  alt: string;
}
const heroData: HeroData[] = [
  {
    id: 1,
    title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
    offer: "Limited Time Offer 30% Off",
    buttonText1: "Buy Now",
    buttonText2: "Find More",
    imgSrc: assets.header_headphone_image,
    alt: "Headphone",
  },
  {
    id: 2,
    title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
    offer: "Hurry up only few lefts!",
    buttonText1: "Shop Now",
    buttonText2: "Explore Deals",
    imgSrc: assets.header_playstation_image,
    alt: "Playstation",
  },
  {
    id: 3,
    title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
    offer: "Exclusive Deal 40% Off",
    buttonText1: "Order Now",
    buttonText2: "Learn More",
    imgSrc: assets.header_macbook_image,
    alt: "Macbook",
  },
];

const Hero = () => {
  const initialIndex = 1;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleIndex = (currentIndex: number) => {
    setCurrentIndex(currentIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < heroData.length ? prevIndex + 1 : initialIndex
      );
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>

      <main className="overflow-hidden w-full ">
     
              
        <div
          className="flex transition-transform duration-600 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex - 1) * 100}%)`,
          }}
        >
          {heroData.map((item) => {
            return (
              <section
                key={item.id}
                className="bg-[#E6E9F2] rounded-[1rem] flex items-center  md:flex-row flex-col justify-between px-5 md:px-20 mt-6  md:min-h-[70dvh] min-w-full  py-8 md:py-[3rem] "
              >
                <div className="flex flex-col md:order-1 order-2  gap-1 md:gap-[.7rem] ">
                  <p className="text-primary m-0 p-0">{item.offer}</p>
                  <h1 className="text-2xl md:text-[3rem] font-semibold leading-[1.8rem] md:leading-[3rem] text-gray-700 text-[1.7rem]">
                    {item.title}
                  </h1>
                  <span className="mt-[1rem] flex items-center gap-2 ">
                    <Button className="text-white cursor-pointer rounded-[1rem] px-[2.5rem] font-semibold">
                      {item.buttonText1}
                    </Button>
                    <Button className=" group text-gray-900 cursor-pointer bg-transparent flex items-center font-semibold hover:bg-transparent">
                      {item.buttonText2}
                      <Image
                        src={assets.arrow_icon}
                        alt="arrow-icon"
                        className="group-hover:translate-x-1 transition"
                      />
                    </Button>
                  </span>
                </div>
                <div className="relative  md:order-2 md:mb-[3rem] flex items-center  lg:w-[38rem] w-[15rem] h-[20rem]">
                  <Image
                    src={item.imgSrc}
                    alt={item.alt}
                    fill
                    quality={100}
                    className="object-contain"
                  />
                </div>
              </section>
            );
          })}
        </div>

        <div className="flex items-center justify-center mt-8 gap-2">
          {heroData.map((item) => {
            return (
              <div
                onClick={() => handleIndex(item.id)}
                key={item.id}
                className={`h-2 w-2 rounded-full cursor-pointer
                ${item.id === currentIndex ? "bg-primary" : "bg-gray-500/30"}
                `}
              ></div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Hero;
