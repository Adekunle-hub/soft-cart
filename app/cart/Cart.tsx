"use client";
import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState } from "@/store";
import { removeFromCart, updateCartQuantity } from "@/store/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const { cartAmount, cartItems, products } = useSelector(
    (state: RootState) => state.cart
  );

  const router = useRouter();
  const dispatch = useDispatch();
  const [cartQuantity, setCartQuantity] = useState(cartAmount);

  return (
    <section className="flex-1 w-full ">
      <div className="flex items-center justify-between border-b-1 border-gray-300 pb-6">
        <h1>
          {" "}
          Your <span>Cart</span>
        </h1>
        <p className="text-[1.3rem]">
          {cartAmount > 1 ? `${cartAmount} items` : `${cartAmount} item`}
        </p>
      </div>
      <div className="mt-[3rem] mb-[1rem]">
        <Table noContainerBorder>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2 text-sm p-2 md:text-base">
                Product Details
              </TableHead>
              <TableHead className="w-1/3 text-sm md:text-base p-2">
                Price
              </TableHead>
              <TableHead className="w-1/3 text-sm md:text-base p-2">
                Quantity
              </TableHead>
              <TableHead className="w-1/3 text-sm md:text-base p-2">
                Subtotal
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cartAmount === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="mt-4 text-base">
                  No Item in Cart
                </TableCell>{" "}
              </TableRow>
            ) : (
              Object.entries(cartItems).map(([productId, quantity]) => {
                const product = products.find((p) => p._id === productId);
                if (!product) return null;
                return (
                  <TableRow key={product._id} className="hover:!bg-white">
                    <TableCell className="w-1/2 text-sm p-2  md:text-base">
                      <div className="flex items-center gap-4">
                        <Image
                          src={product.image[0]}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="p-4 bg-gray-500/10 rounded-lg"
                        />
                        <span>
                          <h4> Play station</h4>
                          <p
                            onClick={() =>
                              dispatch(removeFromCart(product._id))
                            }
                            className="text-primary text-xs cursor-pointer"
                          >
                            Remove
                          </p>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="w-1/3 text-sm md:text-base p-2">
                      ${product.price}
                    </TableCell>
                    <TableCell className=" w-auto text-sm md:text-base p-2">
                      <div className="flex items-center gap-1  w-auto">
                        <input
                          type="number"
                          placeholder="1"
                          value={quantity}
                          min={0}
                          className="w-8 outline-none"
                          onChange={(e) => {
                            const newQty = Number(e.target.value);
                            if (newQty === 0) {
                              dispatch(removeFromCart(product._id));
                            } else {
                              dispatch(
                                updateCartQuantity({
                                  id: product._id,
                                  quantity: newQty,
                                })
                              );
                            }
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="w-1/3 text-sm md:text-base p-2">
                      ${(product.price * quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      <Button
        onClick={() => router.push("/all-products")}
        className="bg-white group hover:bg-white  cursor-pointer text-primary "
      >
        {" "}
        <Image
          src={assets.arrow_right_icon_colored}
          alt="redirect"
          className="group-hover:-translate-x-1 transition group-hover:w-4 "
        />
        Continue shopping
      </Button>
    </section>
  );
};

export default Cart;
