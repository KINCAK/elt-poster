import React, { useEffect } from 'react';
import gsap from 'gsap';

const StarBackground = () => {
  useEffect(() => {
    const sky = document.getElementById("sky");
    if (!sky) return;

    // Get star count from data attribute or default to 80
    let starCount = parseInt(sky.dataset.stars || "80", 10);

    // Reduce stars on mobile for performance
    if (window.matchMedia("(max-width: 600px)").matches) {
      starCount = Math.round(starCount * 0.4);
    }

    sky.innerHTML = "";

    // Create GSAP context for easy cleanup
    const ctx = gsap.context(() => {
      const starChar = "✦"; 

      for (let i = 0; i < starCount; i++) {
        const el = document.createElement("div");
        el.className = "star-sparkle";
        el.textContent = starChar;

        // Random positioning
        el.style.left = Math.random() * 100 + "vw";
        el.style.top = Math.random() * 100 + "vh";

        // Random sizes
        const size = gsap.utils.random(6, 18);
        el.style.fontSize = size + "px";

        sky.appendChild(el);

        // Recursive sparkle animation function
        const sparkle = () => {
          gsap.timeline()
            .set(el, { opacity: 0, scale: 0.2 })
            .to(el, {
              opacity: gsap.utils.random(0.6, 1),
              scale: gsap.utils.random(1.2, 1.8),
              duration: gsap.utils.random(0.4, 0.8),
              ease: "power2.out"
            })
            .to(el, {
              opacity: 0,
              scale: 0.1,
              duration: gsap.utils.random(0.5, 1),
              ease: "power1.inOut",
              delay: gsap.utils.random(0.5, 2),
              onComplete: sparkle // Loop the animation
            });
        };

        // Randomized start delay
        gsap.delayedCall(Math.random() * 5, sparkle);
      }
    });

    return () => {
      ctx.revert(); // Kill all animations when component unmounts
      if (sky) sky.innerHTML = "";
    };
  }, []);

  return <div id="sky" data-stars="60" className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }} />;
};

export default StarBackground;