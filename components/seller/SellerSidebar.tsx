"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import path from "path";

// Menu items.
const items = [
  {
    id: 1,
    title: "Add Product",
    url: "/sellers",
    icon: assets.add_icon,
  },
  {
    id: 2,
    title: "Product List",
    url: "/sellers/product-list",
    icon: assets.product_list_icon,
  },
  {
    id: 3,
    title: "Orders",
    url: "/sellers/orders",
    icon: assets.order_icon,
  },
];

const SellerSidebar = () => {
  const pathname = usePathname();

  const [activeElement, setActiveElement] = useState(pathname);

  useEffect(() => {
    setActiveElement(pathname);
  }, [pathname]);



 
  return (
    <Sidebar className=" w-[4rem] md:w-[14rem] border-gray-300 border-r bg-white ">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="w-full py-[.7rem]">
              {items.map((item) => {
                const isActive = activeElement === item.url;

                return (
                  <SidebarMenuItem
                    className={`

                    ${
                      isActive
                        ? " bg-orange-600/10 hover:bg-orange-600/10 transition border-r-4 md:border-r-6 border-orange-500/90"
                        : "hover:bg-gray-100/90 border-white"
                    }
                    `}
                    key={item.title}
                  >
                    <SidebarMenuButton
                      asChild
                      data-active={isActive ? "true" : undefined}
                      className=" data-[active=true]:!hover:bg-orange-600/10 data-[active=true]!:bg-orange-600/10  active:!bg-orange-600/10"
                      
                    >
                      <Link href={item.url}
                      onClick={()=>setActiveElement(item.url)}
                      >
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={30}
                          height={25}
                        />
                        <span className="hidden md:block">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SellerSidebar;


