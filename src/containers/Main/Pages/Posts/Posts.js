import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "components/Button/Button";
import Box from "components/Box/Box";
import { reduxActionTypes } from "reducers/reduxActionTypes";
import fbService from "api/fbService";

import "./Posts.scss";

const endAt = 9;

export class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // posts: null,
      startAt: 0,
      hesMore: false,
      loading: false,
    };
  }

  componentDidMount() {
    // fbService.getPosts(this.state.startAt, endAt).then((data) => {
    //   this.setState({
    //     posts: data,
    //     hesMore: data.length <= endAt ? false : true,
    //   });
    // });
    if (!this.props.posts) {
      fbService.getPosts(this.state.startAt, endAt).then((data) => {
        console.log(data);
        this.props.setReduxPosts(data)
        this.props.setReduxPostsTotalItems(endAt)
        this.setState({
          hesMore: data.length < endAt ? false : true,
        });
      });
    } else {
      this.setState({
        hesMore: this.props.posts.length < this.props.postsTotalItems ? false : true,
      });
    }
  }

  getMore = () => {
    const newStartAt = this.state.startAt + endAt + 1;
    const newEndAt = newStartAt + endAt;

    this.setState({
      startAt: newStartAt,
      loading: true,
    });

    this.props.setReduxPostsTotalItems(newEndAt)

    fbService.getPosts(newStartAt, newEndAt).then((data) => {
      this.props.getReduxMorePosts(data)
      this.setState({
        // posts: [...this.state.posts, ...data],
        hesMore: data.length <= endAt ? false : true,
        loading: false,
      });
    });
  };

  render() {
    console.log(this.props);
    const { loading, hesMore } = this.state;
    const { posts } = this.props
    if (!posts) {
      return (
        <div className="container">
          <div className="posts-inner">
            <div className="app-loader-container container">
              <div className="app-loader"></div>
            </div>
          </div>
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <div className="container">
          <div className="posts-inner">
            <p className="posts-no-result">No results</p>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="posts-inner">
          <div className="posts-items">
            {posts.map((el) => {
              {
                return (
                  <div key={el.id + 1} className="posts-item">
                    <Box box={"post"} data={el} />
                  </div>
                );
              }
            })}
          </div>
          <div className="posts-load-more">
            {loading && (
              <div className="app-loader-container">
                <div className="app-loader"></div>
              </div>
            )}
            {hesMore && !loading && (
              <Button
                className="is-primary btn-load-more"
                onClick={this.getMore}
              >
                Get More
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    posts: state.posts,
    postsTotalItems: state.postsTotalItems
  }
}

const mapDispacheToProps = {

  setReduxPosts: (posts) => ({
    type: reduxActionTypes.SET_POSTS,
    payload: {
      posts,
    }
  }),
  setReduxPostsTotalItems: (postsTotalItems) => ({
    type: reduxActionTypes.SET_POSTS_TOTOAL_ITEMS_COUNT,
    payload: {
      postsTotalItems,
    }
  }),
  getReduxMorePosts: (posts) => ({
    type: reduxActionTypes.GET_MORE_POSTS,
    payload: {
      posts,
    }
  }),
}

export default connect(mapStateToProps, mapDispacheToProps)(Posts);
