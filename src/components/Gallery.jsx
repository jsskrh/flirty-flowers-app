import { useState } from "react";
import { images } from "../utils/data";

const style = {
  container: `py-[100px] bg-[#d53f41] mx-[-5vw] relative`,
  header: `mb-[50px]`,
  gallery: `h-[80vh] py-[10vh] w-[400%] flex `,
  galleryCounter: `absolute top-[10%] left-[100px] z-10 mix-blend-difference text-base leading-4 text-[#dbd8d6] font-bai font-semibold inline-block`,
  divider: `content-[''] bg-white w-[6.25vw] h-[1px] my-[7px] mx-2.5 inline-block flex-nowrap`,
  galleryItemWrapper: `aspect-video h-full grid w-[100vw] grid-cols-[20vw_1fr_200px]`,
  galleryItem: `w-full h-full relative will-change-transform`,
  galleryItemInfo: `absolute bottom-[10%] z-10 -translate-x-[20%] text-[#dbd8d6]`,
  galleryInfoTitle: `text-[6vw] leading-[6vw] font-bai font-semibold`,
  galleryInfoSubtitle: `relative text-[6vw] leading-[6vw] font-bodoni text-transparent gallery-info-subtitle`,
  galleryInfoCategory: `relative font-bai text-2xl leading-6 mt-[2vh]`,
  galleryItemImage: `bg-cover bg-center origin-center w-full h-full will-change-transform scale-100`,
};

const Gallery = () => {
  const [activeImage, setActiveImage] = useState(1);

  return (
    <div className={style.container} data-scroll-section>
      <div className={style.gallery}>
        <div className={style.galleryCounter}>
          <span>{activeImage}</span>
          <span className={style.divider} />
          <span>{images.length}</span>
        </div>
        {images.map((image, index) => (
          <GalleryItem
            key={image.src}
            index={index}
            {...image}
            updateActiveImage={(index) => setActiveImage(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

const GalleryItem = ({
  src,
  category,
  title,
  subtitle,
  updateActiveImage,
  index,
}) => {
  return (
    <div className={style.galleryItemWrapper}>
      <div />
      <div className={style.galleryItem}>
        <div className={style.galleryItemInfo}>
          <h1 className={style.galleryInfoTitle}>{title}</h1>
          <h6 className={style.galleryInfoSubtitle}>{subtitle}</h6>
          <p className={style.galleryInfoCategory}>{category}</p>
        </div>
        <div className={`${style.galleryItemImage} bg-[url('${src}')]`}></div>
      </div>
    </div>
  );
};

export default Gallery;
