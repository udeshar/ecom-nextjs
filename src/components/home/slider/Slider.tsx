import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";
import OffBanner from "../off-banner/OffBanner";

const Slider = ({featured} : any) => {
  return (
    <Carousel
      showArrows={true}
      onChange={() => {}}
      onClickItem={() => {}}
      onClickThumb={() => {}}
      className="h-full w-full"
      renderIndicator={(fn, isSelected) => {
        return <div onClick={fn} className="p-1 cursor-pointer inline-block" ><div className={`${isSelected ? 'bg-blue-600' : "bg-white"} h-1 w-6 rounded`} ></div></div>;
      }}
    >
      {
        featured.map((product: any, index: number) => {
          return (
            <div key={index} className="h-full" >
              <OffBanner product={product} />
            </div>
          )
        })
      }
    </Carousel>
  );
};

export default Slider;
