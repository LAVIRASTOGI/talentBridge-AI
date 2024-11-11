"use client";
import { sidebarLinks } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:hidden">
      {/* Drawer Component */}
      <div className="drawer ">
        <input
          id="mobile-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          onChange={toggleNav}
        />

        {/* Drawer Content */}
        <div className="drawer-content">
          {/* Hamburger Button */}
          <label
            htmlFor="mobile-drawer"
            className="btn btn-square btn-ghost z-50"
          >
            <Image
              src="/icons/hamburger.svg"
              width={36}
              height={36}
              alt="Menu"
              className="cursor-pointer"
            />
          </label>
        </div>

        {/* Drawer Side */}
        <div className="drawer-side z-50">
          <label
            htmlFor="mobile-drawer"
            className="drawer-overlay"
            onClick={toggleNav}
          ></label>

          <div className="menu w-80 min-h-full bg-base-100">
            {/* Logo or Header Area */}
            <div className="gap-2 items-center flex p-4 mb-4 justify-between">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <span className="text-xl font-bold">TalentBridge</span>
              </Link>

              <Image
                src="/icons/close.svg"
                width={24}
                height={24}
                alt="Close"
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            {/* Navigation Links */}
            <div className="flex flex-col gap-2">
              {sidebarLinks.map((item) => {
                const isActive = pathname === item.route;
                return (
                  <Link
                    href={item.route}
                    key={item.label}
                    onClick={toggleNav}
                    className={`p-4 rounded-lg transition-all duration-300 
                    ${
                      isActive
                        ? "bg-primary text-primary-content"
                        : "hover:bg-base-200"
                    }`}
                  >
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
