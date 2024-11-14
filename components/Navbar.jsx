"use client";

import MobileNav from "./MobileNav";
import { sidebarLinks } from "@/constant";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

function Navbar() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed top-0 right-0 w-screen z-50 grid grid-cols-[20%_80%] 
      lg:px-10 items-center backdrop-blur-md shadow-md h-20 pr-4"
    >
      <div className="gap-2 items-center pl-4">
        <Link href="/">
          <span className="text-xl font-bold">TalentBridge</span>
        </Link>
      </div>
      <div className="flex justify-end items-center gap-4">
        <div className="hidden lg:flex gap-4">
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.route;
            return (
              <Link
                href={item.route}
                key={item.label}
                className={`flex gap-4 items-center p-4 rounded-lg relative 
              after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary
              after:transform after:scale-x-0 after:transition-transform after:duration-300
              hover:after:scale-x-100
              group ${isActive ? "after:scale-x-100" : ""}`}
              >
                <p className="font-semibold transition-all duration-300 group-hover:scale-110">
                  {item.label}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="flex gap-4">
          <ThemeSwitcher />
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
