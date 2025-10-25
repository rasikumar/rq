import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    id: 1,
    title: "Innovative Solutions",
    description:
      "We craft creative digital solutions that help businesses grow and stay ahead in a competitive market.",
    imageUrl: "/image.jpg",
  },
  {
    id: 2,
    title: "User-Centric Design",
    description:
      "Our designs focus on user experience, blending functionality with elegance for seamless interaction.",
    imageUrl: "/image.jpg",
  },
  {
    id: 3,
    title: "Scalable Technology",
    description:
      "We build powerful, scalable systems designed to adapt and perform as your business evolves.",
    imageUrl: "/image.jpg",
  },
  {
    id: 4,
    title: "Reliable Support",
    description:
      "From development to deployment, our team ensures continuous support and timely assistance.",
    imageUrl: "/image.jpg",
  },
];
const StickyCards = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const stickyCards = document.querySelectorAll(".sticky-card");

      stickyCards.forEach((card, index) => {
        if (index < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: stickyCards[stickyCards.length - 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
          });
        }
        if (index < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: stickyCards[index + 1],
            start: "top bottom",
            end: "top top",
            onUpdate: (self) => {
              const progress = self.progress;
              const scale = 1 - progress * 0.05;
              const afterOpacity = progress;
              // const rotation = progress * 5;
              gsap.set(card, {
                scale: scale,
                // rotation: rotation,
                opacity: 1 - afterOpacity,
              });
            },
          });
        }
      });
    },
    { scope: container }
  );

  return (
    <div className="sticky-cards" ref={container}>
      {cardsData.map((card, index) => (
        <div className="sticky-card" key={index}>
          <div class="sticky-card-index">
            <h1 class="card-title">{card.id}</h1>
          </div>
          <div class="sticky-card-content">
            <div className="sticky-card-content-wrapper">
              <h1 class="sticky-card-header">{card.title}</h1>
              <div class="sticky-card-img">
                <img src={card.imageUrl} alt="asd" class="card-image" />
              </div>
              <div class="sticky-card-copy">
                <div class="sticky-card-copy-title">
                  <p>(What about it)_</p>
                </div>
                <div>
                  <p class="sticky-card-copy-description">{card.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StickyCards;
