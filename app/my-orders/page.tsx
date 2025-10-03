"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
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
import { assets } from "@/assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setShippingDetails } from "@/store/cartSlice";
import SignIn from "@/components/SignIn";

const page = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const dispatch = useDispatch();

  const { cartItems, products, shippingDetails } = useSelector(
    (state: RootState) => state.cart
  );
 
  const CartList = Object.entries(cartItems)
    .map(([productId, quantity]: [string, number]) => {
      const product = products.find((p) => p._id === productId);
      return product ? { ...product, quantity } : null;
    })
    .filter(Boolean);

  return (
    <section className="min-h-screen flex flex-col">
       <Navbar setShowSignIn={setShowSignIn} showSignIn={showSignIn} />
         {
        showSignIn && <SignIn setShowSignIn={setShowSignIn} showSignIn={showSignIn} />
      }
      <main className="flex-grow">
        <div className="lg:px-32 md:px-16 px-6 mt-8">
          <h3 className=" border-b py-4 md:py-8"> My Orders</h3>
          {
            CartList.length > 0
            ?   <Table noContainerBorder>
           
              {CartList.map((product) => (
                 <TableBody key={product?._id}>
                  <TableRow >
                    <TableCell className="w-1/2 ">
                      <div className="flex items-center gap-4 mt-5 ">
                        <Image
                          src={assets.box_icon}
                          alt="box-icon"
                          width={70}
                          height={30}
                        />
                        <span className="font-medium flex flex-col gap-4">
                          <p className="font-medium text-base">
                            {product?.name}
                          </p>
                          <p> Items: {product?.quantity}</p>
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="w-1/6">
                      {shippingDetails.length > 0 && (
                        <div className="flex flex-col gap-1">
                          <p className="font-medium ">
                            {shippingDetails[0].fullname}
                          </p>
                          <p>{shippingDetails[0].address}</p>
                          <p>{shippingDetails[0].city}</p>
                          <p>{shippingDetails[0].city}</p>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="w-1/6 font-medium">
                      ${product?.price}
                    </TableCell>
                    <TableCell className="w-1/6">
                      <div className="flex flex-col gap-1">
                        <p>Method: COD</p>
                        <p>Date: 29/10/2025</p>
                        <p>Payment: Pending</p>
                      </div>
                    </TableCell>
                  </TableRow>
               </TableBody>
              ))}
           
          </Table>
            : <h1 className=" mt-2 md:mt-4"> You have not made any purchase yet.</h1>
          }
        
        </div>
      </main>

      <Footer />
    </section>
  );
};

export default page;
