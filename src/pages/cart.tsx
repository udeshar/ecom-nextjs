import React from 'react'
import Layout from '@/components/layout/Layout'
import BreadCrumd from '@/components/category/breadCrumd/BreadCrumd'
import CartItem from '@/components/cart/CartItem'

const cart = () => {
  return (
    <Layout>
        <BreadCrumd />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5" >
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </div>
        </div>
    </Layout>
  )
}

export default cart