import React from "react";
import { photos } from "../utils/data";

const style = {
  container: `py-[100px] grid grid-cols-3 place-items-center`,
  header: `mb-[50px]`,
  layout: `grid gap-2.5`,
  imgText: `text-[22px] leading-[22px] uppercase font-[500]`,
};

const Featured = () => {
  const [firstUrl, secondUrl] = photos;

  return (
    <div className={style.container} data-scroll-section>
      <div className={`${style.layout} grid-rows-[repeat(2,auto)]`}>
        <h6 className={style.imgText}>green</h6>
        <img
          src={firstUrl}
          alt="flower"
          className="featured-image w-full object-cover"
        />
      </div>
      <div className={`${style.layout} grid-cols-[100px_auto] place-items-end`}>
        <h6
          className={`${style.imgText} translate-x-full -rotate-90 origin-bottom-left justify-self-end`}
        >
          lily
        </h6>
        <img
          src={secondUrl}
          alt="flower"
          className="featured-image w-full h-[125vh] object-cover"
        />
      </div>
    </div>
  );
};

export default Featured;
