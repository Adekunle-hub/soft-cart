"use client";
import { assets, orderDummyData1 } from "@/assets/assets";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState } from "@/store";
import { setOrders } from "@/store/cartSlice";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setOrders(orderDummyData1));
  }, []);
  const orders = useSelector((state: RootState) => state.cart.orders);

  return (
    <section>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20rem]">Orders</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={index} className="w-[20rem]">
              <TableCell className="font-medium flex gap-4">
                <Image
                  src={order.items[0].product.image[0]}
                  alt="earp"
                  width={30}
                  height={30}
                />
                {order.items[0].product.name}
              </TableCell>

              <TableCell>{order.date}</TableCell>
              <TableCell>{order.userName}</TableCell>
              <TableCell>
                <div
                  className={`py-1 px-1 rounded-md text-xs flex items-center justify-center bg-green-100 text-green-600/90 font-medium
                  ${
                    order.paymentStatus === "unpaid"
                      ? "bg-purple-100 text-purple-600/90"
                      : ""
                  }
                  `}
                >
                  {order.paymentStatus}
                </div>
              </TableCell>

              <TableCell>
                <div
                  className={`py-1 px-1 rounded-md text-xs flex items-center justify-center bg-orange-100 text-orange-600/90 font-medium
                 ${
                   order.status === "Delivered"
                     ? "!bg-green-100 !text-green-600/90"
                     : ""
                 }
                  ${
                    order.status === "Shipping"
                      ? "bg-purple-100 text-purple-600/90"
                      : ""
                  }
                 
                  `}
                >
                  {order.status}
                </div>
              </TableCell>
              <TableCell className="text-xs font-medium">${order.items[0].product.offerPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default page;
