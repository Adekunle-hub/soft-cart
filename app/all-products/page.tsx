import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import Products from "./Products";

const page = () => {
  return (
    <>
      <Navbar />
      <Products/>

      <Footer />
    </>
  );
};

export default page;
