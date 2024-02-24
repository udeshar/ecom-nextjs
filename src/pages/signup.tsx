import React, { FormEvent } from 'react'
import CustomInput from '@/components/common/custom-input/CustomInput';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layoutv2 from '@/components/layout/Layoutv2';

const Signup = () => {

    const router = useRouter();

    const handleSignup = (e:FormEvent) => {
        e.preventDefault()
        console.log("Signup")
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                confirmPassword
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(async data => {
                if (data.error) {
                    alert(data.message)
                }
                else {
                    console.log(data)
                    // const result = await signIn("credentials", {
                    //     email: e.target.email.value,
                    //     password: e.target.password.value,
                    //     redirect: false,
                    // })
                    // if (!result.error) {
                    //     console.log("Login success")
                    //     router.push("/")
                    // }
                    // else {
                    //     alert(data.message)
                        router.push("/login")
                    // }
                }
            })
            .catch(err => alert(err))
    }

    return (
        <Layoutv2>
        <main className="flex items-center justify-center my-32" >
            <div className="w-80" >
                <form onSubmit={handleSignup} >
                    <h1 className="text-3xl font-bold mb-6" >Signup</h1>
                    <CustomInput
                        id='email'
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        name={"email"}
                        required={true}
                        className={"w-full"}
                        wrapperClass='mb-3'
                    />
                    <CustomInput
                        id='password'
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        name={"password"}
                        required={true}
                        className={"w-full"}
                        wrapperClass='mb-3'
                    />
                    <CustomInput
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        placeholder="Enter your password"
                        name={"confirmPassword"}
                        required={true}
                        className={"w-full"}
                        wrapperClass='mb-3'
                    />
                    <p className="text-blue-500 text-sm" >Already have account ? <Link href={"/login"} >login</Link></p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/3 mt-5" >Signup</button>
                </form>
            </div>
        </main>
        </Layoutv2>
    )
}

export default Signup

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