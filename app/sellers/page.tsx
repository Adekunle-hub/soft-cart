"use client";
import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [category, setCategory] = useState("Earphone");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const updatedFiles = [...files];
    updatedFiles[index] = e.target.files[0];
    setFiles(updatedFiles);
  };

  return (
    <main className="mt-[1rem] ">
      <form onSubmit={handleSubmit}>
        <div>
          <p>Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => handleFileChange(e, index)}
                  type="file"
                  id={`image${index}`}
                  accept="image/*"
                  hidden
                />
                <Image
                  key={index}
                  alt=""
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
          <div className="mt-[2rem] flex flex-col gap-[1rem]">
            <div className="flex flex-col max-w-md ">
              <label htmlFor="product name">Product Name</label>
              <Input
                className="py-4 mt-1 text-base  w-full font-medium"
                placeholder="Type here"
              />
            </div>

            <div className="flex flex-col max-w-md">
              <label htmlFor="product description">Product Description </label>
              <textarea
                rows={4}
                className="py-4 mt-1 border rounded-md bg-transparent px-3  shadow-xs  text-base font-medium resize-none outline-none focus-visible:border-ring focus-visible:ring-ring/50 "
                placeholder="Type here"
              />
            </div>
            <section className="flex items-start flex-wrap max-w-md gap-3 flex-col sm:flex-row ">
              <div className="flex flex-col gap-1 flex-1 w-full sm:min-w-0 ">
                <label>Category</label>
                <select
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                  defaultValue={category}
                  className="py-3 px-3 outline-none border-gray-500/40 border rounded bg-gray-300/10"
                >
                  <option value="Earphone">Earphone</option>
                  <option value="Headphone">Headphone</option>
                  <option value="Watch">Watch</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Camera">Camera</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 flex-1 w-full sm:min-w-0">
                <label>Product Price</label>
                <Input
                  placeholder="0"
                  required
                  value={price}
                  type="number"
                  className="py-3"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1 w-full md:min-w-0 ">
                <label>Offer Price</label>
                <Input
                  placeholder="0"
                  required
                  value={offerPrice}
                  type="number"
                  className="py-3"
                  onChange={(e) => setOfferPrice(e.target.value)}
                />
              </div>
            </section>
          </div>
        </div>

        <Button
          type="submit"
          className="my-[1rem] w-23 h-10 cursor-pointer text-white text-[1rem]"
        >
          ADD
        </Button>
      </form>
    </main>
  );
};

export default page;
