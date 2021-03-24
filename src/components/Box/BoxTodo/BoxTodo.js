import React from 'react'
import PropTypes from "prop-types";

import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './BoxTodo.scss'

const BoxTodo = ({ data, className }) => {
    return (
        <div className={`box box-todo ${className}`}>
            <h3 className="box__title">{data.title}</h3>
            <div className="box__completed-content">
                {data.completed ? (
                    <span className="box__completed">
                        <CheckCircleIcon />
                    </span>
                ) : (
                    <span className="box__not-completed">
                        <CancelIcon />
                    </span>
                )}
            </div>
        </div>
    )
}

BoxTodo.propTypes = {
    className: PropTypes.string,
    data: PropTypes.any,
}

export default BoxTodo