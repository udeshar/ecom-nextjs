import React, {useState, useRef, useEffect} from 'react'
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
import { useRouter } from 'next/router'
import { useCategoriesContext } from '@/context/categoryContext'
import { useUserContext } from '@/context/userContext'
import { API_URL } from '@/helpers/constants'

const AddProduct = () => {

    const router = useRouter();
  const [ isAdmin, setIsAdmin ] = React.useState(false)
  const { categories } : any = useCategoriesContext()
  const { isAdminLoggedIn } = useUserContext()
  const [previewImage, setPreviewImage] = useState<string| ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    isAdminLoggedIn(()=>{ setIsAdmin(true) }, () => {router.push('/login')})
  }, [])

  
  
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
    const productName = formData.get('name');
    const productPrice = formData.get('price');
    const offProduct = formData.get('offer');
    const availability = formData.get('availability');
    const productDescription = formData.get('description');
    const category = formData.get('categoryId');
    const featuredProduct = formData.get('featured');
    const bestSeller = formData.get('bestSeller');
    const offered = formData.get('offered');
    const file = formData.get('imagePath');
    
    if (!productName || !productPrice || !offProduct || !availability || !productDescription || !category || !file) {
        console.log(productName, productPrice, offProduct, availability, productDescription, category, featuredProduct, bestSeller, offered);
        setError('All fields are required');
        return;
    }
    else{
        fetch(API_URL + '/api/product', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') || '')}`
            },
            body: formData
        })
        .then(res => res.json())
        .then(data => {
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

    const options = categories.map((category : any) => {
        return {
            value: category._id,
            label: category.name
        }
    })
    
    if(!isAdmin) return null

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
                                name='name'
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
                                name='price'
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
                                name='offer'
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
                                name='description'
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
                                name='categoryId'
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
                                name='imagePath'
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
                                name='featured'
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
                                name='offered'
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