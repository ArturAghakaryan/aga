import React, { useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux"

import Button from "components/Button/Button";
import PostList from "./PostList/PostList";
import PostModal from "components/PostModal/PostModal";
import fbService from "api/fbService";

import { createReduxPosts, setReduxPostsHasMore } from "actions/postsActions";

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
    fbService.postsService
      .createPost({
        title: postsConfig.titleValue,
        body: postsConfig.descValue,
      })
      .then((data) => {
        if (props.posts.length < props.endAt) {
          props.createReduxPosts(data)
        }
        toast.success(`Post create`);
      });

    await fbService.postsService.getAllPosts().then((data) => {
      props.setReduxPostsHasMore(data.length >= props.endAt ? true : false)
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
    posts: state.posts.data,
    endAt: state.posts.endAt
  }
}

const mapDispacheToProps = {
  createReduxPosts,
  setReduxPostsHasMore
}

export default connect(mapStateToProps, mapDispacheToProps)(Posts);
