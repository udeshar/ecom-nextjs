import React from 'react'
import Image from 'next/image'

const CartItem = () => {
  return (
    <div className="flex justify-between items-center py-0 md:py-4 px-4 md:px-8 bg-slate-100 dark:bg-slate-600 rounded-md" >
        <div className='flex items-center gap-3 md:gap-5' style={{flex : 3}} >
            <div className="h-32 md:h-36 flex-1 rounded-md p-3" style={{flex : 1}} >
                <div className="w-full h-full relative">
                    <Image src="/assets/images/headphone.png" alt="phone" fill={true} style={{objectFit : "contain"}} />
                </div>
            </div>
            <div className='flex-1' style={{flex : 3}} >
                <h1 className="text-sm md:text-md font-medium my-2" >product name</h1>
                <p className="text-green-500 my-2 text-sm md:text-md" >$499.50 USD</p>
            </div>
        </div>
        <div className='' style={{flex : 1}} >
            <div className="flex justify-end items-center gap-3 md:gap-5" >
                <button className="border border-slate-300 w-8 md:w-10 h-8 md:h-10 flex justify-center items-center rounded-md" >-</button>
                <p className="text-xl" >2</p>
                <button className="border border-slate-300 w-8 md:w-10 h-8 md:h-10 flex justify-center items-center rounded-md" >+</button>
            </div>
        </div>
    </div>
  )
}

export default CartItem