import React from 'react'
import icon from '../logo.svg'

export default function Footer() {
    return (
        <div className="footer">
            <div>
                <img
                    src={icon}
                    height="50"
                    width='50'
                    alt="logo"
                    className='logoFooter'
                />
            </div>
            <span> Proudly powered by Cosmic JS </span>
        </div>
    )
}
