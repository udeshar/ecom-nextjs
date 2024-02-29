import React from 'react'
import Layout from '@/components/layout/Layout'
import Container from '@/components/common/container/Container'
import CheckoutMain from '@/components/checkout/CheckoutMain'
import cookie from 'cookie';
import { checkIfUserExist2 } from '@/helpers/dbUtils'
import { PrismaClient } from '@prisma/client'
import { useCartContext } from '@/context/cartContext'

const Checkout = ({addresses} : any) => {
    const { items } = useCartContext();
  return (
    <Layout>
        <Container className="py-8" >
            <CheckoutMain addresses={addresses} items={items} />
        </Container>
    </Layout>
  )
}

export default Checkout

export const getServerSideProps = async (context : any) => {
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

    const user = await checkIfUserExist2(token);
    if (!user) {
        return redr
    }

    const prisma = new PrismaClient();
    const addresses = await prisma.address.findMany({
        where: {
            userId: user.id
        }
    });
    return {
        props: {
            addresses : JSON.parse(JSON.stringify(addresses)),
        }
    }
}

// import React, {useState} from 'react'
// import Layout from '@/components/layout/Layout'
// import Container from '@/components/common/container/Container'
// import AddAddress from '@/components/checkout/AddAddress'
// import AddressCard from '@/components/checkout/AddressCard'
// import PaymentMethodCard from '@/components/checkout/PaymentMethodCard'
// import Image from 'next/image'
// import cookie from 'cookie';
// import { checkIfUserExist2 } from '@/helpers/dbUtils'
// import { useCartContext } from '@/context/cartContext'
// import { useUserContext } from '@/context/userContext'
// import { useAppContext } from '@/context/appContext'
// import { PrismaClient, address } from '@prisma/client'
// import EditAddressModal from '@/components/checkout/EditAddressModal'
// import ConfirmationPopup from '@/components/common/popups/ConfirmationPopup'
// import { v4 as uuidv4 } from 'uuid';

// const paymentMethod = [
//     {
//         icon: '/assets/images/cash.png',
//         title: 'Pay on Delivery',
//         description: 'Please keep exact change',
//         enabled : true
//     },
//     {
//         icon: '/assets/images/upi.png',
//         title: 'Pay using UPI',
//         description: 'GPay, PhonePay, Paytm, AmazonPay',
//         enabled : false
//     },
//     {
//         icon: '/assets/images/credit.png',
//         title: 'Pay using Credit/Debit card',
//         description: 'Visa, MasterCard, Rupay',
//         enabled : false
//     }

// ]

// const Checkout = ({addresses} : any) => {

//     const [allAddresses, setAllAddresses] = useState(addresses);
//     const [openModal, setOpenModal] = useState(false);
//     const [openConfirmationPopup, setOpenConfirmationPopup] = useState(false);
//     const [editableAddress, setEditableAddress] = useState(null);
//     const [selectedAddress, setSelectedAddress] = useState<address>(addresses && addresses[0]);
//     const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(paymentMethod[0]);
//     const { items } = useCartContext();
//     const { placeOrder } = useUserContext();
//     const { showToast } = useAppContext();

//     const totalPrice = items.reduce((acc, item : any) => acc + (item.product.price * item.quantity), 0);

//     const handleSubmit = async () => {
//         const orderItems = items.map((item : any) => {
//             return {
//                 id : uuidv4(),
//                 productId: item.product.id,
//                 quantity: item.quantity
//             }
//         })
//         const order = {
//             addressId: selectedAddress.id,
//             paymentMethod: selectedPaymentMethod.title,
//             orderItems,
//             total: totalPrice + 40
//         }
//         placeOrder(
//             order,
//             () => {
//                 console.log('Order placed')
//                 showToast('Order placed successfully', 'Success')
//             },
//             (error : any) => {
//                 console.log(error)
//                 showToast('Error placing order', 'Error')
//             }
//         );
//     }

//   return (
//     <Layout>
//         <Container className="py-8" >
//             <div>
//                 <h1 className="text-xl font-medium mb-4" >Shipping Address</h1>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4" >
//                     <div className="col-span-2" >
//                         {
//                             allAddresses.length > 0 && allAddresses.map((address : any, index : number) => (
//                                 <AddressCard 
//                                     key={index} 
//                                     address={address} 
//                                     setEditableAddress={setEditableAddress} 
//                                     setOpenModal={setOpenModal} 
//                                     selectedAddress={selectedAddress}
//                                     setSelectedAddress={setSelectedAddress}
//                                 />
//                             ))
//                         }
//                         <AddAddress setAllAddresses={setAllAddresses} />

