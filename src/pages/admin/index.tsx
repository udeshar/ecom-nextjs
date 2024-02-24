import React from 'react'
import LayoutAdmin from '@/components/layout/LayoutAdmin'
import Container from '@/components/common/container/Container'
// import ExploreCategory from '@/components/home/explore-category/ExploreCategory'
import CategoriesAdmin from '@/components/admin/CategoriesAdmin'
import { Button } from 'flowbite-react'
import Link from 'next/link'
import { PrismaClient, category } from '@prisma/client'
import { checkIfAdminExist2 } from '@/helpers/dbUtils'
import cookie from 'cookie';
import { CustomError } from '@/helpers/CustomError'

interface IAdminProps {
  categories: category[]
}

const admin = ({categories} : IAdminProps  ) => {
  console.log(categories)
  return (
    <LayoutAdmin>
      <Container className='py-5' >
        <CategoriesAdmin categories={categories} />
        {/* Add Product button */}
        <div className='flex justify-start my-8 pt-5'>
          <Link href='/admin/add-product'>
            <Button  >
              Add New Product
            </Button>
          </Link>
        </div>
      </Container>
    </LayoutAdmin>
  )
}

export default admin

export async function getServerSideProps(context:any) {

  try {
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
    const admin = await checkIfAdminExist2(token);
    if (!admin) {
      return redr
    }
  
    const prisma = new PrismaClient()
    const categories = await prisma.category.findMany()
    const eachProductCountInCategory = await Promise.all(categories.map(async (category) => {
      const count = await prisma.product.count({
        where: {
          category: {
            name: category.name
          }
        }
      })
      return{
        ...category,
        count
      }
    }))
    prisma.$disconnect()
    return {
      props: {
        categories : JSON.parse(JSON.stringify(eachProductCountInCategory))
      },
    }
  } catch (error: CustomError | any) {
      console.log(error)
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
  }

}