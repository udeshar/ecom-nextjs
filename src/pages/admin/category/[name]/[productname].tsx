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
import { useProductsContext } from '@/context/productContext'
import { useUserContext } from '@/context/userContext'
import { API_URL } from '@/helpers/constants'

const UpdateProduct = () => {

    const { isAdminLoggedIn } = useUserContext()
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const { singleProduct, getProductByName } : any = useProductsContext();

    useEffect(() => {
        isAdminLoggedIn(()=>{ setIsAdmin(true)}, () => {router.push('/login')})
    }, [])

    useEffect(() => {
        if(router.query.productname){
            getProductByName(`name=${router.query.productname}`)
        }
    }, [router.query.productname])

    useEffect(() => {
        setProductData({
            name: singleProduct?.name,
            price: singleProduct?.price?.toString(),
            offer: singleProduct?.offer?.toString() || undefined,
            availability: singleProduct?.availability,
            description: singleProduct?.description || undefined,
            imagePath : singleProduct?.imagePath,
            featured: singleProduct?.featured,
            bestSeller: singleProduct?.bestSeller,
            offered: singleProduct?.offered
        })
    }, [singleProduct])

    const [previewImage, setPreviewImage] = useState<string| ArrayBuffer | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [productData, setProductData] = useState({
        name: singleProduct?.name,
        price: singleProduct?.price?.toString(),
        offer: singleProduct?.offer?.toString() || undefined,
        availability: singleProduct?.availability,
        description: singleProduct?.description || undefined,
        imagePath : singleProduct?.imagePath,
        featured: singleProduct?.featured,
        bestSeller: singleProduct?.bestSeller,
        offered: singleProduct?.offered
    })

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
        const featured = formData.get('featured');
        const bestSeller = formData.get('bestSeller');
        const offered = formData.get('offered');

        console.log(featured, bestSeller, offered, 'Featured, Best Seller, Offered')

        formData.append('image', productData.imagePath);

        if (!productName || !productPrice || !offProduct || !availability || !productDescription) {
            setError('All fields are required');
            return;
        } else if(!previewImage && !productData?.imagePath){
            setError('Please select an image');
            return;
        }
        else{
            console.log('Form Data : ', productData)
            fetch(API_URL + '/api/product/'+ singleProduct?._id, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token') || '')
                },
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.error){
                    setError(data.message);
                }
                else{
                    setError(null);
                    router.back();
                }
            })
        }
    }

    const handleReset = () => {
        setPreviewImage(null);
        setProductData({...productData, imagePath : null});
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset file input value
        }
    };

    const deleteHandler = () => {
        fetch(API_URL + '/api/product/'+ singleProduct._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token') || '')
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.error){
                setError(data.message);
            }
            else{
                setError(null);
                router.back();
            }
        })
    }

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
                                value={productData.name}
                                onChange={(e) => setProductData({...productData, name : e.target.value})}
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
                                value={productData.price}
                                onChange={(e) => setProductData({...productData, price : e.target.value})}
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
                                value={productData.offer}
                                onChange={(e) => setProductData({...productData, offer : e.target.value})}
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
                                value={{ value: productData.availability, label: productData.availability }}
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
                                value={productData.description}
                                onChange={(e) => setProductData({...productData, description : e.target.value})}
                                required
                                className='w-full'
                                rows={5}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 max-w-4xl mt-1" >
                        <div className="" >
                            <CustomInput
                                label="Product Image"
                                placeholder="Product Image"
                                id='productImage'
                                name='imagePath'
                                type='file'
                                required={false}
                                className='w-full'
                                onChange={handleImageChange}
                                ref={fileInputRef}
                            />
                        </div>
                    </div>

                    <div className=" mt-6 mb-1" >
                            <CustomInput
                                wrapperClass='flex gap-3'
                                label="Is Product Featured?"
                                placeholder="Is Product Featured?"
                                id='featuredProduct'
                                name='featured'
                                type='checkbox'
                                className=''
                                isChecked={productData.featured}
                                onChange={(e) => {
                                    console.log(e.target.checked)
                                    setProductData({...productData, featured : e.target.checked})
                                }}
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
                                isChecked={productData.bestSeller}
                                onChange={(e) => setProductData({...productData, bestSeller : e.target.checked})}
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
                                isChecked={productData.offered}
                                onChange={(e) => setProductData({...productData, offered : e.target.checked})}
                            />
                        </div>

                    {previewImage &&
                        <div className="mt-3 relative inline-block" >
                            <Image src={previewImage as string} alt="Product Image" height={250} width={250} style={{objectFit : "contain"}} />
                            <div onClick={handleReset} className='absolute w-10 h-10 flex items-center justify-center rounded-md bg-red-500 top-2 right-2 hover:bg-red-600' >
                                <AiOutlineDelete className='text-white text-lg' size={28} />
                            </div>
                        </div> ||
                        productData.imagePath &&
                        <div className="mt-3 relative inline-block" >
                            <Image src={productData.imagePath} alt="Product Image" height={250} width={250} style={{objectFit : "contain"}} />
                            <div onClick={handleReset} className='absolute w-10 h-10 flex items-center justify-center rounded-md bg-red-500 top-2 right-2 hover:bg-red-600' >
                                <AiOutlineDelete className='text-white text-lg' size={28} />
                            </div>
                        </div>
                    }
                    <div className="mt-5 flex items-center gap-x-5" >
                        <Button className='' type='submit'>
                            Update Product
                        </Button>
                        <Button onClick={deleteHandler} color={"red"} className='' type='button'>
                            Delete Product
                        </Button>
                    </div>
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

export default UpdateProduct