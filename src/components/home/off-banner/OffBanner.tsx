import React from "react";
import Image from "next/image";
import BtnUnderline from "@/components/common/custom-button/BtnUnderline";

const OffBanner = () => {
  return (
    <div className="flex justify-between items-center h-full px-3 sm:px-6 md:px-10 py-6">
      <div className="flex-3">
        <p className="text-xs sm:text-sm md:text-lg text-slate-400 font-medium my-3 sm:my-5">
          Get upto 75% off today
        </p>
        <h3 className="text-lg sm:text-3xl md:text-4xl font-bold my-3 sm:my-5">Beat Headphone</h3>
        <p className="my-3 sm:my-5">
          <span className="text-green-600 font-normal">$47.00</span>
          <span className="line-through pl-2 text-slate-400">$50.00</span>
        </p>
        {/* <p className="my-5">Shop Now</p> */}
        <BtnUnderline className="my-3 sm:my-5" onClick={()=>{}} >Shop Now</BtnUnderline>
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
  );
};

export default OffBanner;
