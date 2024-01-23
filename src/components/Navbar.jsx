import React from "react";

const style = {
  navbar: `flex justify-between py-[50px] text-2xl leading-[24px] tracking-[1px] font-syncopate text-[#464646] font-bold uppercase`,
};

const Navbar = () => {
  return (
    <div className={style.navbar} data-scroll-section>
      <div>menu</div>
      <div>Flirty Flowers</div>
      <div>cart</div>
    </div>
  );
};

export default Navbar;
