import React from 'react'

import './Layout.scss'

const Layout = ({children ,className = 'content-main'}) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Layout
