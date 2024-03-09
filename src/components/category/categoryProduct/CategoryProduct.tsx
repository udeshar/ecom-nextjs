import React from 'react'
import ProductCard from '../../home/card/ProductCard'

interface IAdminProps {
    products: any,
    user : "Admin" | "User",
    categoryName? : string
}


const CategoryProduct = ({products, user, categoryName} : IAdminProps) => {
  return (
    <div className="mt6 mb-10" >
        <div className="grid grid-cols-4 gap-4 sm:gap-8 my-5" >
          {
              products?.map((product : any) => {
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