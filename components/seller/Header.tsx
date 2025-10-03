"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <section className="flex items-center z-50 justify-between border-b h-16 w-full lg:px-8 px-4 py-[.8rem]">
      <Image
        className="cursor-pointer"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
        width={130}
        height={90}
      />

      <Button className="bg-gray-600 text-white text-xs sm:text-sm rounded-full px-[2rem]">
        Log out
      </Button>
    </section>
  );
};

export default Header;
