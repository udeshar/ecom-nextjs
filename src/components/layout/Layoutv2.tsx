import React, { ReactNode } from 'react'
import OnboardNavbar from '../common/navbar/OnboardNavbar'
import Footer from '../common/footer/Footer'

const Layoutv2 = ({children} : {children : ReactNode}) => {
    return (
        <main>
                <OnboardNavbar />
                {children}
                {/* <Footer /> */}
        </main>
    )
}

export default Layoutv2