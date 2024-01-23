import React from "react";
import SectionHeader from "./SectionHeader";

const style = {
  container: `py-[100px] text-center pb-[200px]`,
  header: `mb-[50px]`,
  location: `text-[18vw] uppercase font-bodoni leading-[18vw]`,
};

const Footer = () => {
  return (
    <div className={style.container} data-scroll-section>
      <SectionHeader title="Made in" />
      <h1 className={style.location} id="locationText">
        Rio de Janerio
      </h1>
    </div>
  );
};

export default Footer;
