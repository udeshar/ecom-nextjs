import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { wishlistItems } from '@prisma/client'
import { useWishlistContext } from '@/context/wishlistContext'
import { Button, Modal } from 'flowbite-react';

const WishlistItem = ({item} : {item : any}) => {

    const {deletewishlist, getWishlistItems} = useWishlistContext();
    const [openModal, setOpenModal] = useState(false);

    const removeItem = () => {
        deletewishlist({id: item.id});
        setOpenModal(false);
    }
    

  return (
    <>
        <div className="flex justify-between items-center py-0 md:py-4 px-4 md:px-8 bg-slate-100 dark:bg-slate-600 rounded-md" >
            <div className='flex items-center gap-3 md:gap-5' style={{flex : 3}} >
                <div className="h-32 md:h-36 flex-1 rounded-md p-3" style={{flex : 1}} >
                    <div className="w-full h-full relative">
                        <Image src={item.product.imagePath} alt="phone" fill={true} style={{objectFit : "contain"}} />
                    </div>
                </div>
                <div className='flex-1' style={{flex : 3}} >
                    <h1 className="text-sm md:text-md font-medium my-2" >{item?.product?.name}</h1>
                    <p className="text-green-500 my-2 text-sm md:text-md" >{item?.product?.price} RS</p>
                </div>
            </div>
            <div className='' style={{flex : 1}} >
                <div className="flex justify-end items-center gap-3 md:gap-5" >
                    <Button color="red" onClick={() => setOpenModal(true)} >Remove</Button>
                </div>
            </div>
        </div>
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Warning</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Do you want to remove this item from wishlist ?
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="red" onClick={() => removeItem() }>Remove</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    
  )
}

export default WishlistItem