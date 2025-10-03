import React from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";

const AddressAlert = () => {
  return (
    <section className="fixed top-[2rem] w-[16rem]  text-white left-1/2 -translate-x-1/2 z-50">
      <Alert className="white text-green-500 text-[1rem] !px-2 border-0 outline-none shadow-2xl"> ✅ Address successfully added</Alert>
    </section>
  );
};

export default AddressAlert;
