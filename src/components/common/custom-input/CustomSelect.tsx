import React from "react";
import Select from "react-select";

type option = {
    value : string | number,
    label : string,
}

type props = {
    options : option[],
    className? : string,
    name : string,
    label? : string,
    id : string,
    value? : option
}

const CustomSelect = ({options, className, name, label, id, value}: props) => {
  return (
    <div>
      {
        label &&
        <label htmlFor={id} className="block text-sm mb-1" >{label}</label>
      }
      <Select
        className={`${className} basic-single bg-transparent`}
        classNamePrefix="react-select"
        defaultValue={options[0]}
        value={value}
        id={id}
        name={name}
        options={options}
      />
    </div>
  );
};

export default CustomSelect;
