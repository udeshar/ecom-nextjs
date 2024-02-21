import React from 'react'
import Layout from '@/components/layout/Layout'
import BreadCrumd from '@/components/category/breadCrumd/BreadCrumd'
import Image from 'next/image'
import ReactStars from "react-rating-stars-component";
import Review from '@/components/common/review/Review';
import OverallRating from '@/components/product/OverallRating';

const ProductCard = () => {
  return (
    <Layout>
        <>
            <BreadCrumd />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-4 my-5" >
                    <div className='col-span-2 h-96 md:h-auto bg-slate-100 dark:bg-slate-700 p-10 rounded-sm' >
                        <div className='h-full relative' >
                            <Image src="/assets/images/headphone.png" alt="phone" fill={true} style={{objectFit : "contain"}}  />
                        </div>
                    </div>
                    <div className='col-span-3' >
                        <h1 className="text-xl font-medium" >Excepteur pariatur officia est officia minim culpa in the lorem ipsum text above the hello world</h1>
                        <div className="flex items-center gap-3 mt-3" >
                           <ReactStars
                                count={5}
                                value={3}
                                onChange={()=>{}}
                                size={25}
                                activeColor="#ffd700"
                                edit={false}
                            /> 
                            <p className="text-gray-500 text-sm my-3" >( 44 reviews )</p>
                        </div>
                        <h3 className="font-medium text-xl mt-3" >Description</h3>
                        <p className="text-gray-500 text-sm font-light mt-4" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p className="font-bold text-xl mt-4" >$499.50 USD</p>
                        <div className="flex items-center mt-3" >
                            <p className="text-slate-400" >Offer :</p>
                            <p className="text-blue-600 font-medium ml-2" >15% Cashback</p>
                        </div>
                        <div className="flex items-center mt-1" >
                            <p className="text-slate-400" >Available :</p>
                            <p className="text-green-600 font-medium ml-2" >In Stock</p>
                        </div>
                        {/* Add to cart */}
                        <div className="mt-5" >
                            <button className="bg-blue-600 text-white px-5 py-2 rounded-md" >Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div>
                    {/* Reviews */}
                    <div className="mt-10" >
                        <h1 className="font-medium text-2xl" >Reviews</h1>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-8 my-5" >
                            <div className="col-span-3 order-last md:order-first" >
                                <Review />
                                <Review />
                                <Review />
                                
                            </div>
                            <div className="col-span-2 mb-4 md:mb-0" >
                                <OverallRating />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    </Layout>
  )
}

export default ProductCard