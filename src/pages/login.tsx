import React, { FormEvent, useState } from 'react'
import CustomInput from '@/components/common/custom-input/CustomInput';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layoutv2 from '@/components/layout/Layoutv2';
import { useUserContext } from '@/context/userContext';
import { useCartContext } from '@/context/cartContext';
import { useWishlistContext } from '@/context/wishlistContext';

const Login = () => {

    const router = useRouter()
    const {login} = useUserContext();
    const { getCartItems } = useCartContext();
    const { getWishlistItems } = useWishlistContext();
    const [error, setError] = useState("");

    const loginHandler = async (e: FormEvent) => {
        e.preventDefault()
        console.log("Login")
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        login(
            email, 
            password, 
            (user:any)=>{
                if(user.role === "ADMIN") 
                    router.push("/admin")
                else{
                    getCartItems()
                    getWishlistItems()
                    router.push("/")
                }
            },
            (error:any)=>{
                setError(error)
                console.log(error)
            }
        )
    }
    
    return (
        <Layoutv2>
        <main className="flex items-center justify-center my-32" >
            <div className="px-5 md:p-0 w-full md:w-80" >
                <form onSubmit={loginHandler} >
                    <h1 className="text-3xl font-bold mb-6" >Login</h1>
                    <CustomInput
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        name={"email"}
                        required={true}
                        className={"w-full"}
                        wrapperClass='mb-3'
                        onChange={()=>setError("")}
                    />
                    <CustomInput
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        name={"password"}
                        required={true}
                        className={"w-full"}
                        wrapperClass='mb-3'
                        onChange={()=>setError("")}
                    />
                    {
                        error && <p className="text-red-500" >{error}</p>
                    }
                    <p className="text-blue-500 text-sm" >Dont have account ? <Link href={"/signup"} >signup</Link></p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/3 mt-5" >Login</button>
                </form>
            </div>
        </main>
        </Layoutv2>
    )
}

export default Login

// export async function getServerSideProps(context) {
//     console.log('context', context);
//     const session = await getSession(context);
//     if(session) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false
//             }
//         }
//     }
//     return {
//         props: {
            
//         }
//     }
// }