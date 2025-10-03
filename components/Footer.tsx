import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className=" mt-[5rem] ">
      <section className="flex flex-col md:flex-row lg:px-32 border-b gap-[1rem] md:gap-[2rem] pb-[2rem] items-start border-gray-500/30 md:px-16 px-8 ">
        <article className="flex flex-col gap-[.5rem] md:gap-[1rem] w-full md:w-4/5">
          <Image src={assets.logo} alt="quick-cart" />
          <p className="text-sm md:text-justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </article>
        <div className=" md:w-1/2  flex items-center justify-start md:justify-center flex-col">
          <div>
            <h2 className="font-medium mb-[.5rem] md:mb-[1rem]  text-gray-900">Company</h2>
            <ul className="text-sm space-y-1 md:space-y-2">
              <li className="hover:underline ">
                <Link href="/"> Home</Link>
              </li>

              <li className="hover:underline">
                <Link href="/"> About Us</Link>
              </li>
              <li className="hover:underline">
                <Link href="/"> Contact Us</Link>
              </li>
              <li className="hover:underline">
                <Link href="/"> Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="md:w-1/2  flex items-center md:justify-center flex-col">
          <div>
            <h2 className="font-medium mb-[.5rem] md:mb-[1rem] text-gray-900">
              Get in touch
            </h2>
            <ul className="text-sm space-y-1 md:space-y-2">
              <li>+234-803-664-5078</li>

              <li>isholamujeebadekunle@gmail.com</li>
            </ul>
          </div>
        </div>
      </section>

      {/* <div className="h-[1px] w-full bg-gray-300 "></div> */}
      <p className="text-center text-sm !py-[1rem]">Copyright 2025 © AbdulMujeeb.dev All Right Reserved.</p>
    </footer>
  );
};

export default Footer;
