import React from 'react'
import Layout from '@/components/layout/Layout'
import Container from '@/components/common/container/Container'
import CheckoutMain from '@/components/checkout/CheckoutMain'
import cookie from 'cookie';
import { checkIfUserExist2 } from '@/helpers/dbUtils'
import { PrismaClient } from '@prisma/client'

const CheckoutItem = ({addresses, product} : any) => {
  return (
    <Layout>
        <Container className="py-8" >
            <CheckoutMain addresses={addresses} items={[{product: product, quantity : 1}]} />
        </Container>
    </Layout>
  )
}

export default CheckoutItem

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

    const productid = context.params.productid;

    const prisma = new PrismaClient();
    const addresses = await prisma.address.findMany({
        where: {
            userId: user.id
        }
    });
    const product = await prisma.product.findUnique({
        where: {
            id: productid
        }
    });
    if(!product){
        return {
            notFound: true,
        }
    }
    return {
        props: {
            addresses : JSON.parse(JSON.stringify(addresses)),
            product: JSON.parse(JSON.stringify(product))
        }
    }
}