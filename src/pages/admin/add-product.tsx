import React, {useState, useRef} from 'react'
import LayoutAdmin from '@/components/layout/LayoutAdmin'
import Container from '@/components/common/container/Container'
import CustomInput from '@/components/common/custom-input/CustomInput'
import CustomTextarea from '@/components/common/custom-input/CustomTextarea'
import CustomSelect from '@/components/common/custom-input/CustomSelect'
import { Button } from 'flowbite-react'
import Image from 'next/image'
import { AiOutlineDelete } from "react-icons/ai";
import { Toast } from 'flowbite-react';
import { HiX } from 'react-icons/hi';
import { PrismaClient, category } from '@prisma/client'
import { useRouter } from 'next/router'
import { checkIfAdminExist2 } from '@/helpers/dbUtils'
import cookie from 'cookie';

interface AddProductProps {
    categories: category[]
}

const AddProduct = ({categories} : AddProductProps) => {

    const router = useRouter();
    const [previewImage, setPreviewImage] = useState<string| ArrayBuffer | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
    
        if (file) {
          if (file.type === 'image/png') {
            const reader = new FileReader();
            reader.onloadend = () => {
              if (typeof reader.result === 'string') {
                setPreviewImage(reader.result);
              }
            };
            reader.readAsDataURL(file);
          } else {
            // alert('Please select a PNG image.');
            setError('Please select a PNG image.');
            setPreviewImage(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = ''; // Reset file input value
            }
          }
        } else {
          setPreviewImage(null);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const productName = formData.get('productName');
        const productPrice = formData.get('productPrice');
        const offProduct = formData.get('offProduct');
        const availability = formData.get('availability');
        const productDescription = formData.get('productDescription');
        const category = formData.get('category');
        const featuredProduct = formData.get('featuredProduct');
        const bestSeller = formData.get('bestSeller');
        const offered = formData.get('offers');

        if (!productName || !productPrice || !offProduct || !availability || !productDescription || !category || !previewImage) {
            setError('All fields are required');
            return;
        }
        else{
            console.log('Form Data : ', formData)
            console.log(featuredProduct, bestSeller, offered)
            fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
                },
                body: JSON.stringify({
                    productName,
                    productPrice,
                    offProduct,
                    availability,
                    productDescription,
                    category,
                    image : previewImage,
                    featuredProduct : featuredProduct != null ? true : false,
                    bestSeller : bestSeller != null ? true : false,
                    offered : offered != null ? true : false
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.error){
                    setError(data.message);
                }
                else{
                    setError(null);
                    router.push('/admin')
                }
            })
        }
    }

    const handleReset = () => {
        setPreviewImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset file input value
        }
    };

    const options = categories.map((category) => {
        return {
            value: category.id,
            label: category.name
        }
    })

    return (
        <LayoutAdmin>
            <Container className="my-8 relative" >
                <h2 className="text-2xl font-bold mb-4">Add Product</h2>
                <form action="" onSubmit={handleSubmit} method="post" encType="multipart/form-data" >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 max-w-4xl" >
                        <div className="" >
                            <CustomInput
                                label="Product Name"
                                placeholder="Product Name"
                                id='productName'
                                name='productName'
                                type='text'
                                required
                                className='w-full'
                            />
                        </div>
                        <div className="" >
                            <CustomInput
                                label="Product Price"
                                placeholder="Product Price"
                                id='productPrice'
                                name='productPrice'
                                type='number'
                                required
                                className='w-full'
                            />
                        </div>
                        {/* <div /> */}

                        <div className="" >
                            <CustomInput
                                label="Off on product (%)"
                                placeholder="0 to 100"
                                id='offProduct'
                                name='offProduct'
                                type='number'
                                required
                                className='w-full'
                            />
                        </div>
                        <div className="" >
                            <CustomSelect
                                options={[
                                    { value: 'Available', label: 'Available' },
                                    { value: 'Unavailable', label: 'Unavailable' },
                                    { value: 'Limited', label: 'Limited' },
                                ]}
                                name='availability'
                                className='w-full'
                                id='availability'
                                label='Availability'
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-x-5 gap-y-3 max-w-4xl mt-3" >
                        <div className="col-span-1 sm:col-span-2" >
                            <CustomTextarea
                                label="Product Description"
                                placeholder="Product Description"
                                id='productDescription'
                                name='productDescription'
                                required
                                className='w-full'
                                rows={5}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 max-w-4xl mt-1" >
                        <div className="" >
                            <CustomSelect
                                options={options}
                                name='category'
                                className='w-full'
                                id='category'
                                label='Select Category'
                            />
                        </div>
                        <div className="" >
                            <CustomInput
                                label="Product Image"
                                placeholder="Product Image"
                                id='productImage'
                                name='productImage'
                                type='file'
                                required
                                className='w-full'
                                onChange={handleImageChange}
                                ref={fileInputRef}
                            />
                        </div>
                    </div>
                    <div className="mb-1" >
                            <CustomInput
                                wrapperClass='flex gap-3'
                                label="Is Product Featured?"
                                placeholder="Is Product Featured?"
                                id='featuredProduct'
                                name='featuredProduct'
                                type='checkbox'
                                className=''
                            />
                        </div>
                        <div className="mb-1" >
                            <CustomInput
                                wrapperClass='flex gap-3'
                                label="Is Product a Best Seller?"
                                placeholder="Is product a best seller?"
                                id='bestSeller'
                                name='bestSeller'
                                type='checkbox'
                                className=''
                            />
                        </div>
                        <div className="" >
                            <CustomInput
                                wrapperClass='flex gap-3'
                                label="Does product have discount?"
                                placeholder="Does product have discount?"
                                id='offers'
                                name='offers'
                                type='checkbox'
                                className=''
                            />
                        </div>
                    {previewImage &&
                        <div className="mt-3 relative inline-block" >
                            <Image src={previewImage as string} alt="Product Image" height={250} width={250} style={{objectFit : "contain"}} />
                            <div onClick={handleReset} className='absolute w-10 h-10 flex items-center justify-center rounded-md bg-red-500 top-2 right-2 hover:bg-red-600' >
                                <AiOutlineDelete className='text-white text-lg' size={28} />
                            </div>
                        </div>
                    }
                    <Button className='w-1/4 mt-5' type='submit'>
                        Add Product
                    </Button>
                </form>
                {
                    error &&
                    <Toast className='absolute top-0 right-0' >
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                            <HiX className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">{error}</div>
                        <Toast.Toggle onDismiss={() => setError(null)} />
                    </Toast>
                }
            </Container>
        </LayoutAdmin>
    )
}

export default AddProduct

export async function getServerSideProps(context:any) {

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
    return {
        props: {
            categories : JSON.parse(JSON.stringify(categories))
        }
    }
}