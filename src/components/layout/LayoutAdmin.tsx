import React, { ReactNode } from 'react'
import AdminNavbar from '../common/navbar/AdminNavbar'
import Footer from '../common/footer/Footer'

const LayoutAdmin = ({children} : {children : ReactNode}) => {
    return (
        <main>
                <AdminNavbar />
                {children}
                <Footer />
        </main>
    )
}

export default LayoutAdmin