import React from 'react'

interface IProps {
    firstTitle?: string;
    secondTitle?: string;
}

const BreadCrumd = ({firstTitle, secondTitle} : IProps) => {
  return (
    <div className="h-24 md:h-48 bg-slate-200 dark:bg-slate-500 flex items-center justify-center" >
        <div className="text-xl md:text-3xl font-medium" >
            <p>{`${firstTitle && firstTitle || 'Category'} ${secondTitle && '/'+secondTitle}`}</p>
        </div>
    </div>
  )
}

export default BreadCrumd