import React, { useEffect } from "react";
import ToggleTheme from "../theme/ToggleTheme";
import Link from "next/link";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/router";


const AdminNavbar: React.FC = () => {
    const router = useRouter();
    const {user, logout, getUser} = useUserContext();

    useEffect(() => {
        getUser();
    }, [])
    

    return (
        <nav className="dark:bg-gray-800 py-5 border-b border-slate-200 dark:border-slate-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                        <div className="flex-shrink-0 dark:text-white font-bold text-lg">
                            MARKETO
                        </div>
                    </div>
                    <div className="block md:hidden"></div>
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
                    <div className="block flex-1">
                        <div className="flex items-center space-x-4 justify-end gap-3">
                            <ToggleTheme />
                            {
                                user != null && (
                                    <>
                                        {/* logout */}
                                        <button onClick={()=>logout(()=>{ router.replace('/login')})} className="text-blue-500 hover:text-blue-800 m-0">
                                            Logout
                                        </button>
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

export default AdminNavbar;
