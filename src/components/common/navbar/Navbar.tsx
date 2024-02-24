import React, { useState, useEffect } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import SelectInputBtn from "../custom-input/SelectInputBtn";
import ToggleTheme from "../theme/ToggleTheme";
import Link from "next/link";
import { useUserContext } from "@/context/userContext";
import { useCartContext } from "@/context/cartContext"; 


const Navbar: React.FC = () => {
    const {user, logout, getUser} = useUserContext();
    const { items, getCartItems } = useCartContext();

    // useEffect(() => {
    //     // getUser();
    //     // getCartItems();
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
                    <div className="flex flex-1 justify-center" >
                    </div>
                    <div className="block flex-1">
                        <div className="flex items-center space-x-4 justify-end gap-3">
                            <ToggleTheme />
                            {
                                user && (
                                    <>
                                        <IoMdHeartEmpty size={22} className="dark:text-white" />
                                        <Link href="/cart" className="hover:text-blue-800 m-0 relative">
                                            <MdOutlineShoppingCart size={22} className="dark:text-white">
                                            </MdOutlineShoppingCart>
                                            {items.length > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-1 absolute bottom-1/2 left-1/2" >{items.length}</span>}
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
        </nav>
    );
};

export default Navbar;
