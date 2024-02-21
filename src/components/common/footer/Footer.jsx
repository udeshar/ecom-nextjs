import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaMediumM } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-slate-900 text-white pt-16 md:pt-20 pb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex justify-between flex-col md:flex-row gap-8 md:gap-16">
          <div style={{ flex: 2 }} className="">
            <div className="font-bold text-lg mb-2 md:mb-5">
              MARKETO
            </div>
            <div className="flex gap-5 my-3" >
                <div className="" >
                    <IoLocationOutline size={23} />
                </div>
                <div>
                    <p className="text-sm font-light" >1234 Street, whitefield, Banglore, City Name, United States</p>
                </div>
            </div>
            <div className="flex gap-5 my-3" >
                <div className="" >
                    <IoCallOutline size={23} />
                </div>
                <div>
                    <p className="text-sm font-light" >+123 976 647 6456</p>
                </div>
            </div>
            <div className="flex gap-5 my-3" >
                <div className="" >
                    <AiOutlineMail size={23} />
                </div>
                <div>
                    <p className="text-sm font-light" >abc@gmail.com</p>
                </div>
            </div>
            {/* show social icons */}
            <div className="flex gap-3 mt-8" >
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center" >
                    <FaFacebookF size={16} />
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center" >
                    <FaMediumM size={16} />
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center" >
                    <FaXTwitter size={16} />
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center" >
                    <FaLinkedinIn size={16} />
                </div>
            </div>
          </div>
          <div
            style={{ flex: 3 }}
            className=" flex sm:items-center flex-col sm:flex-row sm:justify-between gap-5 sm:gap-0"
          >
            <div className="mb-4 sm:mb-0" >
                <div className="font-bold text-lg mb-5">Quick Links</div>
                <div className="flex flex-col gap-3">
                    <div className="text-sm font-light " >Home</div>
                    <div className="text-sm font-light " >About</div>
                    <div className="text-sm font-light " >Services</div>
                    <div className="text-sm font-light " >Blog</div>
                    <div className="text-sm font-light " >Contact</div>
                </div>
            </div>
            <div className="mb-4 sm:mb-0">
                <div className="font-bold text-lg mb-5">Services</div>
                <div className="flex flex-col gap-3">
                    <div className="text-sm font-light " >Web Design</div>
                    <div className="text-sm font-light " >Web Development</div>
                    <div className="text-sm font-light " >Product Management</div>
                    <div className="text-sm font-light " >Marketing</div>
                    <div className="text-sm font-light " >Graphic Design</div>
                </div>
            </div>
            <div className="mb-4 sm:mb-0">
                <div className="font-bold text-lg mb-5">Services</div>
                    <div className="flex flex-col gap-3">
                        <div className="text-sm font-light " >Web Design</div>
                        <div className="text-sm font-light " >Web Development</div>
                        <div className="text-sm font-light " >Product Management</div>
                        <div className="text-sm font-light " >Marketing</div>
                        <div className="text-sm font-light " >Graphic Design</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <hr className="border-slate-600" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between mt-4">
            <div>
                <p className="text-sm font-light" >© 2021 Marketo. All rights reserved.</p>
            </div>
            <div className="flex gap-5" >
                <div className="text-sm font-light" >Privacy Policy</div>
                <div className="text-sm font-light" >Terms of Service</div>
            </div>
        </div>
    </div>
  );
};

export default Footer;