//                         <div className="mt-8" >
//                             <h1 className="text-xl font-medium mb-4" >Payment method</h1>
//                             {
//                                 paymentMethod.map((item, index) => (
//                                     <div 
//                                         onClick={()=>{
//                                             if(item.enabled) {
//                                                 if(selectedPaymentMethod && selectedPaymentMethod.title == item.title) {
//                                                     setSelectedPaymentMethod(null);
//                                                     return
//                                                 }
//                                                 setSelectedPaymentMethod(item)
//                                             }
//                                         }} 
//                                         key={index} 
//                                         className={`${item.enabled ? 'cursor-pointer' : 'cursor-not-allowed'} relative`} 
//                                     >
//                                         <PaymentMethodCard item={item} selected={selectedPaymentMethod && selectedPaymentMethod.title == item.title} />
//                                         {
//                                             !item.enabled && 
//                                             <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 bg-black opacity-10"></div>
//                                         }
//                                         {
//                                             selectedPaymentMethod && selectedPaymentMethod.title == item.title && 
//                                             <div className="absolute top-5 right-5 flex justify-center items-center" >
//                                                 <p className="text-white text-sm bg-green-500 px-2 py-1 rounded-md" >Selected</p>
//                                             </div>
//                                         }
//                                     </div>
//                                 ))
//                             }
//                         </div>
//                     </div>
//                     <div className="col-span-1" >
//                         <div className="bg-slate-50 dark:bg-slate-700 rounded-sm py-4 px-8 mb-3" >
//                             <h1 className="mb-5 text-md font-medium" >Order Items</h1>

//                             {
//                                 items.map((item : any, index : any) => (
//                                     <div key={index} className={`flex justify-between items-center py-4 ${items.length-1 != index && ' border-b'}`} >
//                                         <div className="flex items-center gap-4" >
//                                             <div>
//                                                 <Image src={item.product.imagePath} width={50} height={50} alt={item.product.name} />
//                                             </div>
//                                             <div>
//                                                 <p className="text-md" >{item.product.name}</p>
//                                                 <p className="text-sm text-slate-400" >Qty: {item.quantity}</p>
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <p className='text-green-500 font-medium' >₹ {item.product.price * item.quantity}</p>
//                                         </div>
//                                     </div>
//                                 ))
//                             }
//                         </div>

//                         <div className="bg-slate-50 dark:bg-slate-700 rounded-sm py-4 px-8 mb-3" >
//                             <h1 className="mb-5 text-md font-medium" >Order Summary</h1>
//                             <div className="border-b" >
//                                 <div className="flex justify-between items-center my-2" >
//                                     <p className="text-slate-400" >Items (5)</p>
//                                     <p>₹ {totalPrice}</p>
//                                 </div>
//                                 <div className="flex justify-between items-center my-2" >
//                                     <p className="text-slate-400" >Shipping</p>
//                                     <p>₹ 40</p>
//                                 </div>
//                                 <div className="flex justify-between items-center my-2" >
//                                     <p className="text-slate-400" >Tax</p>
//                                     <p>₹ 0.00</p>
//                                 </div>
//                             </div>
//                             <div className="flex justify-between items-center my-2" >
//                                 <p className="text-lg font-medium" >Total</p>
//                                 <p className="font-bold text-lg" >₹ {totalPrice + 40}</p>
//                             </div>
//                         </div>

//                         {/* Order Now button */}
//                         <div className="mt-4" >
//                             <button onClick={()=> setOpenConfirmationPopup(true)} className="bg-blue-400 text-white px-5 py-2 rounded-md w-full" >Place Order</button>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </Container> 
//         <EditAddressModal openModal={openModal} setOpenModal={setOpenModal} address={editableAddress} setAllAddresses={setAllAddresses} />
//         <ConfirmationPopup 
//             openModal={openConfirmationPopup}
//             setOpenModal={setOpenConfirmationPopup}
//             headingText="Confirmation"
//             mainText="You are about to place an order. Are you sure?"
//             actionButtonText="Confirm"
//             onActionBtnClick={() => {
//                 handleSubmit();
//                 setOpenConfirmationPopup(false)
//             }}
//         />
//     </Layout>
//   )
// }

// export default Checkout

// export const getServerSideProps = async (context : any) => {
//     const redr = {
//     redirect: {
//         destination: '/login',
//         permanent: false,
//     },
//     }

//     const cookies = cookie.parse(context.req.headers.cookie || '');
//     const token = cookies.token;
//     if(!token){
//         return redr
//     }

//     const user = await checkIfUserExist2(token);
//     if (!user) {
//         return redr
//     }

//     const prisma = new PrismaClient();
//     const addresses = await prisma.address.findMany({
//         where: {
//             userId: user.id
//         }
//     });
//     return {
//         props: {
//             addresses : JSON.parse(JSON.stringify(addresses))
//         }
//     }
// }