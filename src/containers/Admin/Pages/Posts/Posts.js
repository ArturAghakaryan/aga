import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux"

import Button from "components/Button/Button";
import PostList from "./PostList/PostList";
import PostModal from "components/PostModal/PostModal";
import fbService from "api/fbService";

import { reduxActionTypes } from "reducers/reduxActionTypes";

import "./Posts.scss";

const Posts = (props) => {
  const [postsConfig, setPostsConfig] = useState({
    titleValue: "",
    descValue: "",
    isopenCrateModal: false,
  });

  const openCrateModal = () => {
    setPostsConfig({
      ...postsConfig,
      isopenCrateModal: true,
    });
  };

  const closeCrateModal = () => {
    setPostsConfig({
      ...postsConfig,
      isopenCrateModal: false,
    });
  };

  const createPost = async () => {
    fbService
      .createPost({
        title: postsConfig.titleValue,
        body: postsConfig.descValue,
      })
      .then((data) => {
        if (props.posts.length < 8) {
          props.crateReduxPosts(data)
        }
        toast.success(`Post create`);
      });
    setPostsConfig({
      ...postsConfig,
      isopenCrateModal: false,
      titleValue: "",
      descValue: "",
    });
  };
  const changeValue = (e) => {
    const { name, value } = e.target;
    setPostsConfig({
      ...postsConfig,
      [name]: value,
    });
  };
  return (
    <>
      <div className="app-admin-posts">
        <div className="app-admin-posts__title">Posts list</div>
        <div className="app-admin-posts__buttons">
          <Button className="add-new-post" onClick={openCrateModal}>
            Add new post
          </Button>
        </div>
        <div className="app-admin-posts__table">
          <PostList />
        </div>
      </div>
      <PostModal
        isOpen={postsConfig.isopenCrateModal}
        modalTitle="Crate post"
        className="crate-modal"
        action={createPost}
        onClose={closeCrateModal}
        titleValue={postsConfig.titleValue}
        descValue={postsConfig.descValue}
        changeValue={changeValue}
        buttonTitle="Save"
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

const mapDispacheToProps = {
  crateReduxPosts: (posts) => ({
    type: reduxActionTypes.CRATE_POST,
    payload: {
      posts,
    }
  })
}

export default connect(mapStateToProps, mapDispacheToProps)(Posts);
