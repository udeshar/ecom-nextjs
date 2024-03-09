import React, {useState} from "react";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import styles from "./card.module.css";
import BtnUnderline from "@/components/common/custom-button/BtnUnderline";
import { IoCartOutline, IoHeartOutline, IoHeartSharp  } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { Toast } from 'flowbite-react';
import { HiX } from 'react-icons/hi';
import { useCartContext } from "@/context/cartContext";
import { useWishlistContext } from "@/context/wishlistContext";
import { API_URL } from "@/helpers/constants";

const ProductCard = ({product, user, categoryName} : {product : any, user : "Admin" | "User", categoryName? : string}) => {

  const router = useRouter();
  const ratingChanged = (newRating: any) => {
    console.log(newRating);
  };
  const { addItem, items : cartItems, removeItem } = useCartContext();
  const { addIteminwish, deletewishlist, items : wishlistItems } = useWishlistContext();

  const [isFav, setIsFav] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProductClick = () => {
    router.push(`/${categoryName}/${product.name}`);
  }

  const deleteHandler = () => {
    fetch( API_URL + '/api/product/'+ product._id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token') || '')
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.error){
            setError(data.message);
        }
        else{
            setError(null);
            router.back();
        }
    })
  }

  const data:any = wishlistItems.filter((item : any) => item.product.id === product.id)
  const data2:any = cartItems.filter((item : any) => item.product.id === product.id)

  return (
    <div className={`relative overflow-hidden product-card transition mt-1 sm:mt-3 col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 ` + styles.productcard} >
      <div onClick={()=> user == 'User' ?  handleProductClick() : null } className={"flex flex-col justify-center " + styles.cardMainContent}>
        <div className={`${user == "User" && 'cursor-pointer '}bg-slate-100 dark:bg-slate-700 rounded relative h-40 sm:h-60 md:h-80 w-full ` + styles.imageWrap}>
          <Image
            src={product.imagePath ? product.imagePath : "/assets/images/headphone.png"}
            alt="headphone"
            fill={true}
            style={{ objectFit: "contain", padding: 20 }}
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mt-2">
          <h2 className="font-bold text-sm sm:text-md ">{product.name}</h2>
          <ReactStars
            count={5}
            value={product.rating}
            onChange={ratingChanged}
            size={18}
            activeColor="#ffd700"
            edit={false}
          />
        </div>
        <p className="text-sm text-gray-500">₹{product.price}</p>
      </div>
      <div className={"relative lg:absolute w-full flex justify-between my-2 lg:my-0 " + styles.cardBtn} >
        {
          user === "User" &&
          <>
            {
              data2 && data2.length > 0 && data2[0].product.id === product.id && 
              <BtnUnderline className="" onClick={()=> removeItem(data2[0], 0)} width={"w-12"} ><div className="flex gap-2 items-center" ><IoCartOutline size={20} /> <p>Remove from cart</p></div></BtnUnderline> ||
              <BtnUnderline className="" onClick={()=> addItem(product._id)} width={"w-12"} ><div className="flex gap-2 items-center" ><IoCartOutline size={20} /> <p>Add to Cart</p></div></BtnUnderline>
            }
              {/* {isFav ? <IoHeartSharp size={22} className={"cursor-pointer text-red-400"} onClick={()=>{
                console.log(product.id);
                addIteminwish(product.id);
                // setIsFav(!isFav);
              }} /> : <IoHeartOutline size={22} className={"cursor-pointer text-red-400"} onClick={()=>{
                console.log(product.id);
                addIteminwish(product.id);
                // setIsFav(!isFav);
              }} />} */}
              {
                data && data.length > 0 && data[0].product.id === product.id &&
                <IoHeartSharp size={22} className={"cursor-pointer text-red-400"} onClick={()=>{
                  deletewishlist(data[0].product);
                }} /> ||
                <IoHeartOutline size={22} className={"cursor-pointer text-red-400"} onClick={()=>{
                  addIteminwish(product._id);
                }} />
              }
          </>
          ||
          <>
            <BtnUnderline className="" onClick={()=>{router.push(`/admin/category/${categoryName}/${product.name}`)}} width={"w-12"} ><div className="flex gap-2 items-center" ><FaRegEdit size={20} /> <p>Edit Product</p></div></BtnUnderline>
            <MdOutlineDeleteOutline onClick={deleteHandler} size={26} className={"cursor-pointer text-red-400"} />
          </>
        }
      </div>
      {
        error &&
        <Toast className='absolute top-0 right-0' >
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                <HiX className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{error}</div>
            <Toast.Toggle onDismiss={() => setError(null)} />
        </Toast>
      }
    </div>
  );
};

export default ProductCard;
