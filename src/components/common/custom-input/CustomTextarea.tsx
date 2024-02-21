import React from "react";

type props = {
    name : string,
    id : string,
    value? : string,
    label? : string,
    className? : string,
    wrapperClass? : string,
    placeholder : string,
    required? : boolean,
    rows? : number,
    onChange? : (e : React.ChangeEvent<HTMLTextAreaElement>) => void
}

const CustomTextarea = ({name, id, value, label, className, wrapperClass, placeholder, required, onChange, rows} : props) => {
  return <div className={wrapperClass} >
    {
        label &&
        <label htmlFor={id} className="block text-sm mb-1" >{label}</label>
    }
    {/* <input 
        type={type} 
        name={name}
        id={id}
        value={value}
        required={required}
        className={`${className} border border-slate-200 px-3 py-2 rounded-sm outline-0 text-sm active:border-blue-400 focus:border-blue-400 bg-transparent dark:text-white`}
        placeholder={placeholder}
        onChange={onChange}
    /> */}
    <textarea
        name={name}
        id={id}
        value={value}
        required={required}
        className={`${className} border border-slate-200 px-3 py-2 rounded-sm outline-0 text-sm active:border-blue-400 focus:border-blue-400 bg-transparent dark:text-white`}
        placeholder={placeholder}
        onChange={onChange}
        rows={rows}
    />
  </div>;
};

export default CustomTextarea;
