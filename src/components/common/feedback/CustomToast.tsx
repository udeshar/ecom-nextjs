import React from 'react'
import { Toast } from 'flowbite-react';
import { HiX } from 'react-icons/hi';
import { FaRegClock } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useAppContext } from '@/context/appContext';

const CustomToast = () => {

    const { error, setError, type } = useAppContext()

    if(!error) return null

    let pendingClasses = " bg-yellow-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200 fixed top-10 right-10 z-50"
    let successClasses = " bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200 fixed top-10 right-10 z-50"
    let errorClasses = " bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200 fixed top-10 right-10 z-50"

    setTimeout(() => {
        if(type === "Success" || type === "Pending")
            setError(null)
    }, 5000)

    return (
        <Toast className={type === "Pending" ? pendingClasses : type === "Success" ? successClasses : errorClasses}>
            <div className={"inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"}>
                {type === "Pending" && <FaRegClock className="h-5 w-5" />}
                {type === "Success" && <FaCheck className="h-5 w-5" />}
                {type === "Error" && <HiX className="h-5 w-5" />}
            </div>
            <div className="ml-3 text-sm font-normal">{error}</div>
            <Toast.Toggle onDismiss={() => setError(null)} />
        </Toast>
    )
}

export default CustomToast