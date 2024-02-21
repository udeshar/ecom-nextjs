import React from 'react'
import ProductCard from '../../home/card/ProductCard'
import { PrismaClient, product } from '@prisma/client'

interface IAdminProps {
    products: product[],
    user : "Admin" | "User",
    categoryName? : string
}


const CategoryProduct = ({products, user, categoryName} : IAdminProps) => {
  return (
    <div className="mt6 mb-10" >
        <div className="grid grid-cols-4 gap-4 sm:gap-8 my-5" >
          {
              products?.map((product) => {
                  return (
                      <ProductCard key={product.id} product={product} user={user} categoryName={categoryName} />
                  )
              })
          }
        </div>
    </div>
  )
}

export default CategoryProduct