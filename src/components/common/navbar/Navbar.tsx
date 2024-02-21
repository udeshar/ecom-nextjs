import React, { useState, useEffect } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import SelectInputBtn from "../custom-input/SelectInputBtn";
import ToggleTheme from "../theme/ToggleTheme";
import Link from "next/link";
import { useUserContext } from "@/context/userContext";


const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {user, logout} = useUserContext();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // useEffect(() => {
    //     getUser();
    // }, [])
    

    return (
        <nav className="dark:bg-gray-800 py-5 border-b border-slate-200 dark:border-slate-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                        <div className="flex-shrink-0 dark:text-white font-bold text-lg">
                            MARKETO
                        </div>
                    </div>
                    <div className="block md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            <span>&#9776;</span>
                        </button>
                    </div>
                    <div className="flex flex-1 justify-center" >
                        {/* <CustomInput 
                            id="search"
                            name="search"
                            type="text"
                            value=""
                            className=""
                            placeholder="search"
                        /> */}
                        {/* <CustomSelect 
                            options={[
                                { value: 'chocolate', label: 'Chocolate' },
                                { value: 'strawberry', label: 'Strawberry' },
                                { value: 'vanilla', label: 'Vanilla' }
                            ]}
                        /> */}
                        {/* <SelectInputBtn /> */}
                    </div>
                    <div className="hidden md:block flex-1">
                        <div className="flex items-center space-x-4 justify-end gap-3">
                            <ToggleTheme />
                            {
                                user && (
                                    <>
                                        <IoMdHeartEmpty size={22} className="dark:text-white" />
                                        <Link href="/cart" className="hover:text-blue-800 m-0">
                                            <MdOutlineShoppingCart size={22} className="dark:text-white" />
                                        </Link>
                                        {/* logout */}
                                        <button onClick={()=>logout(()=>{})} className="text-blue-500 hover:text-blue-800 m-0">
                                            Logout
                                        </button>
                                    </>
                                ) || (
                                    <>
                                        <Link href="/login" className="text-blue-500 hover:text-blue-800 m-0">
                                            Login
                                        </Link>
                                        <Link href="/signup" className="text-blue-500 hover:text-blue-800 m-0">
                                            Signup
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* Responsive Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#" className="text-gray-300 hover:text-white">
                            Home
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white">
                            About
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white">
                            Services
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white">
                            Contact
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
