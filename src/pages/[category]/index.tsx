import React from 'react'
import Layout from '@/components/layout/Layout'
import CategoryProduct from '@/components/category/categoryProduct/CategoryProduct'
import CustomSelect from '@/components/common/custom-input/CustomSelect'
import CustomInput from '@/components/common/custom-input/CustomInput'
import BreadCrumd from '@/components/category/breadCrumd/BreadCrumd'
import { BiSearch } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { getProductByCategoryName, getAllCategories, getCategoryByName } from '@/services/api'

const Index = ({products} : {products : any}) => {

    const router = useRouter();
    const {category} = router.query;


  return (
    <Layout>
        <>
        <BreadCrumd firstTitle={category as string} secondTitle='' />
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
            <CategoryProduct products={products} user='User' categoryName={category as string} />
        </div>
        </>
    </Layout>
  )
}

export default Index

export async function getStaticProps({params} : any) {
    const category = params.category;

    // const categoryData = await get(category);
    // if(!categoryData) {
    //     return {
    //         notFound : true
    //     }
    // }

    const products = await getProductByCategoryName(category)

    // const categoryData = await prisma.category.findUnique({
    //     where : {
    //         name : category
    //     }
    // })
    // if(!categoryData) {
    //     await prisma.$disconnect()
    //     return {
    //         notFound : true
    //     }
    // }
    // const products = await prisma.product.findMany({
    //     where : {
    //         categoryId : categoryData?.id
    //     },
    //     include : {
    //         category : true
    //     }
    // })
    // await prisma.$disconnect()
    return {
      props: {
        products : products
      },
    };
}

export async function getStaticPaths() {
    // const prisma = new PrismaClient()
    const categories = await getAllCategories();
    const paths = categories.map((category : any) => ({
      params: { category: category.name },
    }))
    return { paths, fallback: 'blocking' }
}