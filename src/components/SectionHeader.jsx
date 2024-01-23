import React from "react";

const style = {
  header: `mb-[50px] uppercase font-semibold tracking-[1px] font-syncopate text-[#626262]`,
};

const SectionHeader = ({ title }) => {
  return <h6 className={style.header}>{title}</h6>;
};

export default SectionHeader;
