import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout/Layout'
import BreadCrumd from '@/components/category/breadCrumd/BreadCrumd'
import CartItem from '@/components/cart/CartItem'
import { useCartContext } from '@/context/cartContext'
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/userContext'

const Cart = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {items, getCartItems} = useCartContext();
  const { isUserLoggedIn } = useUserContext();
  const [ isUser, setIsUser ] = useState(false)
  const router = useRouter();

  useEffect(() => {
    isUserLoggedIn(()=>{ setIsUser(true) }, () => {router.push('/login')})
  }, [])
  
    useEffect(() => {
      getCartItems();
    }, [])
    
    if(!isUser) return null

  return (
    <Layout>
        <BreadCrumd firstTitle='Cart' secondTitle='' />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5" >
                {
                    items.length > 0 ? items.map((item, index) => (
                        <CartItem key={(item as any)._id} item={item} />
                    )) : <h1 className="text-2xl text-center">No items in cart</h1>
                }
            </div>
            {
                items.length > 0 && (
                    <div className="mt-8">
                        <button onClick={()=> router.push('/checkout') } className="bg-black text-white px-3 py-2 rounded-md w-full md:w-60">Checkout</button>
                    </div>
                )
            }
        </div>
    </Layout>
  )
}

export default Cart