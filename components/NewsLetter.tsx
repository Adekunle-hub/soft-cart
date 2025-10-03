import React from "react";
import { Button } from "./ui/button";

const NewsLetter = () => {
  return (
    <section className="flex items-center justify-center flex-col mt-[5rem]">
      <h1 className="text-[1.5rem] md:text-[2.4rem] font-medium">Subscribe now & get 20% off</h1>
      <p className="md:text-base text-sm text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <div className="flex mt-[1.4rem] md:h-14 h-12 w-full md:w-[40rem] justify-between items-center ">
        <input type="email" placeholder="Enter your email id" className="border w-full border-gray-300/60 px-2  outline-none rounded-[4px] rounded-r-none h-full text-gray-500 "/>
        <Button className="text-white text-[1rem] cursor-pointer py-[1rem] px-[1rem] md:px-[3rem] rounded-[4px] rounded-l-none h-full">Subscribe</Button>
      </div>
    </section>
  );
};

export default NewsLetter;
