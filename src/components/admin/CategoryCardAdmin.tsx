import React from 'react'
import Image from 'next/image'
import BtnUnderline from '@/components/common/custom-button/BtnUnderline'
import { category } from '@prisma/client'
import { useRouter } from 'next/router'

interface IAdminProps {
  category: any
}

const CategoryCardAdmin = ({category} : IAdminProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/admin/category/${category.name}`)
  }

  const handleBtnClick = (e:React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation()
    router.push(`/admin/category/${category.name}/products`)
  }

  return (
    <div onClick={handleClick} className='dark:bg-slate-700 bg-slate-100 p-3 py-4 sm:p-5 col-span-1 rounded-md flex justify-between' >
        <div className='flex-1' >
            <p className="text-xs sm:text-md text-slate-500 font-normal" >{category.count} Products</p>
            <p className="text-xs sm:text-md md:text-lg font-bold my-2" >{category.name}</p>
            <BtnUnderline onClick={handleBtnClick} className="mt-2" width="w-10" >See Products</BtnUnderline>
        </div>
        <div className="relative flex-auto justify-end text-right" >
          {
            category.imagePath && 
            <Image src={category.imagePath} alt="watch" fill={true} style={{objectFit : "contain"}} />          
          }
        </div>
    </div>
  )
}

export default CategoryCardAdmin