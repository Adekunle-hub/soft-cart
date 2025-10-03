"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { RootState } from "@/store";

interface signInProps {
  showSignIn: boolean;
  setShowSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<signInProps> = ({ showSignIn, setShowSignIn }) => {
  const dispatch = useDispatch();
  const { cartAmount, cartItems } = useSelector(
    (state: RootState) => state.cart
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const totalItemsInCart = Object.values(cartItems).reduce((a, b) => a + b, 0);

  const router = useRouter();
  const navbar = ["Home", "Shop", "About Us", "Contact"];
  return (
    <nav className="flex items-center gap-[1.5rem] md:px-16 lg:px-32 border-b border-gray-300 text-gray-700 px-6 py-3 justify-between">
      <div className="text-xl text-green-900 cursor-pointer">
        <Image
          src={assets.logo}
          alt="logo"
          onClick={() => router.push("/")}
          className="w-28 md:w-30"
        />
      </div>
      <div className=" hidden md:flex items-center justify-center gap-[1rem]">
        {navbar.map((item, index) => (
          <Link
            className="hover:text-gray-900 text-[.9rem] lg:text-[1rem] transition"
            href={item === "Shop" ? "/all-products" : "/"}
            key={index}
          >
            {item}
          </Link>
        ))}
        <Link href={"/sellers"} prefetch>
          <Button
            size={"soft"}
            className="bg-white hover:text-gray-900  transition cursor-pointer hover:bg-white text-gray-700 border-1 rounded-[2rem] text-xs "
          >
            Seller Dashboard
          </Button>
        </Link>
      </div>

      <div className="flex md:hidden items-center gap-2 bg-transparent text-gray-700 hover:bg-transparent hover:text-gray-900 transition">
        {user ? (
          <Button
            onClick={() => setShowSignIn((prev) => !prev)}
            size="soft"
            className=" text-base flex cursor-pointer items-center justify-center bg-primary text-white w-8 h-8 rounded-[100%]"
          >
            {
              user.email.split("@")[0][0].toUpperCase()}
          </Button>
        ) : (
          <Button
            size="soft"
            onClick={() => setShowSignIn((prev) => !prev)}
            className="bg-transparent hover:bg-transparent"
          >
            <Image src={assets.user_icon} alt="user icon" />
          </Button>
        )}
      </div>

      <ul className="hidden  md:flex items-center justify-center gap-2">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        <div className="relative mt-1 cursor-pointer rounded-full w-6 h-6 flex items-center justify-center">
          <Image
            className="w-4 h-4 "
            onClick={() => router.push("/cart")}
            src={assets.cart_icon}
            alt="cart"
          />
          <span className="absolute rounded-full flex items-center justify-center  bg-primary -top-1 -right-1 text-[10px] text-white font-medium h-4 w-4">
            {totalItemsInCart}
          </span>
        </div>

        <Button
          size={"soft"}
          className="flex items-center gap-2 cursor-pointer bg-transparent text-gray-700 hover:bg-transparent hover:text-gray-900 transition"
          onClick={() => setShowSignIn((prev) => !prev)}
        >
          {user ? (
            <span className=" text-base flex items-center justify-center bg-primary text-white w-8 h-8 rounded-[100%]">
              {
                user.email.split("@")[0][0].toUpperCase()}
            </span>
          ) : (
            <>
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </>
          )}
        </Button>
      </ul>
    </nav>
  );
};

export default Navbar;
