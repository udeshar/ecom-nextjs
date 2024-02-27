import React from "react";
import CategoryCard from "../card/CategoryCard";
import { category } from "@prisma/client";

interface Props {
  categories: category[];
}

const ExploreCategory = ({categories} : Props) => {
  return (
    <div className="mt-12 mb-16">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="font-bold text-lg sm:text-xl md:text-3xl">
          Explore Categories
        </h3>
      </div>
      <hr className="mt-5 dark:border-slate-600 border-slate-100 border-t" />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-8 my-5">
        {
          categories?.map((category, index) => {
            return <CategoryCard key={index} category={category} />
          })
        }
      </div>
    </div>
  );
};

export default ExploreCategory;
