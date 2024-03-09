import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout/Layout'
import Container from '@/components/common/container/Container'
import CheckoutMain from '@/components/checkout/CheckoutMain'
import { useCartContext } from '@/context/cartContext'
import { useUserContext } from '@/context/userContext'
import { useRouter } from 'next/router'

const Checkout = ({} : any) => {
    const { items } = useCartContext();
    const { isUserLoggedIn, getAllAddresses } = useUserContext();
    const [ isUser, setIsUser ] = useState(false)
    const router = useRouter();

    useEffect(() => {
        isUserLoggedIn(()=>{ setIsUser(true) }, () => {router.push('/login')})
    }, [])

    useEffect(() => {
        getAllAddresses();
    }, [])

    
    if(!isUser) return null

    return (
        <Layout>
            <Container className="py-8" >
                <CheckoutMain items={items} />
            </Container>
        </Layout>
    )
}

export default Checkout