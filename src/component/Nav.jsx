import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Nav = () => {
  const containerRef = useRef(null);
  const tl = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const items = container.querySelector(".items");
    const navButton = container.querySelector(".nav-button");
    const navbar = container.querySelector(".nav-bar");

    // Initial state hidden
    gsap.set(items, { height: 0, opacity: 0, overflow: "hidden" });
    gsap.set(navButton, { height: 0, opacity: 0, overflow: "hidden" });
    gsap.set(navbar, { height: "auto", width: "auto" });
    // Timeline
    tl.current = gsap
      .timeline({ paused: true })
      .to(navbar, {
        height: "90vh",
        width: "100vw",
        duration: 0.5,
        ease: "power2.out",
      })
      .to(
        items,
        { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" },
        "<0.1"
      )
      .to(
        navButton,
        { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" },
        "<0.1"
      );

    // Desktop hover
    const handleMouseEnter = () => !menuOpen && tl.current.play();
    const handleMouseLeave = () => !menuOpen && tl.current.reverse();

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [menuOpen]);

  // Mobile toggle
  const toggleMenu = () => {
    const container = containerRef.current;
    const items = container.querySelector(".items");
    const navButton = container.querySelector(".nav-button");
    const navbar = container.querySelector(".nav-bar");

    if (menuOpen) {
      tl.current.eventCallback("onReverseComplete", () => {
        // Reset heights after reverse
        gsap.set(items, { height: 0, opacity: 0 });
        gsap.set(navButton, { height: 0, opacity: 0 });
        gsap.set(navbar, { height: "auto", width: "auto" });
      });
      tl.current.reverse();
      setMenuOpen(false);
    } else {
      tl.current.play();
      setMenuOpen(true);
    }
  };

  return (
    <nav className="p-5 fixed top-5 left-0 w-full z-50 mx-auto flex justify-center">
      <div ref={containerRef}>
        <div className="nav-bar flex flex-col relative justify-between text-3xl font-bold text-white !p-[1.25rem] max-w-sm rounded-[0.75rem]">
          <div className="flex w-full items-center relative justify-between">
            <h2 className="bbh-sans-bartle-regular">Basis</h2>
            <div className="hidden md:flex nav_dots" onClick={toggleMenu}>
              <div className="nav_dot"></div>
              <div className="nav_dot"></div>
              <div className="nav_dot"></div>
              <div className="nav_dot"></div>
            </div>
          </div>

          {/* Menu items */}
          <div className="items flex flex-col ">
            <ul className="michroma-regular text-2xl">
              <li>
                <a href="/" className="flex items-center gap-4">
                  HOME <span className="text-[10px]">01</span>
                </a>
              </li>
              <li>
                <a href="/" className="flex items-center gap-4">
                  SERVICES <span className="text-[10px]">02</span>
                </a>
              </li>
              <li>
                <a href="/" className="flex items-center gap-4">
                  CASE STUDIES <span className="text-[10px]">03</span>
                </a>
              </li>
              <li>
                <a href="/" className="flex items-center gap-4">
                  FINTECH EXPERTISE <span className="text-[10px]">04</span>
                </a>
              </li>
              <li>
                <a href="/" className="flex items-center gap-4">
                  LET'S CONNECT <span className="text-[10px]">05</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Button */}
          <button className="nav-button michroma-bold flex items-center font-bold gap-2 mt-4">
            <a href="/">Book An Intro</a>
            <div className="icon-img">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-aperture-icon lucide-aperture"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m14.31 8 5.74 9.94" />
                <path d="M9.69 8h11.48" />
                <path d="m7.38 12 5.74-9.94" />
                <path d="M9.69 16 3.95 6.06" />
                <path d="M14.31 16H2.83" />
                <path d="m16.62 12-5.74 9.94" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
