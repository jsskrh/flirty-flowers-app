import React from "react";
import SectionHeader from "./SectionHeader";

const style = {
  container: `py-[100px]`,
  content: `text-[70px] leading-[1.12]`,
};

const About = () => {
  return (
    <div className={style.container} data-scroll-section>
      <SectionHeader title="about" />
      <p className={style.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
        tempora blanditiis, sed vero fugiat similique a ab sapiente neque
        recusandae accusamus maiores minima numquam animi culpa assumenda unde
        corrupti fuga?
      </p>
    </div>
  );
};

export default About;
