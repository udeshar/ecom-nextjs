import React, {useState} from 'react'
import ReactStars from "react-rating-stars-component";
import CustomTextarea from '../common/custom-input/CustomTextarea';
import { revalidatePath } from 'next/cache';
import { API_URL } from '@/helpers/constants';

const AddReview = ({productid, callBack} : any) => {

    const [review, setReview] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [error, setError] = useState<string>("");

    const handleValidations = () => {
        if(!rating){
            setError("Please give rating");
            return;
        }
        setError("");
        // API call
        fetch(`${API_URL}/api/review/${productid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token') || ''),
            },
            body: JSON.stringify({
                review,
                rating
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                setError(data.message);
            }
            else{
                callBack()
            }
        })
        .catch(err => console.log(err))
    }   

  return (
    <div className="mt-5" >
        <h3 className="text-sm" >Stars</h3>
        <ReactStars
            count={5}
            value={rating}
            onChange={(e:any) => setRating(e)}
            size={35}
            activeColor="#ffd700"
        />
        {
            error && <p className="text-red-500 text-sm mb-3" >{error}</p>
        }
        <CustomTextarea 
            placeholder="Write your review"
            label="Review"
            name="review"
            onChange={(e)=> setReview(e.target.value)}
            value={review}
            id={"review"}
            rows={8}
            className='w-full md:w-1/2'
        />
        <button onClick={handleValidations} className="bg-blue-600 text-white px-4 py-2 rounded-sm mt-3" >Submit</button>
    </div>
  )
}

export default AddReview