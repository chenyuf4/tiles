import clsx from "clsx";
import gsap from "gsap";
import styles from "./HeaderBtn.module.scss";
import { DESKTOP_THRESHOLD, PAGE_STATE } from "utils/format";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";
import { Power4, Power3 } from "gsap/all";
const HeaderBtn = ({ pageStateRef }) => {
  const tlRef = useRef(gsap.timeline());
  const isDesktopOrLaptop = useMediaQuery({
    query: `(min-width: ${DESKTOP_THRESHOLD}px)`,
  });
  const closeBtnRef = useRef();
  // switch to about page
  const animateToAbout = () => {
    const tl = tlRef.current;
    pageStateRef.current = PAGE_STATE.about;
    const timelineOffset = 0.45;
    tl.to(
      "#aboutContainer",
      {
        opacity: 1,
        duration: 0.3,
        delay: 0.15,
        ease: Power3.easeOut,
      },
      "start"
    )
      .to(
        ".letter-animate",
        {
          transform: "translateX(100%)",
          duration: 0.32,
          stagger: 0.013,
        },
        "start"
      )
      .to(
        "#aboutBtn",
        {
          transform: "translateY(-100%)",
          duration: 0.45,
        },
        "start"
      )
      .to(
        "#homeSocialApp > div > div",
        {
          transform: "translateY(-100%)",
          duration: 0.32,
          stagger: 0.015,
        },
        "start"
      )
      .fromTo(
        closeBtnRef.current,
        {
          transform: "translateY(100%)",
        },
        {
          transform: "translateY(0%)",
          duration: 0.45,
        },
        timelineOffset
      )
      .fromTo(
        ".about-text-animate",
        {
          transform: "translateX(-100%)",
        },
        {
          transform: "translateX(0%)",
          duration: 1.2,
          ease: Power3.easeOut,
        },
        timelineOffset
      )
      .fromTo(
        "#introContainer > div > div",
        {
          transform: "translateY(100%)",
        },
        {
          transform: "translateY(0%)",
          duration: 0.8,
          stagger: 0.03,
          ease: Power3.easeOut,
        },
        timelineOffset
      )
      .fromTo(
        "#aboutSocialApp > div > div",
        {
          transform: "translateY(100%)",
        },
        {
          transform: "translateY(0%)",
          duration: 1,
          stagger: 0.02,
          ease: Power3.easeOut,
        },
        timelineOffset
      )
      .fromTo(
        "#rightsContainer > div > div",
        {
          transform: "translateY(100%)",
        },
        {
          transform: "translateY(0%)",
          duration: 0.6,
          stagger: 0.02,
          ease: Power3.easeOut,
        },
        timelineOffset
      );
  };

  const animateToHome = () => {
    const tl = tlRef.current;
    pageStateRef.current = PAGE_STATE.home;
    const timelineOffset = 0.4;
    tl.fromTo(
      ".letter-animate",
      {
        transform: "translateX(-100%)",
      },
      {
        transform: "translateX(0%)",
        duration: 0.5,
        stagger: 0.013,
        delay: 0.4,
      },
      "start"
    )
      .to(
        closeBtnRef.current,
        {
          transform: "translateY(-100%)",
          duration: 0.45,
        },
        "start"
      )
      .fromTo(
        "#aboutBtn",
        {
          transform: "translateY(100%)",
        },
        {
          transform: "translateY(0%)",
          duration: 0.45,
        },
        timelineOffset
      )
      .fromTo(
        "#homeSocialApp > div > div",
        {
          transform: "translateY(100%)",
        },
        {
          transform: "translateY(0%)",
          duration: 0.5,
          stagger: 0.015,
          delay: 0.45,
        },
        "start"
      )
      .to(
        ".about-text-animate",
        {
          transform: "translateX(100%)",
          duration: 0.55,
          ease: Power4.easeOut,
        },
        "start"
      )
      .to(
        "#introContainer > div > div",
        {
          transform: "translateY(-100%)",
          duration: 0.55,
          stagger: 0.01,
          ease: Power4.easeOut,
        },
        "start"
      )
      .to(
        "#aboutSocialApp > div > div",
        {
          transform: "translateY(-100%)",
          duration: 0.55,
          stagger: 0.01,
          ease: Power4.easeOut,
        },
        "start"
      )
      .to(
        "#rightsContainer > div > div",
        {
          transform: "translateY(-100%)",
          duration: 0.55,
          stagger: 0.01,
          ease: Power4.easeOut,
        },
        "start"
      )
      .to(
        "#aboutContainer",
        {
          opacity: 0,
          duration: 0.45,
          delay: 0.35,
          ease: Power4.easeOut,
        },
        "start"
      );
  };

  const clickHandler = () => {
    if (!isDesktopOrLaptop) return;
    tlRef.current.clear();
    if (pageStateRef.current === PAGE_STATE.home) {
      animateToAbout();
    } else if (pageStateRef.current === PAGE_STATE.about) {
      animateToHome();
    }
  };
  return (
    <div
      className={clsx(
        styles["header-container-right"],
        "pt-5 pe-5 text-primary-color"
      )}
    >
      <div className="JW-font font-md">
        <div
          className={clsx(
            "position-relative overflow-hidden",
            isDesktopOrLaptop && "cursor-pointer"
          )}
          onClick={clickHandler}
        >
          <div id="aboutBtn">
            <div className="position-relative line-height-md">ABOUT</div>
            <div className="line">
              <div className="line-color"></div>
            </div>
          </div>

          <div
            className={clsx("position-absolute JW-font font-md")}
            style={{ top: 0 }}
          >
            <div ref={closeBtnRef} id="closeBtn">
              <div className="position-relative line-height-md">CLOSE</div>
              <div className="line">
                <div className="line-color"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBtn;
