import React from 'react'
import Layout from '@/components/layout/Layout'
import BreadCrumd from '@/components/category/breadCrumd/BreadCrumd'
import CartItem from '@/components/cart/CartItem'
import { PrismaClient, cartItems } from '@prisma/client'
import cookie from 'cookie';
import { checkIfUserExist, checkIfUserExist2 } from '@/helpers/dbUtils'
import { v4 as uuidv4 } from 'uuid';
import { useCartContext } from '@/context/cartContext'

interface ICartProps {
  cartItems: cartItems[]
}

const cart = ({cartItems} : ICartProps) => {
  console.log(cartItems)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {items} = useCartContext();
  return (
    <Layout>
        <BreadCrumd firstTitle='Cart' secondTitle='' />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5" >
                {
                    items.length > 0 ? items.map((item, index) => (
                        <CartItem key={index} item={item} />
                    )) : <h1 className="text-2xl text-center">No items in cart</h1>
                }
            </div>
            {
                items.length > 0 && (
                    <div className="mt-8">
                        <button className="bg-black text-white px-3 py-2 rounded-md w-full md:w-60">Checkout</button>
                    </div>
                )
            }
        </div>
    </Layout>
  )
}

export default cart

export const getServerSideProps = async (context : any) => {

  const redr = {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
  const cookies = cookie.parse(context.req.headers.cookie || '');
  const token = cookies.token;
  if(!token){
    return redr
  }
  const user = await checkIfUserExist2(token);
  if (!user) {
    return redr
  }

  const prisma = new PrismaClient();
  const cart = await prisma.cart.findUnique({
      where: {
          userId: user.id,
      }
  });
  if(!cart){
    await prisma.cart.create({
      data: {
        id: uuidv4(),
        userId: user.id
      }
    })
    return{
      props: {
        cartItems: []
      }
    }
  }
  const cartItems = await prisma.cartItems.findMany({
    where:{
        cartId : cart.id
    },
    include: {
        product: true
    }
  })
  return {
      props: {
          cartItems : JSON.parse(JSON.stringify(cartItems))
      },
  }
}