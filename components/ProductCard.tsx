"use client";
import React, { useState } from "react";
import { productsDummyData } from "@/assets/assets";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: (typeof productsDummyData)[0];
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  return (
    <section
      onClick={() => {
        router.push("/product/" + product._id);
      }}
      className="max-h-[20rem] group  max-w-[11rem]"
    >
      <div className=" rounded-[.5rem] relative bg-[#E6E9F2]">
        <div className="bg-white w-6 h-6 absolute right-2 cursor-pointer top-2 rounded-full flex items-center justify-center">
          <Image src={assets.heart_icon} alt="favorite" />
        </div>

        <Image
          src={product.image[0]}
          alt={product.name}
          height={200}
          className="group-hover:scale-105 transition cursor-pointer object-cover w-4/5 h-4/5 md:w-full md:h-full"
          width={200}
        />
      </div>
      <div className="flex flex-col gap-[3px]">
        <h3 className="md:text-base font-medium  pt-2 w-full truncate">
          {product.name}
        </h3>
        <p className="truncate text-[13px]">{product.description}</p>

        <div className="flex -mt-1 items-center gap-[5px]">
          <h5>4.5</h5>
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              className="h-3 w-3"
              src={
                index < Math.floor(4) ? assets.star_icon : assets.star_dull_icon
              }
              alt="star"
            />
          ))}
        </div>

        <span className="flex items-center  justify-between">
          <p className="text-base font-medium">${product.offerPrice}</p>
          <Button 
          
          className="bg-transparent max-sm:hidden cursor-pointer hover:bg-slate/50 border-1 rounded-full text-xs">
            {" "}
            Buy Now
          </Button>
        </span>
      </div>
    </section>
  );
};

export default ProductCard;
