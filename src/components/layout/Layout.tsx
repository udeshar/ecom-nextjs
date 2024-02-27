import React, { ReactNode } from 'react'
import Navbar from '../common/navbar/Navbar'
import Footer from '../common/footer/Footer'
import CustomToast from '../common/feedback/CustomToast'

const Layout = ({children} : {children : ReactNode}) => {
    return (
        <main className="relative" >
                <Navbar />
                <CustomToast />
                {children}
                <Footer />
        </main>
    )
}

export default Layout