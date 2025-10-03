"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import "../app/globals.css";
import Hero from "@/components/Hero";

import HomeProducts from "@/components/HomeProducts";
import FeaturedProducts from "@/components/FeaturedProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import Footer from "@/components/Footer";
import SignIn from "@/components/SignIn";

const HomePage = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  return (
    <>
      <Navbar setShowSignIn={setShowSignIn} showSignIn={showSignIn} />
      {
        showSignIn && <SignIn setShowSignIn={setShowSignIn} showSignIn={showSignIn} />
      }
      
      <div className="lg:px-32 md:px-16 px-6">
        <Hero />
        <HomeProducts />
        <FeaturedProducts />
        <Banner />
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
