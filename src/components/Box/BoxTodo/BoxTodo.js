import React from 'react'
import PropTypes from "prop-types";

import './BoxTodo.scss'

const BoxTodo = ({data , className}) => {
    return (
        <div className={`box box-todo ${className}`}>
            <h3 className="box__title">{data.title}</h3>
        </div>
    )
}

BoxTodo.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
}

export default BoxTodo