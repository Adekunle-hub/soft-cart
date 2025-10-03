import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const Banner = () => {
  return <section className="w-full pl-0 md:pl-[6rem] rounded-[1rem] my-[3rem] py-[1rem] md:py-0 overflow-hidden flex bg-[#E6E9F2] items-center justify-center flex-col md:flex-row">
    <div>
        <Image
        src={assets.jbl_soundbox_image}
        alt="jbl-soundbox-image"
         width={250}
        height={300}
       
        />
    </div>
    <div className="text-center flex items-center flex-col">
        <h1 className="text-[1.8rem] max-w-[290px]  text-center font-semibold">Level Up Your Gaming Experience</h1>
        <p className="max-w-[340px] text-gray-800/60 font-medium ">
            From immersive sound to precise controls—everything you need to win
        </p>
        <Button className=" px-[3.5rem] group cursor-pointer  py-[1.5rem] mt-[1.5rem] text-[1rem] text-white">
             Buy now <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon_white} alt="redirect" />
        </Button>
    </div>
    
    <div>
        <Image
        
        src={assets.md_controller_image}
        alt="controller"
         width={350}
        height={500}
        className="hidden md:block"
        />
         <Image
         className="block md:hidden"
        src={assets.sm_controller_image}
        alt="controller"
         width={350}
        height={300}/>
    </div>
  </section>;
};

export default Banner;
