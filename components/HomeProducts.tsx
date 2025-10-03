"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setProducts } from "@/store/cartSlice";
import { productsDummyData } from "@/assets/assets";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

const HomeProducts = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts(productsDummyData));
  }, [dispatch]);

  const products = useSelector((state: RootState) => state.cart.products);

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-[1.5rem] text-left w-full font-medium mb-[1.2rem] mt-[3rem]">
        Popular Products
      </h1>

      <div className="lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 grid gap-6 w-full px-auto">
        {products.length > 0 ? (
          <>
            {products.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </>
        ) : (
          Array.from({length:10}).map((_,index)=> <Skeleton key={index}
          className="h-40 w-full"
          />)
        )}
      </div>

      <Button
        onClick={() => {
          router.push("/all-products");
        }}
        className=" bg-transparent hover:bg-slate-50/90 transition my-[1.5rem] md:my-[3rem] text-gray-500/70 cursor-pointer border-gray-300 border-1 rounded-[.5rem] py-[1rem] md:py-[1.5rem] px-[2rem] md:px-[3.5rem]"
      >
        {" "}
        See More
      </Button>
    </section>
  );
};

export default HomeProducts;
