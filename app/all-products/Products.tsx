"use client"
import React, { useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { setProducts } from "@/store/cartSlice";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { productsDummyData } from "@/assets/assets";


const Products = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setProducts(productsDummyData))
    },[dispatch])

    const products = useSelector((state:RootState)=> state.cart.products)
  return (
    <section className="flex flex-col lg:px-32 md:px-16 px-8  ">
      <div className="flex flex-col mt-[2rem] mb-[1rem] md:my-[2.2rem] items-end w-[8rem] justify-start  ">
        <h1 className="text-2xl font-medium ">All Products</h1>
        <div className="h-0.5 w-16 text-right bg-primary"></div>
      </div>
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
    </section>
  );
};

export default Products;
