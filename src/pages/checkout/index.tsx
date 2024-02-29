import React, {useState} from 'react'
import Layout from '@/components/layout/Layout'
import Container from '@/components/common/container/Container'
import AddAddress from '@/components/checkout/AddAddress'
import AddressCard from '@/components/checkout/AddressCard'
import PaymentMethodCard from '@/components/checkout/PaymentMethodCard'
import Image from 'next/image'
import cookie from 'cookie';
import { checkIfUserExist2 } from '@/helpers/dbUtils'
import { useCartContext } from '@/context/cartContext'
import { PrismaClient } from '@prisma/client'
import EditAddressModal from '@/components/checkout/EditAddressModal'


const paymentMethod = [
    {
        icon: '/assets/images/cash.png',
        title: 'Pay on Delivery',
        description: 'Please keep exact change'
    },
    {
        icon: '/assets/images/upi.png',
        title: 'Pay using UPI',
        description: 'GPay, PhonePay, Paytm, AmazonPay'
    },
    {
        icon: '/assets/images/credit.png',
        title: 'Pay using Credit/Debit card',
        description: 'Visa, MasterCard, Rupay'
    }

]

const Checkout = ({addresses} : any) => {

    const [allAddresses, setAllAddresses] = useState(addresses);
    const [openModal, setOpenModal] = useState(false);
    const [editableAddress, setEditableAddress] = useState(null);
    const { items } = useCartContext();

    console.log(items)
    const totalPrice = items.reduce((acc, item : any) => acc + (item.product.price * item.quantity), 0);

  return (
    <Layout>
        <Container className="py-8" >
            <div>
                <h1 className="text-xl font-medium mb-4" >Shipping Address</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4" >
                    <div className="col-span-2" >
                        {
                            allAddresses.length > 0 && allAddresses.map((address : any, index : number) => (
                                <AddressCard key={index} address={address} setEditableAddress={setEditableAddress} setOpenModal={setOpenModal} />
                            ))
                        }
                        <AddAddress setAllAddresses={setAllAddresses} />

                        <div className="mt-8" >
                            <h1 className="text-xl font-medium mb-4" >Payment method</h1>
                            {
                                paymentMethod.map((item, index) => (
                                    <div key={index} >
                                        <PaymentMethodCard item={item} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-span-1" >
                        <div className="bg-slate-50 dark:bg-slate-700 rounded-sm py-4 px-8 mb-3" >
                            <h1 className="mb-5 text-md font-medium" >Order Items</h1>

                            {
                                items.map((item : any, index : any) => (
                                    <div key={index} className={`flex justify-between items-center py-4 ${items.length-1 != index && ' border-b'}`} >
                                        <div className="flex items-center gap-4" >
                                            <div>
                                                <Image src={item.product.imagePath} width={50} height={50} alt={item.product.name} />
                                            </div>
                                            <div>
                                                <p className="text-md" >{item.product.name}</p>
                                                <p className="text-sm text-slate-400" >Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className='text-green-500 font-medium' >₹ {item.product.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700 rounded-sm py-4 px-8 mb-3" >
                            <h1 className="mb-5 text-md font-medium" >Order Summary</h1>
                            <div className="border-b" >
                                <div className="flex justify-between items-center my-2" >
                                    <p className="text-slate-400" >Items (5)</p>
                                    <p>₹ {totalPrice}</p>
                                </div>
                                <div className="flex justify-between items-center my-2" >
                                    <p className="text-slate-400" >Shipping</p>
                                    <p>₹ 40</p>
                                </div>
                                <div className="flex justify-between items-center my-2" >
                                    <p className="text-slate-400" >Tax</p>
                                    <p>₹ 0.00</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center my-2" >
                                <p className="text-lg font-medium" >Total</p>
                                <p className="font-bold text-lg" >₹ {totalPrice + 40}</p>
                            </div>
                        </div>

                        {/* Order Now button */}
                        <div className="mt-4" >
                            <button className="bg-blue-400 text-white px-5 py-2 rounded-md w-full" >Place Order</button>
                        </div>

                    </div>
                </div>
            </div>
        </Container> 
        <EditAddressModal openModal={openModal} setOpenModal={setOpenModal} address={editableAddress} setAllAddresses={setAllAddresses} />
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
            addresses : JSON.parse(JSON.stringify(addresses))
        }
    }
}