import React, { useRef, useState } from 'react'
import LayoutAdmin from '@/components/layout/LayoutAdmin'
import Container from '@/components/common/container/Container'
import CustomInput from '@/components/common/custom-input/CustomInput'
import CustomTextarea from '@/components/common/custom-input/CustomTextarea'
import { Button } from 'flowbite-react'
import Image from 'next/image'
import { AiOutlineDelete } from "react-icons/ai";
import { Toast } from 'flowbite-react';
import { HiX } from 'react-icons/hi';
import { useRouter } from 'next/router'
import { checkIfAdminExist2 } from '@/helpers/dbUtils'
import cookie from 'cookie';

const AddCategory = () => {

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
        e.preventDefault()
        if (!previewImage) {
            setError('Please select a PNG image.');
            return;
        }
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("categoryName") as string;
        const description = formData.get("categoryDescription") as string;

        if(!name || !description) {
            setError("Please fill all the fields")
            return;
        }
        else{
            setError(null)
            fetch('/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({name, description, image: previewImage}),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                router.push('/admin');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    const handleReset = () => {
        setPreviewImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset file input value
          fileInputRef.current.files = null;
        }
    };

  return (
    <LayoutAdmin>
        <Container className="my-8 relative" >
            <div className="grid grid-cols-1 sm:grid-cols-2" > 
                <div className="" >
                    <form action="" onSubmit={handleSubmit} method="post" encType="multipart/form-data" >
                        <h2 className="text-2xl font-bold mb-4">Add Category</h2>
                        <CustomInput 
                            label="Category Name" 
                            placeholder="Category Name" 
                            id='categoryName' 
                            name='categoryName' 
                            type='text'
                            required
                            className='w-full mb-4'
                        />
                        <CustomTextarea 
                            label="Category Description" 
                            placeholder="Category Description" 
                            id='categoryDescription' 
                            name='categoryDescription' 
                            required
                            className='w-full mb-4'
                            rows={5}
                            wrapperClass='mt-1'
                        />
                        <CustomInput 
                            label="Category Image" 
                            placeholder="Category Image" 
                            id='categoryImage' 
                            name='categoryImage' 
                            type='file'
                            required
                            className='w-full mb-4'
                            onChange={handleImageChange}
                        />
                        {previewImage &&
                            <div className="mt-3 relative inline-block" >
                                <Image src={previewImage as string} alt="Product Image" height={250} width={250} style={{objectFit : "contain"}} />
                                <div onClick={handleReset} className='absolute w-10 h-10 flex items-center justify-center rounded-md bg-red-500 top-2 right-2 hover:bg-red-600' >
                                    <AiOutlineDelete className='text-white text-lg' size={28} />
                                </div>
                            </div>
                        }
                        <Button className='w-full sm:w-1/4 mt-5' type={"submit"}>
                            Add Category
                        </Button>
                    </form>
                </div>
            </div>
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

export default AddCategory

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
    return {
        props: {}
    }
}