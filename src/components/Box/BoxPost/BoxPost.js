import React from 'react'
import PropTypes from "prop-types";

import './BoxPost.scss'
import Link from 'components/Link/Link';

const BoxPost = ({data , className}) => {
    return (
        <div className={`box box-post ${className}`}>
            <h3 className="box__title">{data.title}</h3>
            <p className="box__desc">{data.body}
            <Link to={`posts/${data.id}`}> read more...</Link>
            </p>
        </div>
    )
}

BoxPost.propTypes = {
    className: PropTypes.string,
    data: PropTypes.object,
}

export default BoxPost
