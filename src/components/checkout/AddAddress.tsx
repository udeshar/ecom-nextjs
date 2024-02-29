import React, {useState} from 'react'
import CustomInput from '@/components/common/custom-input/CustomInput'
import { useAppContext } from '@/context/appContext';
import { useUserContext } from '@/context/userContext';

const AddAddress = ({setAllAddresses, setSelectedAddress} : any) => {
    const [showAddress, setShowAddress] = useState(false);
    const {showToast} = useAppContext();
    const {addAddress} = useUserContext();

    const handleSubmit = (e : any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip')
        }
        if(data.firstname && data.lastname && data.address && data.city && data.state && data.zip){
            console.log(data);
            addAddress(
                data, 
                (dataa:any)=>{
                    setAllAddresses(dataa);
                    setSelectedAddress(dataa[dataa.length - 1]);
                    showToast('Address added successfully', 'Success');
                    setShowAddress(false);
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
        <div className='bg-slate-50 dark:bg-slate-700 rounded-sm py-4 px-8' >
            <div className="flex items-center gap-3" >
                <div className="mr-3" >
                    <input 
                        type="checkbox" 
                        name="address" 
                        id="address"
                        checked={showAddress}
                        onChange={(e) => setShowAddress(e.target.checked)}
                    />
                </div>
                <p>Add New Address</p>
            </div>
            {
                showAddress &&
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5" >
                        <div>
                            <CustomInput required className="w-full" label="First Name" type="text" name="firstname" id='firstname' placeholder='First Name' />
                        </div>
                        <div>
                            <CustomInput required className="w-full" label="Last Name" type="text" name="lastname" id='lastname' placeholder='Last Name' />
                        </div>
                        <div className="col-span-2" >
                            <CustomInput required className="w-full" label="Address" type="text" name="address" id='address' placeholder='Address' />
                        </div>
                        <div>
                            <CustomInput required className="w-full" label="City" type="text" name="city" id='city' placeholder='City' />
                        </div>
                        <div>
                            <CustomInput required className="w-full" label="State" type="text" name="state" id='state' placeholder='State' />
                        </div>
                        <div>
                            <CustomInput required className="w-full" label="Zip" type="text" name="zip" id='zip' placeholder='Zip' />
                        </div>
                    </div>
                    <div className="mt-4" >
                        <button className="bg-blue-400 text-white px-5 py-2 rounded-md mt-5" >Add Address</button>
                    </div>
                </form>
            }
            
        </div>
    )
}

export default AddAddress