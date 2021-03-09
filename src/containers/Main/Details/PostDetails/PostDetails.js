import React, { Component } from "react";

import fbService from "api/fbService";

import "./PostDetails.scss";

export class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fbService.getPost(this.props.match.params.postId).then((data) => {
      this.setState({
        data: data,
      });
    });
  }

  render() {
    const { data } = this.state;

    if (!data) {
      return (
        <div className="app-loader-container container">
          <div className="app-loader"></div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="post-detail">
          <h2 className="post-detail__title">{data.title}</h2>
          <p className="post-detail__desc">{data.body}</p>
        </div>
      </div>
    );
  }
}

export default PostDetails;
