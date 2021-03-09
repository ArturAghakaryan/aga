import React, { Component } from "react";

import Button from "components/Button/Button";
import Box from "components/Box/Box";
import fbService from "api/fbService";

import "./Posts.scss";

const endAt = 8;

export class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      startAt: 0,
      hesMore: false,
      loading: false,
    };
  }

  componentDidMount() {
    fbService.getPosts(this.state.startAt, endAt).then((data) => {
      this.setState({
        posts: data,
        hesMore: data.length <= endAt ? false : true,
      });
    });
  }

  getMore = () => {
    const newStartAt = this.state.startAt + endAt + 1;
    const newEndAt = newStartAt + endAt;

    this.setState({
      startAt: newStartAt,
      loading: true,
      totalItem: newEndAt,
    });

    fbService.getPosts(newStartAt, newEndAt).then((data) => {
      this.setState({
        posts: [...this.state.posts, ...data],
        hesMore: data.length <= endAt ? false : true,
        loading: false,
      });
    });
  };

  render() {
    const { loading, hesMore, posts, switcherOpen, showButtons } = this.state;
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

export default Posts;
