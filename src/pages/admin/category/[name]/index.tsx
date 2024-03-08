import React, { useEffect, useRef, useState } from 'react'
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
import { useCategoriesContext } from '@/context/categoryContext'
import { API_URL } from '@/helpers/constants'
import { useUserContext } from '@/context/userContext'


const ManageCategory = () => {

    const router = useRouter();
    const { categories, getCategories } = useCategoriesContext();
    const [category, setCategory] = useState<any>(null);
    const [previewImage, setPreviewImage] = useState<string| ArrayBuffer | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState<string>(category?.name);
    const [description, setDescription] = useState<string>(category?.description || "");
    const [image, setImage] = useState<string>(category?.imagePath || "");

    const [isAdmin, setIsAdmin] = useState(false);
    const { isAdminLoggedIn } = useUserContext()

    useEffect(() => {
        isAdminLoggedIn(()=>{ setIsAdmin(true)}, () => {router.push('/login')})
    }, [])

    useEffect(() => {
        const cat:any = categories.find((item : any) => item.name === router.query.name)
        setCategory(cat);
        setName(cat?.name);
        setDescription(cat?.description);
        setImage(cat?.imagePath);
        console.log(cat);
    }, [router.query.name, categories])

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
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        formData.append('imagePath', image);

        if(!name || !description) {
            setError("Please fill all the fields")
            return;
        }
        else{
            setError(null)
            fetch(API_URL + '/api/category/' + category?._id, {
                method: 'PUT',
                headers: {
                    'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('token') || '')}`
                },
                body: formData,
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if(data.error){
                    setError(data.message);
                    return;
                }
                getCategories()
                router.push('/admin');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    const handleReset = () => {
        setPreviewImage(null);
        setImage("");
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset file input value
          fileInputRef.current.files = null;
        }
    };

    const deleteCategory = () => {
        fetch(API_URL + `/api/category/${category.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('token') || '')}`
            },
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

    if(!isAdmin) return null

  return (
    <LayoutAdmin>
        <Container className="my-8 relative" >
            <div className="grid grid-cols-1 sm:grid-cols-2" > 
                <div className="" >
                    <form action="" onSubmit={handleSubmit} method="post" encType="multipart/form-data" >
                        <h2 className="text-2xl font-bold mb-4">Add Category</h2>
                        <CustomInput 
                            label="Category Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Category Name" 
                            id='categoryName' 
                            name='name' 
                            type='text'
                            required
                            className='w-full mb-4'
                        />
                        <CustomTextarea 
                            label="Category Description" 
                            placeholder="Category Description" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            id='categoryDescription' 
                            name='description' 
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
                            required={false}
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
                            ||
                            image &&
                            <div className="mt-3 relative inline-block" >
                                <Image src={image} alt="Product Image" height={250} width={250} style={{objectFit : "contain"}} />
                                <div onClick={handleReset} className='absolute w-10 h-10 flex items-center justify-center rounded-md bg-red-500 top-2 right-2 hover:bg-red-600' >
                                    <AiOutlineDelete className='text-white text-lg' size={28} />
                                </div>
                            </div>
                        }
                        <div className="flex items-center gap-5 sm:w-3/4" >
                        <Button className='w-full flex-1 mt-5' type={"submit"}>
                            Update Category
                        </Button>
                        <Button color='red' className='w-full flex-1 mt-5' type={"button"} onClick={deleteCategory}>
                            Delete Category
                        </Button>
                        </div>
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

export default ManageCategory