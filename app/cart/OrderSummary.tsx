"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {  useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";


const OrderSummary = () => {
  const [Address, setAddress] = useState<string>("");
  const [showAddressOption, setShowAddressOption] = useState(false);
  const router = useRouter();
  const shippingAddress = useSelector(
    (state: RootState) => state.cart.shippingDetails
  );

  useEffect(() => {
    if (shippingAddress.length > 0) {
      const add = shippingAddress[0];
      setAddress(`${add.fullname}, ${add.address}, ${add.city}, ${add.state}`);
    }
  }, [shippingAddress]);

  const { cartItems, products, cartAmount } = useSelector(
    (state: RootState) => state.cart
  );

  const subtotal = Object.entries(cartItems).reduce(
    (total, [productId, quantity]) => {
      const product = products.find((p) => p._id === productId);
      return total + (product ? product.price * quantity : 0);
    },
    0
  );

  const taxRate = 0.02;
  const tax = subtotal * taxRate;
  const total = tax + subtotal;

  const checkCart = () => {
    if (cartAmount === 0) {
      alert("Cart is empty");
    }
     else if (!Address.trim()) {
      alert("No Deliver Address!");
    }
     else if (cartAmount > 0 && Address.trim()) {
      router.push("/order-placed");
    }
 
  };

  return (
    <main className="w-full md:w-96 bg-gray-500/5 p-4">
      <h3 className="text-2xl md:text-[1.5rem] font-medium border-b border-gray-300 pb-[1rem]">
        Order summary
      </h3>
      <section className="py-5 flex flex-col gap-4  ">
        <div className=" ">
          <label className="py-3 ">SELECT ADDRESS</label>
          <div className="flex relative items-center justify-between flex-col gap-2 ">
            <Button
              onClick={() =>
                setShowAddressOption((prevAddress) => !prevAddress)
              }
              className="bg-white flex py-3 cursor-pointer rounded-none flex-1 border-1 border-gray-300 w-[100%] justify-between hover:bg-white"
            >
              <span>{Address}</span>
              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 
                    ${showAddressOption ? "rotate-0" : "-rotate-90"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
                onClick={() =>
                  setShowAddressOption((prevAddress) => !prevAddress)
                }
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
            <>
              {showAddressOption ? (
                <div className="flex flex-col absolute top-[3rem] shadow-2xl bg-white   w-full gap-1 rounded-none">
                  {shippingAddress.map((add, index) => (
                    <p
                      key={index}
                      onClick={() => {
                        setAddress(
                          `${add.fullname}, ${add.address}, ${add.city}, ${add.state}`
                        );
                        setShowAddressOption(!showAddressOption);
                      }}
                      className="text-left hover:bg-gray-500/10 !p-2 w-full"
                    >
                      {`${add.fullname}, ${add.address}, ${add.city}, ${add.state}`}
                    </p>
                  ))}

                  <Button
                    size="soft"
                    onClick={() => router.push("add-address")}
                    className="bg-white cursor-pointer hover:bg-gray-500/10 rounded-none "
                  >
                    +Add New Address
                  </Button>
                </div>
              ) : (
                ""
              )}
            </>
          </div>
        </div>
        <div>
          <label className="py-3">PROMO CODE</label>
          <Input
            placeholder="Enter your promo code"
            className="bg-white hover:bg-white rounded-none py-3"
          />
        </div>
        <Button className="mt-3 cursor-pointer rounded-none text-white !px-8 flex items-center text-[1rem] py-2">
          Apply
        </Button>
      </section>
      <section>
        <Table noContainerBorder>
          <TableHeader>
            <TableRow></TableRow>
          </TableHeader>

          <TableBody className="text-gray-600  text-base">
            <TableRow className="border-t-1 border-gray-500/30 border-b-0">
              <TableCell className="">Price</TableCell>
              <TableCell className="text-right font-medium">
                ${subtotal.toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow className="border-t-2 border-red-600 border-0">
              <TableCell className="">Shipping Fee</TableCell>
              <TableCell className="text-right font-medium">Free</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="">Tax(2%)</TableCell>
              <TableCell className="text-right font-medium">
                ${tax.toFixed(2)}
              </TableCell>
            </TableRow>

            <TableRow className="text-[1.2rem]">
              <TableCell className="font-medium ">Total</TableCell>
              <TableCell className="text-right font-medium">
                ${total.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          onClick={checkCart}
          className="text-white w-full rounded-none text-[1rem] cursor-pointer"
        >
          Place order
        </Button>
      </section>
    </main>
  );
};

export default OrderSummary;
