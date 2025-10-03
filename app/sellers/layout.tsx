"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import SellerSidebar from "@/components/seller/SellerSidebar";
import { ReactNode } from "react";
import Header from "@/components/seller/Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <Header />
        <div className="flex w-full">
          <div className="flex-shrink-0 w-16 md:w-[14rem]">
            <SellerSidebar />
          </div>

          <main className="flex-1 overflow-x-auto">
            <section className="md:p-6 p-3">{children}</section>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
