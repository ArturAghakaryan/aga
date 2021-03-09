import React from 'react'
import PropTypes from "prop-types";

import './BoxPost.scss'
import Link from 'components/Link/Link';

const BoxPost = ({data , className}) => {
    return (
        <div className={`box box-post ${className}`}>
            <h3 className="box__title">{data.title}</h3>
            <p className="box__desc">{data.body}
            <Link to={`posts/${data.id}`}> <strong>Reade more...</strong></Link>
            </p>
        </div>
    )
}

BoxPost.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
}

export default BoxPost
