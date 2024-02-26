import React from "react";
import { Progress } from "flowbite-react";

const OverallRating = ({reviews} : {reviews : any}) => {

  function getReviewsStats(num : number){
    const total = reviews.length;
    if(total === 0) return 0;
    const filtered = reviews.filter((review : any) => review.rating === num);
    return (filtered.length / total) * 100;
  }

  return (
    <div>
      <h3 className="text-xl font-medium mb-5">Overall Ratings</h3>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Progress progress={getReviewsStats(5)} color="green" className="my-2" />
        </div>
        <p className="text-gray-500 text-sm my-2">5 &#9733;</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Progress progress={getReviewsStats(4)} color="lime" className="my-2" />
        </div>
        <p className="text-gray-500 text-sm my-2">4 &#9733;</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Progress progress={getReviewsStats(3)} color="lime" className="my-2" />
        </div>
          <p className="text-gray-500 text-sm my-2">3 &#9733;</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Progress progress={getReviewsStats(2)} color="yellow" className="my-2" />
        </div>
          <p className="text-gray-500 text-sm my-2">2 &#9733;</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Progress progress={getReviewsStats(1)} color="red" className="my-2" />
        </div>
          <p className="text-gray-500 text-sm my-2">1 &#9733;</p>
      </div>
    </div>
  );
};

export default OverallRating;
