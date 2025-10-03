"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import Products from "./Products";
import SignIn from "@/components/SignIn";

const page = () => {
    const [showSignIn, setShowSignIn] = useState(false);
  return (
    <>
      <Navbar setShowSignIn={setShowSignIn} showSignIn={showSignIn} />
         {
        showSignIn && <SignIn setShowSignIn={setShowSignIn} showSignIn={showSignIn} />
      }
      <Products/>

      <Footer />
    </>
  );
};

export default page;
