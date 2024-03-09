import React, {useState} from 'react'
import { Modal } from 'flowbite-react'
import CustomInput from '@/components/common/custom-input/CustomInput'
import { useUserContext } from '@/context/userContext'
import { useAppContext } from '@/context/appContext'

const EditAddressModal = ({
    openModal,
    setOpenModal,
    address : address2,
    setAllAddresses
} : any) => {
    
    const [address, setAddress] = useState<any>(null);
    const {updateAddress, deleteAddress} = useUserContext();
    const { showToast } = useAppContext();

    React.useEffect(() => {
        setAddress(address2)
    }, [address2])

    const handleSubmit = (e : any) => {
        e.preventDefault();
        if(address.firstName && address.lastName && address.address && address.city && address.state && address.zip){
            console.log(address);
            updateAddress(
                address, 
                (dataa:any)=>{
                    setAllAddresses(dataa);
                    showToast('Address updated successfully', 'Success');
                    setOpenModal(false);
                }, 
                (err:string)=> {
                    showToast(err, 'Error');
                }
            );
        } else{
            showToast('Please fill all the fields', 'Error');
        }
    }

    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <Modal.Header>Edit Address</Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5" >
                        <div>
                            <CustomInput required value={address?.firstName} onChange={(e)=> setAddress({...address, firstName : e.target.value})} className="w-full" label="First Name" type="text" name="firstname" id='firstname' placeholder='First Name' />
                        </div>
                        <div>
                            <CustomInput required value={address?.lastName} onChange={(e)=> setAddress({...address, lastName : e.target.value })} className="w-full" label="Last Name" type="text" name="lastname" id='lastname' placeholder='Last Name' />
                        </div>
                        <div className="col-span-2" >
                            <CustomInput required value={address?.address} onChange={(e)=> setAddress({...address, address : e.target.value })} className="w-full" label="Address" type="text" name="address" id='address' placeholder='Address' />
                        </div>
                        <div>
                            <CustomInput required value={address?.city} onChange={(e)=> setAddress({...address, city : e.target.value })} className="w-full" label="City" type="text" name="city" id='city' placeholder='City' />
                        </div>
                        <div>
                            <CustomInput required value={address?.state} onChange={(e)=> setAddress({...address, state : e.target.value })} className="w-full" label="State" type="text" name="state" id='state' placeholder='State' />
                        </div>
                        <div>
                            <CustomInput required value={address?.zip} onChange={(e)=> setAddress({...address, zip : e.target.value })} className="w-full" label="Zip" type="text" name="zip" id='zip' placeholder='Zip' />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div >
                        <button type='submit' className="bg-blue-400 text-white px-5 py-2 rounded-md" >Update Address</button>
                    </div>
                    <div>
                        <button type='button' onClick={()=> {
                            deleteAddress(
                                address._id, 
                                (dataa:any)=>{
                                    setAllAddresses(dataa);
                                    showToast('Address deleted successfully', 'Success');
                                    setOpenModal(false);
                                }, 
                                (err:string)=> {
                                    showToast(err, 'Error');
                                }
                            );
                        }} className="bg-red-400 text-white px-5 py-2 rounded-md" >Delete Address</button>
                    </div>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default EditAddressModal