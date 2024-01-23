import React, { useEffect } from "react";
import gsap from "gsap";
// import { splitText } from "../utils/splitText2";
// import SplitText from "../utils/splitText";
// import SplitText from "../utils/Split.min";
// import SplitText from "/src/utils/Split.min.js";

const style = {
  container: `relative py-[100px]`,
  header: `mb-[50px]`,
  menu: `absolute left-0 top-[100px] tracking-[1px] font-syncopate text-[#626262] uppercase`,
  menuItem: `my-2.5 font-semibold`,
  headerText: `text-[20vw] leading-[20vw] uppercase text-center font-bai font-semibold`,
};

const Header = () => {
  useEffect(() => {
    // const split = splitText(document.getElementById("headerText"), {
    //   type: "lines",
    //   linesClass: "lineChildren",
    // });
    // const splitParent = splitText(document.getElementById("#headerText"), {
    //   type: "lines",
    //   linesClass: "lineParent",
    // });
    // const split = new SplitText("#headerText", {
    //   type: "lines",
    //   linesClass: "lineChildren",
    // });
    // const splitParent = new SplitText("#headerText", {
    //   type: "lines",
    //   linesClass: "lineParent",
    // });
    // split.split({
    //   type: "lines",
    //   linesClass: "lineChildren",
    // });
    // splitParent.split({
    //   type: "lines",
    //   linesClass: "lineParent",
    // });
    // gsap.to(split.lines, {
    //   duration: 1,
    //   y: 0,
    //   oypacity: 1,
    //   stagger: 0.1,
    //   ease: "power2",
    // });
  }, []);

  return (
    <div className={style.container} data-scroll-section>
      <ul className={style.menu}>
        <li className={style.menuItem}>Intro</li>
        <li className={style.menuItem}>About</li>
        <li className={style.menuItem}>Featured</li>
      </ul>
      <h1 id="headerText" className={style.headerText}>
        Art Objects
      </h1>
    </div>
  );
};

export default Header;
