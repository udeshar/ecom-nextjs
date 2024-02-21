import React from "react";
import { Progress } from "flowbite-react";

const OverallRating = () => {
  return (
    <div>
      <h3 className="text-xl font-medium mb-5">Overall Ratings</h3>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Progress progress={80} color="green" className="my-2" />
        </div>
        <p className="text-gray-500 text-sm my-2">5 &#9733;</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Progress progress={45} color="lime" className="my-2" />
        </div>
        <p className="text-gray-500 text-sm my-2">4 &#9733;</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Progress progress={25} color="lime" className="my-2" />
        </div>
          <p className="text-gray-500 text-sm my-2">3 &#9733;</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Progress progress={15} color="yellow" className="my-2" />
        </div>
          <p className="text-gray-500 text-sm my-2">2 &#9733;</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Progress progress={5} color="red" className="my-2" />
        </div>
          <p className="text-gray-500 text-sm my-2">1 &#9733;</p>
      </div>
    </div>
  );
};

export default OverallRating;
