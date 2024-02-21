import React from 'react'
import Image from 'next/image'
import BtnUnderline from '@/components/common/custom-button/BtnUnderline'
import { category } from '@prisma/client'
import { useRouter } from 'next/router'

const CategoryCard = ({category} : {category : category}) => {

  const router = useRouter();

  return (
    <div className='dark:bg-slate-700 bg-slate-100 p-3 py-4 sm:p-5 col-span-1 rounded-md flex justify-between' >
        <div className='flex-1' >
            <p className="text-xs sm:text-md text-slate-500 font-normal" >Top Deal</p>
            <p className="text-xs sm:text-md md:text-lg font-bold my-2" >{category.name}</p>
            <BtnUnderline onClick={()=>{ router.push(`/${category.name}`) }} className="mt-2" width="w-10" >Shop Now</BtnUnderline>
        </div>
        <div className="relative flex-auto justify-end text-right" >
            <Image src={category.imagePath!} alt="watch" fill={true} style={{objectFit : "contain"}} />
        </div>
    </div>
  )
}

export default CategoryCard