import React, { useState, useEffect } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import SelectInputBtn from "../custom-input/SelectInputBtn";
import ToggleTheme from "../theme/ToggleTheme";
import Link from "next/link";
import { useUserContext } from "@/context/userContext";
import { useCartContext } from "@/context/cartContext"; 
import { useWishlistContext } from "@/context/wishlistContext";
import { useRouter } from "next/router";
import CustomInput from "../custom-input/CustomInput";
// import SelectInputBtn from "../custom-input/SelectInputBtn";


const Navbar: React.FC = () => {
    const {user, logout, getUser} = useUserContext();
    const { items, getCartItems } = useCartContext();
    const { items : wishItems } = useWishlistContext();

    const [searchedProduct, setSearchedProduct] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const router = useRouter();
    
    async function fetchProductsByName(name: string) {
        try{
            setIsSearching(true);
            const res = await fetch(`http://localhost:3000/api/product/name/${name}`);
            const data = await res.json();
            setSearchedProduct(data);
        } catch(error){
            console.log(error);
            setSearchedProduct([]);
        } finally {
            setIsSearching(false);
        }
    }

    function debounce(func, delay) {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    }
 
    const handleSearch = debounce((searchTerm : any) => {
        fetchProductsByName(searchTerm);
      }, 300); // Adjust the delay as needed
    
      const handleChange = (event : any) => {
        const { value } = event.target;
        // setSearchTerm(value);
        if(value){
            handleSearch(value);
        } else{
            setIsSearching(false);
            setSearchedProduct([]);
        }
      };

    return (
        <nav className="dark:bg-gray-800 py-5 border-b border-slate-200 dark:border-slate-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                        <div className="flex-shrink-0 dark:text-white font-bold text-lg">
                            <Link href="/" >MARKETO</Link>
                            {/* MARKETO */}
                        </div>
                    </div>
                    <div className="flex flex-1 justify-center relative" >
                        <CustomInput 
                            type="text"
                            placeholder="Search products"
                            className="w-full"
                            name="search"
                            onChange={handleChange}
                            wrapperClass="flex-1"
                            id="search"
                        />
                        <div className="absolute top-full w-full" >
                            {
                                isSearching && <p className="p-2" >Loading...</p> ||
                                searchedProduct.length > 0 && (
                                    <ul className="bg-white w-full absolute top-full z-10">
                                        {
                                            searchedProduct.map((product: any) => (
                                                <li key={product.id} className="p-2 border-b border-slate-200 dark:border-slate-600" >
                                                    <Link href={`/product/${product.id}`} >{product.name}</Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                        </div>
                        {/* <SelectInputBtn /> */}
                    </div>
                    <div className="block flex-1">
                        <div className="flex items-center space-x-4 justify-end gap-3">
                            <ToggleTheme />
                            {
                                user && (
                                    <>
                                        <Link href="/wishlist" className="hover:text-blue-800 m-0 relative" >
                                            <IoMdHeartEmpty size={22} className="dark:text-white" />
                                            {wishItems.length > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-1 absolute bottom-1/2 left-1/2" >{wishItems.length}</span>}
                                        </Link>
                                        <Link href="/cart" className="hover:text-blue-800 m-0 relative">
                                            <MdOutlineShoppingCart size={22} className="dark:text-white">
                                            </MdOutlineShoppingCart>
                                            {items.length > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-1 absolute bottom-1/2 left-1/2" >{items.length}</span>}
                                        </Link>
                                        {/* logout */}
                                        <button onClick={()=>logout(()=>{ router.replace('/login') })} className="text-blue-500 hover:text-blue-800 m-0">
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
