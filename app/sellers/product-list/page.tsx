"use client";
import React, { useEffect } from "react";
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
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { assets, productsDummyData } from "@/assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/store/cartSlice";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";

const socialMedia = [
  {
    id: 1,
    icon: assets.facebook_icon,
    alt: "facebook",
  },
  {
    id: 2,
    icon: assets.twitter_icon,
    alt: "X",
  },
  {
    id: 3,
    icon: assets.instagram_icon,
    alt: "instagram",
  },
];

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setProducts(productsDummyData));
  }, []);

  const products = useSelector((state: RootState) => state.cart.products);
  if (products.length === 0) {
    return <Loading />;
  }

  return (
    <section>
      <h1 className="my-[1rem]">All Products</h1>

      <Table className=" ">
        <TableHeader>
          <TableRow className="">
            <TableHead className="w-2/3 md:w-2/5">Products</TableHead>
            <TableHead className="hidden md:block">Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="hidden md:block">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, id) => (
            <TableRow key={id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-500/20 p-2 flex items-center justify-center rounded w-18 h-15">
                    <Image
                      src={product.image[0]}
                      alt={product.name}
                      width={40}
                      height={40}
                    />
                  </div>

                  <p className="text-sm truncate  max-w-[4rem] sm:w-[6rem] md:max-w-full md:flex-1">
                    {product.name}
                  </p>
                </div>
              </TableCell>
              <TableCell className="hidden md:block">
                {product.category}
              </TableCell>
              <TableCell>${product.offerPrice}</TableCell>
              <TableCell className="hidden md:block">
                <Link href={`/product/${product._id}`}>
                  <Button className="text-white cursor-pointer bg-orange-600 text-sm">
                    Public View{" "}
                    <Image
                      src={assets.redirect_icon}
                      alt=""
                      width={15}
                      height={30}
                    />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <footer className="flex items-center gap-[1rem]  mt-[2rem]">
        <Image
          className="cursor-pointer border-r-1 pr-[1rem]"
          onClick={() => router.push("/")}
          src={assets.logo}
          alt="logo"
          width={130}
          height={90}
        />
        <div className="flex items-center w-full justify-between">
          <p>Copyright 2025 © greatstack.dev All Right Reserved.</p>
          <div className="flex gap-2">
            {socialMedia.map((app, index) => (
              <Button
                className="bg-transparent hover:bg-transparent cursor-pointer p-0 m-0"
                key={index}
              >
                <Image src={app.icon} alt={app.alt} />
              </Button>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
};

export default page;
