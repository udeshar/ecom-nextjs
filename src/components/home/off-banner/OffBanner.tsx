import React from "react";
import Image from "next/image";
import BtnUnderline from "@/components/common/custom-button/BtnUnderline";
import { product } from "@prisma/client";
import Link from "next/link";

const OffBanner = ({product} : {product : any}) => {
  return (
    <Link href={`/${product.category.name}/${product.name}`}>
    <div className="flex justify-between items-center h-full px-3 sm:px-6 md:px-10 py-6">
      <div className="flex-3">
        <p className="text-xs sm:text-sm md:text-lg text-slate-400 font-medium my-3 sm:my-5">
          Get upto {product.offer}% off today
        </p>
        <h3 className="text-lg sm:text-3xl md:text-4xl font-bold my-3 sm:my-5">{product.name}</h3>
        <p className="my-3 sm:my-5">
          <span className="text-green-600 font-normal">₹{product.price}</span>
          <span className="line-through pl-2 text-slate-400">₹50.00</span>
        </p>
        {/* <p className="my-5">Shop Now</p> */}
        <BtnUnderline className="my-3 sm:my-5" onClick={()=>{}} >Shop Now</BtnUnderline>
      </div>
      <div className="relative flex-1 h-full">
        <Image
          src={product.imagePath!}
          alt="headphone"
          fill={true}
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
    </Link>
  );
};

export default OffBanner;
