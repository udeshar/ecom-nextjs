import React from "react";
import Image from "next/image";
import BtnUnderline from "@/components/common/custom-button/BtnUnderline";

const OfferCard = () => {
  return (
    <div className="bg-slate-100 dark:bg-slate-700 flex-1">
      <div className="flex justify-between items-center h-full px-3 md:px-6">
        <div className="flex-1">
          <h3 className="text-xs sm:text-sm md:text-lg font-bold my-5">Best High Quality Watch</h3>
          <p className="text-xs sm:text-sm md:text-md text-slate-400 font-medium my-5">
            Get upto 75% off today
          </p>
            <BtnUnderline className="my-5" onClick={()=>{}}  >Shop Now</BtnUnderline>
        </div>
        <div className="relative flex-1 h-full">
          <Image
            src={"/assets/images/headphone.png"}
            alt="headphone"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
