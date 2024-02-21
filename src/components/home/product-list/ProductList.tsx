import React from 'react'
import ProductCard from '../card/ProductCard'
import { product } from '@prisma/client'

interface Props {
  products: product[];
}

const ProductList = ({products}: Props) => {
  return (
    <div className="mt-12 mb-10" >
        <div className="flex flex-col md:flex-row justify-between items-center">
            <h3 className="font-bold text-lg sm:text-xl md:text-3xl" >Exclusive Product</h3>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5 my-3 md:my-0" >
                <p className="cursor-pointer text-xs sm:text-sm text-blue-400 font-medium" >Best Seller</p>
                <p className="cursor-pointer text-xs sm:text-sm  font-medium" >Featured</p>
                <p className="cursor-pointer text-xs sm:text-sm  font-medium" >New Arrival</p>
                <p className="cursor-pointer text-xs sm:text-sm  font-medium" >Offers</p>
            </div>
        </div>
        <hr className="mt-5 dark:border-slate-600 border-slate-100 border-t" />
        <div className="grid grid-cols-4 gap-4 sm:gap-8 my-5" >
          {
            products?.map((product, index) => {
              return <ProductCard key={index} product={product} user={"User"} />
            })
          }
        </div>
    </div>
  )
}

export default ProductList