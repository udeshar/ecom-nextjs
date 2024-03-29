import React from 'react'
import Layout from '@/components/layout/Layout'
import CategoryProduct from '@/components/category/categoryProduct/CategoryProduct'
import CustomSelect from '@/components/common/custom-input/CustomSelect'
import CustomInput from '@/components/common/custom-input/CustomInput'
import BreadCrumd from '@/components/category/breadCrumd/BreadCrumd'
import { BiSearch } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { PrismaClient, product } from '@prisma/client'
import { Button } from 'flowbite-react'
import Link from 'next/link'
import { checkIfAdminExist2 } from '@/helpers/dbUtils'
import cookie from 'cookie'
import LayoutAdmin from '@/components/layout/LayoutAdmin'

interface IAdminProps {
    products: product[]
}

const AdminProducts = ({products} : IAdminProps) => {

    const router = useRouter();
    const { name } = router.query;

  return (
    <LayoutAdmin>
        <>
        <BreadCrumd firstTitle={name as string} secondTitle='products' />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row mt-8 justify-between sm:items-center gap-5 sm:gap-0" >
                <div className="flex items-center gap-3" >
                    <p>Select</p>
                    <CustomSelect 
                        options={[
                            { value: '5', label: '5' },
                            { value: '10', label: '10' },
                            { value: '20', label: '20' },
                            { value: '50', label: '50' }
                        ]} 
                        name={''} 
                        id={''}                    
                    />
                    <p>Entries</p>
                </div>
                <div className="flex items-center gap-2" >
                    <CustomInput 
                        id="search"
                        name="search"
                        type="text"
                        className=""
                        placeholder="search"
                    />
                    <button className="bg-blue-400 text-white px-3 py-2 rounded-md" ><BiSearch size={20} /></button>
                </div>
            </div>
            <CategoryProduct products={products} user={"Admin"} categoryName={name as string} />
            <div className='flex justify-start my-8 pt-5'>
                <Link href='/admin/add-product'>
                    <Button  >
                        Add New Product
                    </Button>
                </Link>
            </div>
        </div>
        </>
    </LayoutAdmin>
  )
}

export default AdminProducts

export async function getServerSideProps(context:any){

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

    const {name} = context.params;

    const prisma = new PrismaClient();

    console.log(name);

    const category = await prisma.category.findUnique({
        where: {
            name: name
        }
    });

    if (!category) {
        console.log(category, "*****************")
        return {
            notFound: true
        }
    }

    const products = await prisma.product.findMany({
        where: {
            categoryId: category.id
        }
    })
    await prisma.$disconnect();
    return {
        props: {
            products : JSON.parse(JSON.stringify(products)),
        }
    }
}