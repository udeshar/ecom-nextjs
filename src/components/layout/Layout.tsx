import React, { ReactNode } from 'react'
import Navbar from '../common/navbar/Navbar'
import Footer from '../common/footer/Footer'

const Layout = ({children} : {children : ReactNode}) => {
    return (
        <main>
                <Navbar />
                {children}
                <Footer />
        </main>
    )
}

export default Layout