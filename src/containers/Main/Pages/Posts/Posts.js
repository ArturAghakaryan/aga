import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "components/Button/Button";
import Box from "components/Box/Box";
import fbService from "api/fbService";

import { setReduxPosts, setReduxPostsHesMore, setReduxPostsStartAt, getReduxMorePosts } from 'actions/postsActions'

import "./Posts.scss";

const endAt = 9;

export class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    if (!this.props.posts) {
      fbService.postsService.getPosts(this.props.startAt, endAt).then((data) => {
        this.props.setReduxPosts(data)
      });
    }
    fbService.postsService.getAllPosts().then((data) => {
      this.props.setReduxPostsHesMore(data.length > this.props.posts.length ? true : false)
    });
  }

  getMore = () => {
    const newStartAt = this.props.startAt + endAt;
    const newEndAt = newStartAt + endAt - 1;

    this.setState({
      loading: true,
    });

    this.props.setReduxPostsStartAt(newStartAt)

    fbService.postsService.getPosts(newStartAt, newEndAt).then((data) => {
      this.props.getReduxMorePosts(data)
      this.props.setReduxPostsHesMore(data.length < endAt ? false : true)
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const { loading } = this.state;
    const { posts, hesMore } = this.props
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
  return {
    posts: state.posts.data,
    postsTotalItems: state.posts.dataTotalItems,
    hesMore: state.posts.hesMore,
    startAt: state.posts.startAt
  }
}

const mapDispacheToProps = {
  setReduxPosts,
  setReduxPostsStartAt,
  setReduxPostsHesMore,
  getReduxMorePosts,
}

export default connect(mapStateToProps, mapDispacheToProps)(Posts);
