import React from 'react'
import Image from 'next/image'
import BtnUnderline from '../common/custom-button/BtnUnderline'
import { IoMdAdd } from "react-icons/io";
import { useRouter } from 'next/router';

const AddCategoryCard = () => {
  const router = useRouter()
  return (
    <div onClick={()=>router.push("/admin/category/add-category")} className='dark:bg-slate-700 bg-slate-100 p-3 py-4 sm:p-5 col-span-1 rounded-md flex justify-center items-center border-dotted pointer cursor-pointer' >
        <div className="text-center" >
            <IoMdAdd className="text-xl text-center mx-auto" />
            <p className="text-md font-medium" >Add Category</p>
        </div>
    </div>
  )
}

export default AddCategoryCard