import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout/Layout'
import Container from '@/components/common/container/Container'
import CheckoutMain from '@/components/checkout/CheckoutMain'
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/userContext';
import { useProductsContext } from '@/context/productContext';

const CheckoutItem = ({} : any) => {

    const { isUserLoggedIn, getAllAddresses } = useUserContext();
    const { getProductById } = useProductsContext();
    const [ product, setProduct ] = useState(null)
    const [ isUser, setIsUser ] = useState(false)
    const router = useRouter();

    const productid = router.query.productid as string;

    useEffect(() => {
        isUserLoggedIn(()=>{ setIsUser(true) }, () => {router.push('/login')})
    }, [])

    useEffect(() => {
        getAllAddresses();
    }, [])

    useEffect(() => {
        if(productid)
            getProductById(productid, (product : any) => {
                setProduct(product)
            });
    }, [productid])

    if(!isUser) return null

  return (
    <Layout>
        <Container className="py-8" >
            {
                !product ? 
                <div>Loading...</div> :
                <CheckoutMain items={[{product: product, quantity : 1}]} />
            }
        </Container>
    </Layout>
  )
}

export default CheckoutItem