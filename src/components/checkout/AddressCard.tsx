import React from 'react'

const AddressCard = ({address, setEditableAddress, setOpenModal, setSelectedAddress , selectedAddress} : {address : any, setEditableAddress : any, setOpenModal : any, setSelectedAddress : any, selectedAddress : any}) => {
    return (
        <div className="bg-slate-50 dark:bg-slate-700 rounded-sm py-4 px-8 mb-3 flex justify-between" >
            <div className="flex items-center gap-3" >
                {/* checkbox */}
                <div className="mr-3" >
                    <input checked={selectedAddress?._id == address?._id} type="checkbox" name="address" id="address" onChange={(e)=> {
                        if(e.target.checked) {
                            setSelectedAddress(address)
                        }
                    }} />
                </div>
                <p>
                    {address?.firstName} {address?.lastName}
                </p>
                <p className="text-sm text-slate-400 font-light" >
                    {address?.address}
                </p>
            </div>
            <div onClick={()=> {
                setEditableAddress(address)
                setOpenModal(true)
            }} className="text-blue-500 text-md" >
                Edit
            </div>
        </div>
    )
}

export default AddressCard