"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { setShippingDetails } from "@/store/cartSlice";
import { RootState } from "@/store";
import AddressAlert from "@/components/AddressAlert";
import { useRouter } from "next/navigation";

const page = () => {
  const initialFormData = {
    fullname: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
  };
  const [formdata, setFormData] = useState(initialFormData);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const isFormIncomplete = Object.values(formdata).some(
    (value) => value.trim() === ""
  );

  useEffect(() => {
    if (showAlert) {
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showAlert]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setShippingDetails(formdata));
    setShowAlert(true);
    setFormData(initialFormData);
    setTimeout(() => {
      router.push("/cart");
    }, 3100);
  };

  const newShippingDetails = useSelector(
    (state: RootState) => state.cart.shippingDetails
  );

  return (
    <section>
      {showAlert && <AddressAlert />}
      <Navbar />
      <main className="lg:px-32 flex gap-y-[3rem] md:flex-row flex-col justify-between md:px-16 px-6 mt-14 ">
        <div>
          <h1 className="lg:text-3xl text-gray-500 md:text-2xl  mb-8">
            {" "}
            Add Shipping{" "}
            <span className="text-primary font-semibold"> Address</span>
          </h1>
          <form
            onSubmit={handleSubmit}
            className="max-w-md flex flex-col gap-4"
          >
            <Input
              placeholder="Full Name..."
              value={formdata.fullname}
              required
              onChange={(e) =>
                setFormData({ ...formdata, fullname: e.target.value })
              }
              className="rounded-none text-gray-500 font-medium py-3 border border-gray-500/30 focus:!border-orange-500 "
            />
            <Input
              placeholder="Phone Number"
              value={formdata.phone}
              onChange={(e) =>
                setFormData({ ...formdata, phone: e.target.value })
              }
              className="rounded-none text-gray-500 font-medium py-3 border border-gray-500/30 focus:!border-orange-500 "
            />
            <Input
              placeholder="Pin code"
              value={formdata.pincode}
              onChange={(e) =>
                setFormData({ ...formdata, pincode: e.target.value })
              }
              className="rounded-none text-gray-500 font-medium py-3 border border-gray-500/30 focus:!border-orange-500 "
            />
            <textarea
              placeholder="Address(Area and Street)"
              rows={3}
              value={formdata.address}
              onChange={(e) =>
                setFormData({ ...formdata, address: e.target.value })
              }
              className="rounded-none text-gray-500 font-medium py-3 px-2 resize-none border border-gray-500/30 focus:!border-orange-500  focus:outline-none"
            ></textarea>
            <div className="flex items-center gap-4">
              <Input
                placeholder="City/District/Town"
                value={formdata.city}
                onChange={(e) =>
                  setFormData({ ...formdata, city: e.target.value })
                }
                className="rounded-none !text-gray-500 !font-medium py-3 border border-gray-500/30 focus:!border-orange-500 "
              />
              <Input
                placeholder="State"
                value={formdata.state}
                onChange={(e) =>
                  setFormData({ ...formdata, state: e.target.value })
                }
                className="rounded-none text-gray-500 font-medium py-3 border border-gray-500/30 focus:!border-orange-500 "
              />
            </div>

            <Button
              size="soft"
              type="submit"
              disabled={isFormIncomplete}
              className="text-white py-3 cursor-pointer text-[1rem] rounded-none"
            >
              Save Address
            </Button>
          </form>
        </div>

        <Image
          src={assets.my_location_image}
          alt="my-location-image"
          height={400}
          width={400}
        />
      </main>

      <Footer />
    </section>
  );
};

export default page;
