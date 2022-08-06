import CanvasBlock from "features/Webgl/CanvasBlock/CanvasBlock";
import Home from "features/Home/Home";
import { useEffect, useRef } from "react";
import { DESKTOP_THRESHOLD, HEIGHT_THRESHOLD, PAGE_STATE } from "utils/format";
import { useMediaQuery } from "react-responsive";
import About from "features/About/About";
import HeaderBtn from "features/HeaderBtn/HeaderBtn";
import gsap from "gsap";
const AppHome = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: `(min-width: ${DESKTOP_THRESHOLD}px)`,
  });
  const isHeightEnough = useMediaQuery({
    query: `(min-height: ${HEIGHT_THRESHOLD}px)`,
  });
  const scrollPosRef = useRef({
    current: 0,
    target: 0,
    latency: 0,
  });

  const pageStateRef = useRef(PAGE_STATE.home);

  useEffect(() => {
    if (!isDesktopOrLaptop) {
      if (pageStateRef.current !== PAGE_STATE.about) {
        //when page is small, we need to hide home page and show about page
        gsap.set("#aboutContainer", { opacity: 1 });
        gsap.set(".about-text-animate", { transform: "translateX(0%)" });
        isHeightEnough &&
          gsap.set("#introContainer > div > div", {
            transform: "translateY(0%)",
          });
        isHeightEnough &&
          gsap.set("#aboutSocialApp > div > div", {
            transform: "translateY(0%)",
          });
        gsap.set("#rightsContainer > div > div", {
          transform: "translateY(0%)",
        });
        // hide about and close btn
        gsap.set("#aboutBtn", {
          transform: "translateY(-100%)",
        });
        gsap.set("#closeBtn", {
          transform: "translateY(100%)",
        });
      } else {
        // if we already at about page, we only hide about and close button
        gsap.set("#aboutBtn", {
          transform: "translateY(-100%)",
        });
        gsap.set("#closeBtn", {
          transform: "translateY(100%)",
        });
      }
    } else if (pageStateRef.current === PAGE_STATE.home) {
      // if page is large enough, we need to hide about page
      gsap.set("#aboutContainer", { opacity: 0 });
      gsap.set("#aboutBtn", {
        transform: "translateY(0%)",
      });
      gsap.set("#closeBtn", {
        transform: "translateY(100%)",
      });
    } else {
      gsap.set("#aboutBtn", {
        transform: "translateY(-100%)",
      });
      gsap.set("#closeBtn", {
        transform: "translateY(0%)",
      });
    }
  }, [isDesktopOrLaptop, isHeightEnough]);

  return (
    <>
      <CanvasBlock scrollPosRef={scrollPosRef} pageStateRef={pageStateRef} />
      <Home pageStateRef={pageStateRef} />
      <About />
      <HeaderBtn pageStateRef={pageStateRef} />
    </>
  );
};

export default AppHome;
