import React from "react";
import CategoryCardAdmin from "./CategoryCardAdmin";
import AddCategoryCard from "./AddCategoryCard";
import { category } from "@prisma/client";

interface IAdminProps {
  categories: category[]
}

const CategoriesAdmin = ({categories} : IAdminProps) => {
  return (
    <div className="md:mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="font-bold text-lg sm:text-xl md:text-3xl">
          All Categories
        </h3>
      </div>
      <hr className="mt-5 dark:border-slate-600 border-slate-100 border-t" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-8 my-5">
        {
          categories.map((category) => {
            return <CategoryCardAdmin key={category.id} category={category} />
          })
        }
        {/* <CategoryCardAdmin />
        <CategoryCardAdmin />
        <CategoryCardAdmin />
        <CategoryCardAdmin />
        <CategoryCardAdmin /> */}
        <AddCategoryCard />
      </div>
    </div>
  );
};

export default CategoriesAdmin;
