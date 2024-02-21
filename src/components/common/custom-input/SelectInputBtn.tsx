import React from "react";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { IoIosSearch } from "react-icons/io";

const SelectInputBtn = () => {
  return (
    <div className="flex justify-between items-center border border-slate-200 dark:border-slate-600 custom-input-select-wrapper rounded-md w-full">
      <div className="border-r border-slate-200 dark:border-slate-600 w-32">
        <CustomSelect
          options={[
            { value: "chocolate", label: "Chocolate" },
            { value: "strawberry", label: "Strawberry" },
            { value: "vanilla", label: "Vanilla" },
          ]}
          className="w-full"
        />
      </div>
      <div>
        <CustomInput
          id="search"
          name="search"
          type="text"
          placeholder="search"
        />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 border border-blue-500 text-white py-1 px-3 rounded-tr-md rounded-br-md h-full scale-105">
        <IoIosSearch size={20} />
      </button>
    </div>
  );
};

export default SelectInputBtn;
