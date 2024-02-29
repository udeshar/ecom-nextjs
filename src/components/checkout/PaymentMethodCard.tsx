import React from 'react'
import Image from 'next/image'

interface PaymentMethodCardProps {
    item: {
        icon: string,
        title: string,
        description: string
    }

}

const PaymentMethodCard = ({item} : PaymentMethodCardProps) => {
    return (
        <div className="bg-slate-50 dark:bg-slate-700 rounded-sm py-4 px-8 mb-3 flex items-center gap-6" >
            <div className='rounded-sm bg-white w-16 h-16 flex items-center justify-center' >
                {/* <TbCoinRupeeFilled size={40} /> */}
                <Image src={item.icon} width={40} height={40} alt="rupee" />
            </div>
            <div>
                <p>{item.title}</p>
                <p className="text-sm text-slate-400 font-light" >{item.description}</p>
            </div>
        </div>
    )
}

export default PaymentMethodCard