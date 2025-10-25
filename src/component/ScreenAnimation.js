import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import React, { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);
const ScreenAnimation = () => {
  useEffect(() => {
    const boxes = document.querySelectorAll(".box");
    const split = new SplitText(".name", { type: "chars" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".containers",
        start: "top center",
        end: "bottom 20%",
      },
    });

    tl.to(boxes, {
      stagger: 0.2,
      duration: 1,
      ease: "power3.inOut",
      width: "100vw",
      height: "100vh",
    });
    tl.from(split.chars, {
      stagger: 0.2,
      duration: 1,
      ease: "power3.inOut",
      opacity: 0,
    });
  }, []);

  return (
    <div>
      <div className="containers relative">
        {[...Array(1)].map((_, i) => (
          <img key={i} className={`box rounded-xl`} src="./image.jpg" alt="" />
        ))}
        <h1 className="name text-gray-300 text-7xl michroma-regular absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          This Maxwell
        </h1>
      </div>
    </div>
  );
};

export default ScreenAnimation;
