"use client";
import { assets, productsDummyData } from "@/assets/assets";
import { RootState } from "@/store";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  addAlert,
  addToCart,
  clearAlert,
  setProducts,
  setShowAlert,
} from "@/store/cartSlice";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import WebAlert from "@/components/WebAlert";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { useRouter } from "next/navigation";

const Product = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const param = useParams();
  const id = param.id;
  const userStatus = useSelector((state: RootState) => state.cart.userLoggedIn);

  useEffect(() => {
    dispatch(setProducts(productsDummyData));
  }, []);

  useEffect(()=>{
    dispatch(clearAlert())
  },[dispatch])
  const products = useSelector((state: RootState) => state.cart.products);

  const product = products.find((p) => p._id === id)!;

  return (
    <section className="mt-[2rem] md:mt-[4rem] flex flex-col md:flex-row justify-start gap-[2rem] sm:gap-[4rem] md:gap-[8rem] items-start md:pl-[4rem] pl-0">
      {products.length === 0 ? (
        <>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column – main image & thumbnails */}
            <div className="flex flex-col">
              {/* Main image box */}
              <Skeleton className="p-[3rem] rounded-md relative bg-gray-200 w-full md:w-[18rem] h-[18rem]" />

              {/* Thumbnails */}
              <div className="flex gap-2 mt-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="w-20 h-[70px] rounded-md bg-gray-200"
                  />
                ))}
              </div>
            </div>

            {/* Right column – details */}
            <article className="max-w-md flex-1">
              {/* Product name */}
              <Skeleton className="h-8 w-3/4 mb-3" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-4 w-4" />
                ))}
                <Skeleton className="h-4 w-10 ml-2" />
              </div>

              {/* Description */}
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-4" />

              {/* Price */}
              <div className="flex gap-3 mt-4 items-center">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>

              {/* Table rows */}
              <div className="border-t border-gray-300 mt-6 pt-4 space-y-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-8">
                <Skeleton className="h-12 w-1/2" />
                <Skeleton className="h-12 w-1/2" />
              </div>
            </article>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="p-[3rem] flex flex-col rounded-md relative bg-gray-500/10 mix-blend-multiply w-full md:w-[18rem] h-[18rem]">
              <Image
                src={product.image[0]}
                alt={product.name}
                width={288}
                height={288}
                className="object-contain"
              />
            </div>
            <div className="flex gap-2 mt-4">
              {product.image?.length >= 1 &&
                product.image.slice(0).map((img, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-500/10 rounded-md cursor-pointer overflow-hidden "
                  >
                    <Image
                      src={img}
                      alt={`${product.name} extra image ${idx + 1}`}
                      width={80}
                      height={70}
                      className="object-contain mix-blend-multiply "
                    />
                  </div>
                ))}
            </div>
          </div>

          <article className="max-w-md">
            <h1 className=" text-[1.7rem] md:text-[2rem] font-medium">
              {product.name}
            </h1>
            <span className="flex items-center gap-1 sm:mt-3 mt-2 md:mt-4 mb-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  key={index}
                  className="h-4 w-4"
                  src={
                    index < Math.floor(4)
                      ? assets.star_icon
                      : assets.star_dull_icon
                  }
                  alt="star"
                />
              ))}
              <p className="!mx-1">(4.5)</p>
            </span>
            <p>{product.description}</p>
            <div className="flex items-baseline-last p-0 gap-3 mt-[1rem]">
              <p className="text-[2rem] font-medium">${product.offerPrice}</p>
              <p className="text-[1rem] text-gray-800/60 line-through">
                {product.price}
              </p>
            </div>
            <div className="border-t-1 border-gray-300 mt-[1rem] pt-[1rem]">
              <Table noContainerBorder>
                <TableBody>
                  <TableRow className="!border-none hover:bg-transparent ">
                    <TableCell className="text-gray-600 w-[10rem] font-medium">
                      Brand
                    </TableCell>
                    <TableCell className="text-gray-500/80 ">Generic</TableCell>
                  </TableRow>
                  <TableRow className="!border-none hover:bg-transparent">
                    <TableCell className="text-gray-600 font-medium">
                      Color
                    </TableCell>
                    <TableCell className="text-gray-500/80">Multi</TableCell>
                  </TableRow>
                  <TableRow className="!border-none hover:bg-transparent">
                    <TableCell className="text-gray-600 font-medium">
                      Category
                    </TableCell>
                    <TableCell className="text-gray-500/80">
                      {product.category}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="flex gap-3 mt-[2rem]">
              <Button
                size="soft"
                onClick={() => {
                  if (userStatus) {
                    dispatch(addToCart(product._id));
                    dispatch(addAlert("✅ Item added to cart"));
                  } else {
                    dispatch(addAlert("⚠️ Please Login"));
                  }
                }}
                className="flex-1/2 transition cursor-pointer text-gray-800/80 hover:bg-gray-200 bg-gray-100 rounded-none !py-4"
              >
                Add to Cart
              </Button>
              <Button
                onClick={() => {
                  if (userStatus) {
                    dispatch(addToCart(product._id))
                    router.push("/cart");
                  } else {
                    dispatch(addAlert("⚠️ Please Login"));
                  }
                }}
                size="soft"
                className="flex-1/2 text-white cursor-pointer bg-orange-500 hover:bg-orange-600 transition rounded-none !py-4 "
              >
                Buy now
              </Button>
            </div>
          </article>
        </>
      )}
    </section>
  );
};

export default Product;
