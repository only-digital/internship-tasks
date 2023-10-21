import React from 'react'

function PlusIconSvg({ className }) {
    return (
        <svg className={className} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 1L1 15" strokeWidth="2" strokeLinecap="round" />
            <path d="M1 1L15 15" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

export default PlusIconSvg