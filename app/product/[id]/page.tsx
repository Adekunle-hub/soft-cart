"use client";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import HomeProducts from "@/components/HomeProducts";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Product from "./Product";
import WebAlert from "@/components/WebAlert";
import SignIn from "@/components/SignIn";

const page = () => {
  const [showSignIn, setShowSignIn] = useState(false)
  const param = useParams();
  const id = param.id;
  return (
    <section>
   <Navbar setShowSignIn={setShowSignIn} showSignIn={showSignIn} />
         {
        showSignIn && <SignIn setShowSignIn={setShowSignIn} showSignIn={showSignIn} />
      }
      <WebAlert />
      <div className="flex flex-col lg:px-32 md:px-16 px-8">
        <Product />
        <HomeProducts />
      </div>
      <Footer />
    </section>
  );
};

export default page;
