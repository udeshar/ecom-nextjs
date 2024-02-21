import React, { ReactNode } from 'react'

const Container = ({children, className} : {children: ReactNode, className? : string}) => {
  return (
    <div className={`${className} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        {children}
    </div>
  )
}

export default Container