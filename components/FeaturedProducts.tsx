import Image from "next/image";
import React from "react";
import { assets } from "@/assets/assets";
import { Button } from "./ui/button";

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

const FeaturedProducts = () => {
  return (
    <section>
      <div className=" flex flex-col items-center justify-center ">
        <h1 className=" text-[1.4rem] md:text-[1.8rem] font-medium ">Featured Products</h1>
        <div className="bg-primary w-29 h-0.5"></div>
      </div>

      <main className="grid sm:grid-cols-1 md:grid-cols-3 items-center md:px-12 my-[1rem] sm:my-[2rem] md:my-[3rem] justify-center gap-[1.8rem] ">
         {products.map((product, index) => (
          <div key={index} className="group  w-[100%] relative md:w-fit ">
            <Image
              src={product.image}
              alt={product.title}
              width={350}
              height={150}
              quality={100}
              className="group-hover:brightness-75 object-contain transition"
            />
            <div className="group-hover:-translate-y-4 transition text-white pr-2 absolute bottom-[2rem] left-6">
              <h1 className="text-[1.5rem] font-medium sm:text-1.2rem">
                {product.title}
              </h1>
              <p className="font-light">{product.description}</p>
              <Button className="mt-[10px] cursor-pointer rounded-[3px] px-[1rem] flex items-center">
                {" "}
                Buy now <Image src={assets.redirect_icon} alt="redirect" />
              </Button>
            </div>
            </div>
        ))}

      </main>
       
    
    </section>
  );
};

export default FeaturedProducts;
