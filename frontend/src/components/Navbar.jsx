import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import logo from "../assets/images/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  /* ================================
     HERO COLOR + HIDE ON SCROLL
     ================================ */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show / hide navbar
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }

      lastScrollY.current = currentScrollY;

      // Hero-based color change
      const hero = document.getElementById("hero");
      if (hero) {
        setScrolled(currentScrollY > hero.offsetHeight - 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================================
     MOBILE MENU SCROLL LOCK
     ================================ */
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  const toggleHome = () => scroll.scrollToTop();
  const textColor = scrolled ? "text-gray-900" : "text-white";

  return (
    <nav
      className={`
        fixed top-0 w-full z-1000
        transition-transform duration-500 ease-in-out
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        ${scrolled
          ? "bg-white/90 backdrop-blur-lg py-3 shadow-md"
          : "bg-transparent py-6 md:py-8"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link
            to="/"
            onClick={toggleHome}
            className="transition-all duration-300 hover:scale-105 z-10"
          >
            {/* Desktop */}
            <span
              className={`hidden md:block ${textColor} font-OswaldRegular tracking-[4px] font-bold text-2xl`}
            >
              MGC<span className="text-[#db6747]">.</span>
            </span>

            {/* Mobile */}
            <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              <img src={logo} alt="MGC Logo" className="h-8" />
              <span className={`font-RegularMilk ${textColor} text-sm`}>
                MGC BUILDING
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-10">
            {isLandingPage ? (
              ["hero", "about", "apply", "contact"].map((target) => (
                <ScrollLink
                  key={target}
                  to={target}
                  smooth
                  duration={800}
                  offset={-80}
                  spy
                  className={`relative ${textColor} font-NunitoSans font-bold uppercase tracking-[2px] text-sm cursor-pointer
                    after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2
                    after:w-0 after:h-0.5 after:bg-[#db6747] hover:after:w-full after:transition-all`}
                  activeClass="text-[#db6747] after:w-full"
                >
                  {target === "hero" ? "Home" : target}
                </ScrollLink>
              ))
            ) : (
              <Link
                to="/"
                className="uppercase tracking-[2px] font-bold text-[#db6747]"
              >
                Back to Home
              </Link>
            )}

            <Link
              to="/login"
              className="bg-[#db6747] text-white px-8 py-3 uppercase text-xs tracking-[2px]
                         hover:bg-[#3a0f08] transition shadow-lg"
            >
              Log In
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className={`md:hidden ${textColor}`}>
            <button onClick={() => setIsOpen(true)} className="p-3">
              <FaBars size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-white md:hidden transition-all duration-500 ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{ zIndex: 9999 }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end px-8 py-8 border-b">
            <button onClick={() => setIsOpen(false)}>
              <IoMdClose size={32} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 space-y-10">
            {["hero", "about", "apply", "contact"].map((target) => (
              <ScrollLink
                key={target}
                to={target}
                smooth
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="text-2xl uppercase tracking-[4px] hover:text-[#db6747]"
              >
                {target === "hero" ? "Home" : target}
              </ScrollLink>
            ))}

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="bg-[#db6747] text-white px-10 py-4 uppercase tracking-[2px]
                         hover:bg-[#3a0f08] transition"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
