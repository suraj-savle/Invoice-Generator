import React, { useState } from "react";
import "../index.css";
import { Link, NavLink } from "react-router-dom";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { IoMenu, IoClose } from "react-icons/io5";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-white sticky top-0 z-50">
      <div className="w-full py-3 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 shadow flex justify-between items-center">
        <div className="flex gap-6 md:gap-10 items-center">
          <div>
            <Link
              to="/"
              className="flex items-end gap-1"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-primary text-2xl sm:text-3xl">
                <FaFileInvoiceDollar />
              </span>
              <span className="text-black text-base sm:text-lg md:text-xl font-medium">
                Invoice-Generator
              </span>
              <span className="text-xs sm:text-sm text-gray-500">.com</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `w-full text-center py-2 text-gray-700 hover:text-primary transition-colors ${
                  isActive ? "text-primary font-medium" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/help"
              className={({ isActive }) =>
                `text-sm lg:text-base hover:text-primary transition-colors ${
                  isActive ? "text-primary font-medium" : "text-gray-700"
                }`
              }
            >
              Help
            </NavLink>
          </div>
        </div>
        <div className="hidden md:flex">
          <a
            href="https://github.com/suraj-savle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition-transform"
          >
            <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm lg:text-base font-medium">
              GitHub
            </button>
          </a>
        </div>
        <div
          className="text-3xl md:hidden cursor-pointer p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoClose /> : <IoMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`w-full bg-white shadow-md md:hidden transition-all duration-300 ease-in-out border-t border-gray-200 overflow-hidden ${
          isOpen ? "max-h-96 py-4" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 px-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `w-full text-center py-2 text-gray-700 hover:text-primary transition-colors ${
                isActive ? "text-primary font-medium" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/help"
            className={({ isActive }) =>
              `w-full text-center py-2 text-gray-700 hover:text-primary transition-colors ${
                isActive ? "text-primary font-medium" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Help
          </NavLink>
          <a
            href="https://github.com/suraj-savle"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs"
            onClick={() => setIsOpen(false)}
          >
            <button className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium">
              GitHub
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Header;
