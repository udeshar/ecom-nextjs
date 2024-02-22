import React, {useState} from 'react'
import ProductCard from '../card/ProductCard'
import { product, category } from '@prisma/client'
import { Tabs } from 'flowbite-react';
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';

interface Props {
  products: any;
  bestSeller: any;
  featured: any;
  offered: any;
}

const tabData = [
  {
    id : 0,
    title : "All"
  },
  {
    id : 1,
    title : "Featured"
  },
  {
    id : 2,
    title : "Best Seller"
  },
  {
    id : 3,
    title : "Offers"
  }
]

const ProductList = ({products, bestSeller, featured, offered}: Props) => {

  const [activeTab, setActiveTab] = useState(tabData[0]);

  return (
    <div className="mt-12 mb-10" >
        <div className="flex flex-col md:flex-row justify-between items-center">
            <h3 className="font-bold text-lg sm:text-xl md:text-3xl" >Exclusive Product</h3>
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5 my-3 md:my-0" >
                {/* <p className="cursor-pointer text-xs sm:text-sm text-blue-400 font-medium" >Best Seller</p>
                <p className="cursor-pointer text-xs sm:text-sm  font-medium" >Featured</p>
                <p className="cursor-pointer text-xs sm:text-sm  font-medium" >New Arrival</p>
                <p className="cursor-pointer text-xs sm:text-sm  font-medium" >Offers</p> */}
                {
                  tabData.map((tab : any, index : any) => {
                    return <div key={index} className={"cursor-pointer text-xs sm:text-sm font-medium " + (activeTab.id === tab.id ? "text-blue-400" : "")} onClick={() => setActiveTab(tab)} >{tab.title}</div>
                  })
                }
            </div>
        </div>
        <hr className="mt-5 dark:border-slate-600 border-slate-100 border-t" />
        <div className="grid grid-cols-4 gap-4 sm:gap-8 my-5" >
          {
            activeTab.id === 0 && 
            products?.map((product : any, index : any) => {
              return <ProductCard key={index} product={product} user={"User"} categoryName={product?.category?.name} />
            }) || activeTab.id === 1 &&
            featured?.map((product : any, index : any) => {
              return <ProductCard key={index} product={product} user={"User"} categoryName={product?.category?.name} />
            }) || activeTab.id === 2 &&
            bestSeller?.map((product : any, index : any) => {
              return <ProductCard key={index} product={product} user={"User"} categoryName={product?.category?.name} />
            }) || activeTab.id === 3 &&
            offered?.map((product : any, index : any) => {
              return <ProductCard key={index} product={product} user={"User"} categoryName={product?.category?.name} />
            })
          }
          {
            activeTab.id === 0 && products?.length === 0 && 
            <p className="col-span-4 text-center text-lg font-bold text-slate-500" >No Product Found</p> 
            || 
            activeTab.id === 1 && featured?.length === 0 && 
            <p className="col-span-4 text-center text-lg font-bold text-slate-500" >No Product Found</p> 
            || 
            activeTab.id === 2 && bestSeller?.length === 0 && 
            <p className="col-span-4 text-center text-lg font-bold text-slate-500" >No Product Found</p> 
            || 
            activeTab.id === 3 && offered?.length === 0 && 
            <p className="col-span-4 text-center text-lg font-bold text-slate-500" >No Product Found</p>
          }
        </div>
    </div>
  )
}

export default ProductList