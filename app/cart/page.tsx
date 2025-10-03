"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import OrderSummary from "./OrderSummary";
import SignIn from "@/components/SignIn";

const page = () => {
    const [showSignIn, setShowSignIn] = useState(false);
  return (
    <section>
     <Navbar setShowSignIn={setShowSignIn} showSignIn={showSignIn} />
         {
        showSignIn && <SignIn setShowSignIn={setShowSignIn} showSignIn={showSignIn} />
      }
      
      <div className="flex gap-[4rem] py-4 items-start flex-col md:flex-row justify-between mt-[4rem] lg:px-32 md:px-16 px-8">
        <Cart />
        <OrderSummary />
      </div>
    </section>
  );
};

export default page;
