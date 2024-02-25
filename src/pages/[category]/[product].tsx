import React from 'react'
import Layout from '@/components/layout/Layout'
import BreadCrumd from '@/components/category/breadCrumd/BreadCrumd'
import Image from 'next/image'
import ReactStars from "react-rating-stars-component";
import Review from '@/components/common/review/Review';
import OverallRating from '@/components/product/OverallRating';
import { PrismaClient, product } from '@prisma/client';
import { useRouter } from 'next/router';
import { useCartContext } from '@/context/cartContext';
import { useWishlistContext } from '@/context/wishlistContext';

const ProductCard = ({product} : {product : product}) => {
    const router = useRouter();
    const {addItem, items} = useCartContext();
    const { addIteminwish, deletewishlist, items : wishlistItems } = useWishlistContext();

    const {category, product: productName} = router.query;

    const isItemExist = items?.find((item : any) => item.product.id === product.id);
    const data:any = wishlistItems?.filter((item : any) => item.product.id === product.id)

  return (
    <Layout>
        <>
            <BreadCrumd firstTitle={category as string} secondTitle={productName as string} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-4 my-5" >
                    <div className='col-span-2 h-96 md:h-auto bg-slate-100 dark:bg-slate-700 p-10 rounded-sm' >
                        <div className='h-full relative' >
                            <Image src={product.imagePath!} alt="phone" fill={true} style={{objectFit : "contain"}}  />
                        </div>
                    </div>
                    <div className='col-span-3' >
                        <h1 className="text-xl font-medium" >{product.name}</h1>
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
                        <p className="text-gray-500 text-sm font-light mt-4" >{product.description}</p>
                        <p className="font-bold text-xl mt-4" >₹ {product.price}</p>
                        <div className="flex items-center mt-3" >
                            <p className="text-slate-400" >Offer :</p>
                            <p className="text-blue-600 font-medium ml-2" >{product.offer}% Cashback</p>
                        </div>
                        <div className="flex items-center mt-1" >
                            <p className="text-slate-400" >Available :</p>
                            <p className="text-green-600 font-medium ml-2" >{product.availability}</p>
                        </div>
                        {/* Add to cart */}
                        <div className="flex gap-5 items-center" >
                        {
                            isItemExist && <div className="mt-5" >
                                <button onClick={()=> router.push('/cart')} className="bg-blue-600 text-white px-5 py-2 rounded-md" >Go to cart</button>
                            </div> || <div className="mt-5" >
                                <button onClick={()=> addItem(product.id)} className="bg-blue-600 text-white px-5 py-2 rounded-md" >Add to Cart</button>
                            </div>
                        }
                        {
                            data && data.length > 0 && data[0].product.id === product.id &&
                            <div className="mt-5" >
                                <button onClick={()=> deletewishlist(data[0])} className="bg-red-600 text-white px-5 py-2 rounded-md" >Remove from wishlist</button>
                            </div> || <div className="mt-5" >
                                <button onClick={()=> addIteminwish(product.id)} className="bg-red-600 text-white px-5 py-2 rounded-md" >Add to wishlist</button>
                            </div>
                        }
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

export async function getStaticProps({params} : any) {

    const product = params.product;

    console.log(product);

    const prisma = new PrismaClient();
    const productData = await prisma.product.findUnique({
        where: {
            name: product
        }
    });

    console.log(productData);

    return {
        props: {
            product : JSON.parse(JSON.stringify(productData))
        },
    }
}

export async function getStaticPaths(context : any) {
    const prisma = new PrismaClient();
    const products = await prisma.product.findMany();
    const categories = await prisma.category.findMany();

    const paths = products.map((product : any) => {
        return {
            params: {
                category: categories.find((category : any) => category.id === product.categoryId)?.name,
                product: product.name
            }
        }
    });

    console.log(paths);

    return {
        paths,
        fallback: true
    }
}