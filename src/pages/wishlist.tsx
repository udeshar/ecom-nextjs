import React, {useEffect, useState} from 'react'
import Layout from '@/components/layout/Layout'
import BreadCrumd from '@/components/category/breadCrumd/BreadCrumd'
import WishlistItem from '@/components/cart/WishlistItem'
import { useWishlistContext } from '@/context/wishlistContext'
import { useUserContext } from '@/context/userContext'
import { useRouter } from 'next/router'

const Wishlistt = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {items, getWishlistItems} = useWishlistContext();
  const { isUserLoggedIn } = useUserContext();
  const [ isUser, setIsUser ] = useState(false)
  const router = useRouter();

  useEffect(() => {
    isUserLoggedIn(()=>{ setIsUser(true) }, () => {router.push('/login')})
  }, [])
  
  useEffect(() => {
    getWishlistItems();
  }, [])
  
  if(!isUser) return null

  return (
    <Layout>
        <BreadCrumd firstTitle='Wishlist' secondTitle='' />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5" >
                {
                    items.length > 0 ? items.map((item, index) => (
                        <WishlistItem key={index} item={item} />
                    )) : <h1 className="text-2xl text-center">No items in wishlist</h1>
                }
            </div>
        </div>
    </Layout>
  )
}

export default Wishlistt