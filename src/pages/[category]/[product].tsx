import React, {useEffect, useState} from 'react'
import Layout from '@/components/layout/Layout'
import BreadCrumd from '@/components/category/breadCrumd/BreadCrumd'
import Image from 'next/image'
import ReactStars from "react-rating-stars-component";
import { useRouter } from 'next/router';
import { useCartContext } from '@/context/cartContext';
import { useWishlistContext } from '@/context/wishlistContext';
import { useUserContext } from '@/context/userContext';
import AddReview from '@/components/product/AddReview';
import BtnUnderline from '@/components/common/custom-button/BtnUnderline';
import { IoCartOutline, IoHeartOutline, IoHeartSharp  } from "react-icons/io5";
import { getAllCategories, getAllProducts, getProductByProductName } from '@/services/api';

const ProductCard = ({product} : {product : any}) => {
    const router = useRouter();
    const {addItem, items} = useCartContext();
    const { addIteminwish, deletewishlist, items : wishlistItems } = useWishlistContext();
    const {user} : {user : any} = useUserContext();
    const {category, product: productName} = router.query;
    // const [reviews, setReviews] = useState<any>(reviewsData || []);
    const [reviews, setReviews] = useState<any>([]);

    const [alredyReviewed, setAlredyReviewed] = useState<boolean>(false);

    const isItemExist = items?.find((item : any) => item.product._id === product._id);
    const data:any = wishlistItems?.filter((item : any) => item.product._id === product._id)

    const getReviews = async  () => {
        fetch(`/api/product/${product.id}/review`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setReviews(data);
        })
        .catch(err => console.log(err))
    }

    // function removeDuplicates(inputArray : any) {
    //     const seen:any = {}; // We'll use an object to keep track of seen objects
    //     const result : any = [];
    
    //     // Loop through each object in the input array
    //     inputArray.forEach((obj : any) => {
    //         const key = JSON.stringify(obj); // Convert the object to a string
    
    //         // If we haven't seen this object before, add it to the result array
    //         if (!seen[key]) {
    //             result.push(obj);
    //             seen[key] = true; // Mark this object as seen
    //         }
    //     });
    
    //     return result; // Return the array with duplicates removed
    // }

    // useEffect(() => {
        // const result = removeDuplicates(
        //     [
        //         {a: 5},
        //         {a: 5},
        //         {c: 10},
        //         {c: 10},
        //         {b: 20, d: 25},
        //         {b: 20, d: 25},
        //         {a: 5, b: 20, c: 10, d: 25}
        //     ]
        // )
        // console.log(result, "***********************")

        //function debounce(func : any, ms : any) {
        //   let timeout : any;
        //    return function() {
        //      clearTimeout(timeout);
        //      timeout = setTimeout(() => func.apply(this, arguments), ms);
        //    };
        //  }
        
        //  const temp = debounce(
       //     ()=>{
        //      alert("hello")
        //    },
        //    3000
        //  )

    // }, [])

    // function debouncetest(func : any, ms : any) {
    //     let timeout : any;
    //     return function() {
    //       clearTimeout(timeout);
    //       timeout = setTimeout(() => func.apply(this, arguments), ms);
    //     };
    // }
    // function debounce(func, delay) {
    //     let timeoutId;
    //     return function() {
    //         const context = this;
    //         const args = arguments;
    //         clearTimeout(timeoutId);
    //         timeoutId = setTimeout(() => {
    //             func.apply(context, args);
    //         }, delay);
    //     };
    // }

    // function myFunction() {
    //     console.log('This function will be debounced');
    // }

    // const debouncedFunction = debounce(myFunction, 300);

    useEffect(() => {
        if(user){
            const alredyReviewed = reviews.some((review : any) => {
                if(review.userId == (user as any).id){
                    return true;
                }
                return false;
            })
            setAlredyReviewed(alredyReviewed);
        }
    }, [user, reviews])

  return (
    <Layout>
        <>
            <BreadCrumd firstTitle={category as string} secondTitle={productName as string} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-4 my-5" >
                    <div className='col-span-2 h-96 md:h-auto bg-slate-100 dark:bg-slate-700 p-10 rounded-sm' >
                        <div className='h-full relative' >
                            <Image src={product?.imagePath || '/assets/images/headphone.png'} alt="phone" fill={true} style={{objectFit : "contain"}}  />
                        </div>
                    </div>
                    <div className='col-span-3' >
                        <h1 className="text-xl font-medium" >{product?.name}</h1>
                        {/* <button onClick={()=>{
                            console.log("hello")
                            debouncedFunction();
                        }} >click here</button> */}
                        <div className="flex items-center gap-3 mt-3" >
                           <ReactStars
                                count={5}
                                value={product?.rating}
                                onChange={()=>{}}
                                size={25}
                                activeColor="#ffd700"
                                edit={false}
                            /> 
                            <p className="text-gray-500 text-sm my-3" >{`(${reviews.length} reviews)`}</p>
                        </div>
                        <h3 className="font-medium text-xl mt-3" >Description</h3>
                        <p className="text-gray-500 text-sm font-light mt-4" >{product?.description}</p>
                        <p className="font-bold text-xl mt-4" >₹ {product?.price}</p>
                        <div className="flex items-center mt-3" >
                            <p className="text-slate-400" >Offer :</p>
                            <p className="text-blue-600 font-medium ml-2" >{product?.offer}% Cashback</p>
                        </div>
                        <div className="flex items-center mt-1" >
                            <p className="text-slate-400" >Available :</p>
                            <p className="text-green-600 font-medium ml-2" >{product?.availability}</p>
                        </div>
                        {/* Add to cart */}
                        <div className="flex gap-5 items-center" >
                            <div>
                                <div className="mt-5" >
                                    <button onClick={()=> router.push('/checkout/'+ product?._id) } className="bg-blue-600 text-white px-5 py-2 rounded-md" >Buy Now</button>
                                </div>
                            </div>
                            <div className="flex gap-5 items-center" >
                                {
                                    isItemExist && 
                                    <div className="mt-5" >
                                        <BtnUnderline onClick={()=> router.push('/cart')} >Go to cart <IoCartOutline size={20} className='inline ml-1' /></BtnUnderline>
                                    </div> || 
                                    <div className="mt-5" >
                                        <BtnUnderline onClick={()=> addItem(product?._id)} >Add to Cart <IoCartOutline size={20} className='inline ml-1' /></BtnUnderline>
                                    </div>
                                }
                                {
                                    data && data.length > 0 && data[0].product.id === product?.id &&
                                    <div className="mt-5" >
                                        <IoHeartSharp onClick={()=> deletewishlist(data[0].product)} size={23} className="cursor-pointer text-red-400" />
                                        {/* <button onClick={()=> deletewishlist(data[0])} className="bg-red-600 text-white px-5 py-2 rounded-md" >Remove from wishlist</button> */}
                                    </div> || <div className="mt-5" >
                                        <IoHeartOutline onClick={()=> addIteminwish(product?._id)} size={23} className="cursor-pointer text-red-400" />
                                        {/* <button onClick={()=> addIteminwish(product?.id)} className="bg-red-600 text-white px-5 py-2 rounded-md" >Add to wishlist</button> */}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {/* Reviews */}
                    <div className="mt-10" >
                        {
                            user && (
                                !alredyReviewed &&
                                <>
                                    <h1 className="font-medium text-2xl" >Reviews</h1>
                                    <AddReview productid={product.id} callBack={getReviews} /> 
                                </>
                            )
                        }
                        {/* {
                            reviews.length > 0 &&
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-8 my-10 mt-10" >
                                    <div className="col-span-3 order-last md:order-first" >
                                        <h3 className="font-medium text-xl" >All Reviews</h3>
                                        {
                                            reviews && reviews.length > 0 && reviews.map((review : any, index : number) => (
                                                <Review key={index} review={review} />
                                            )) || <p className="text-gray-500 text-sm" >No reviews yet</p>
                                        }
                                    </div>
                                    <div className="col-span-2 mb-4 md:mb-0" >
                                        <OverallRating reviews={reviews} />
                                    </div>
                                </div>
                            </>
                        } */}
                        
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

    const productData = await getProductByProductName(product);

    // const productData = await prisma.product.findUnique({
    //     where: {
    //         name: product
    //     }
    // });

    // const reviews = await prisma.review.findMany({
    //     where: {
    //         productId: productData?.id
    //     },
    //     include: {
    //         user: true
    //     }
    // });

    // await prisma.$disconnect();

    return {
        props: {
            product : productData
            // reviewsData : JSON.parse(JSON.stringify(reviews))
        },
        revalidate: 30
    }
}

export async function getStaticPaths() {
    // const products = await prisma.product.findMany();
    // const categories = await prisma.category.findMany();

    const products = await getAllProducts();
    const categories = await getAllCategories();

    const paths = products.map((product : any) => {
        return {
            params: {
                category: categories.find((category : any) => category.id === product.categoryId)?.name,
                product: product.name
            }
        }
    });

    return {
        paths,
        fallback: 'blocking'
    }
}