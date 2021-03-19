import React from 'react'
import PropTypes from "prop-types";

import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './BoxTodo.scss'

const BoxTodo = ({ data, className }) => {
    return (
        <div className={`box box-todo ${className}`}>
            <h3 className="box__title">{data.title}</h3>
            <div className="box__completed">
                {data.completed ? (
                    <span className="box__completed-yes">
                        <CheckCircleIcon />
                    </span>
                ) : (
                    <span className="box__completed-no">
                        <CancelIcon />
                    </span>
                )}
            </div>
        </div>
    )
}

BoxTodo.propTypes = {
    className: PropTypes.string,
    data: PropTypes.object,
}

export default BoxTodo