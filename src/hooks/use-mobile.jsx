import React from 'react'
import { useState, useEffect } from 'react'

function useMobile() {

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        checkIfMobile()

        // Add event listener to check on resize
        window.addEventListener('resize', checkIfMobile)
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkIfMobile)
        }
    }
    , [])
    return isMobile
}

export default useMobile