"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import MobileNav from "./MobileNav";
import { sidebarLinks } from "@/constant";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Navbar() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed top-0 right-0 w-screen z-50 grid grid-cols-[20%_80%] px-6 py-4 
      lg:px-10 items-center backdrop-blur-md bg-white/30 shadow-md h-20 "
    >
      <div className="gap-2 items-center">
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
              hover:after:scale-x-10
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
          <SignedIn>
            <UserButton />
          </SignedIn>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
