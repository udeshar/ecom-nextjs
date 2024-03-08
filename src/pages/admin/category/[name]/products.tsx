import React, { useEffect, useState } from 'react'
import CategoryProduct from '@/components/category/categoryProduct/CategoryProduct'
import CustomSelect from '@/components/common/custom-input/CustomSelect'
import CustomInput from '@/components/common/custom-input/CustomInput'
import BreadCrumd from '@/components/category/breadCrumd/BreadCrumd'
import { BiSearch } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { Button } from 'flowbite-react'
import Link from 'next/link'
import LayoutAdmin from '@/components/layout/LayoutAdmin'
import { useProductsContext } from '@/context/productContext'
import { useUserContext } from '@/context/userContext'

const AdminProducts = () => {

    const router = useRouter();
    const { name } = router.query;
    const [isAdmin, setIsAdmin] = useState(false);
    const { categoryProducts, getProductByQuery } = useProductsContext();
    const { isAdminLoggedIn } = useUserContext()

    useEffect(() => {
        isAdminLoggedIn(()=>{ setIsAdmin(true)}, () => {router.push('/login')})
    }, [])

    useEffect(() => {
        if(router.query.name){
            getProductByQuery(`category=${name}`)
        }
    }, [router.query.name])

      if(!isAdmin) return null

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
            <CategoryProduct products={categoryProducts} user={"Admin"} categoryName={name as string} />
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