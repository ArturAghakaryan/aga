import React from 'react'
import PropTypes from "prop-types";

const BoxStandart = ({data , className}) => {
    return (
        <div className={`box box-standart ${className}`}>
            <h3 className="box__title">{data.title}</h3>
            <p className="box__desc">{data.body}</p>
        </div>
    )
}

BoxStandart.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
}

export default BoxStandart
