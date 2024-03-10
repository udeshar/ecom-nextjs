import React from "react";
import ReactStars from "react-rating-stars-component";

const Review = ({review} : any) => {
  return (
    <div className="flex gap-3 pt-4">
      <div className="h-16 w-16 bg-slate-100 dark:bg-slate-700 rounded-full flex-shrink-0"></div>
      <div className="border-b border-slate-200 pb-4 flex-1">
        <h1 className="font-medium text-md my-1">{review.user.email.split('@')[0]}</h1>
        <p className="font-normal text-sm my-1">{review.user.email}</p>
        <p className="text-gray-500 text-sm font-light mt-4">
          {review.review}
        </p>
        <div className="flex items-center gap-3">
          <ReactStars
            count={5}
            value={review.rating}
            onChange={() => {}}
            size={25}
            activeColor="#ffd700"
            edit={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Review;
