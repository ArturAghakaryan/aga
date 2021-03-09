import React, { useEffect, useState, useRef } from "react";

import fbService from "api/fbService";
import Button from "components/Button/Button";
import Field from "components/Field/Field";
import Modal from "components/Modal/Modal";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

import "./Posts.scss";
import Link from "components/Link/Link";

const endAt = 8;

const Posts = () => {
  const [postsConfig, setPostsConfig] = useState({
    posts: null,
    startAt: 0,
    hasMore: true,
    loading: false,
    totalItem: endAt,
    modalNumber: null,
    titleValue: "",
    descValue: "",
  });

  useEffect(() => {
    fbService.getPosts(postsConfig.startAt, endAt).then((data) => {
      setPostsConfig({
        ...postsConfig,
        posts: data,
        hesMore: data.length <= postsConfig.totalItem ? false : true,
      });
    });

    return () => {};
  }, []);

  const removeModal = useRef();
  const editeModal = useRef();

  const openRemoveModal = (modalNumber) => {
    setPostsConfig({
      ...postsConfig,
      modalNumber: modalNumber,
    });
    removeModal.current.openModal();
  };

  const openEditeModal = (modalNumber) => {
    setPostsConfig({
      ...postsConfig,
      modalNumber: modalNumber,
    });

    fbService.getPost(modalNumber).then((data) => {
      setPostsConfig({
        ...postsConfig,
        titleValue: data.title,
        descValue: data.body,
      });
    });

    editeModal.current.openModal();
  };

  const savePost = (postsConfig2) => {
    console.log("2", postsConfig2);
    console.log("ssss", postsConfig);
    // const postaDatan = postsConfig.posts.filter((el) => {
    //   if (el.id === postsConfig.modalNumber) {
    //     console.log(postsConfig.modalNumber);
    //     return el;
    //   }
    // });
    // console.log(postaDatan);
    // fbService.editePost({
    //   ...postsConfig,
    // // });
    // editeModal.current.closeModal();
  };

  const changeValue = (name, value) => {
    setPostsConfig({
      ...postsConfig,
      [name]: value,
    });
  };

  const deletePost = (id) => {
    console.log(postsConfig);
    fbService.deletePost(id, 0, postsConfig.totalItem).then((data) => {
      setPostsConfig({
        ...postsConfig,
        posts: data,
        modalNumber: null,
        hesMore: data.length <= postsConfig.totalItem ? false : true,
      });
    });
    removeModal.current.closeModal();
  };

  const getMore = () => {
    const newStartAt = postsConfig.startAt + endAt + 1;
    const newEndAt = newStartAt + endAt;

    setPostsConfig({
      ...postsConfig,
      loading: true,
    });

    fbService.getPosts(newStartAt, newEndAt).then((data) => {
      setPostsConfig({
        ...postsConfig,
        posts: [...postsConfig.posts, ...data],
        hesMore: data.length <= endAt ? false : true,
        loading: false,
        startAt: newStartAt,
        totalItem: newEndAt,
      });
    });
  };

  return (
    <>
      <div className="app-admin-posts">
        <div className="app-admin-posts__title">Posts list</div>
        <div className="app-admin-posts__buttons">
          <Button className="add-new-post">Add new post</Button>
        </div>
        <div className="app-admin-posts__table">
          {!postsConfig.posts ? (
            <div className="app-loader-container">
              <div className="app-loader"></div>
            </div>
          ) : (
            <>
              <table className="dark-table">
                <thead>
                  <tr className="dark-table__header">
                    <th>No</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {postsConfig.posts.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.body}</td>
                        <td>
                          <div className="table-buttons">
                            <Button
                              className="table-button"
                              onClick={() => {
                                openEditeModal(item.id);
                              }}
                            >
                              <EditIcon />
                            </Button>
                            <Link
                              to={`/posts/${item.id}`}
                              className="table-button"
                              target="_blank"
                            >
                              <VisibilityIcon />
                            </Link>
                            <Button
                              className="table-button"
                              onClick={() => {
                                openRemoveModal(item.id);
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {postsConfig.hesMore && (
                  <tfoot>
                    <tr>
                      <td colSpan="4">
                        <div className="posts-load-more">
                          {postsConfig.loading && (
                            <div className="app-loader-container">
                              <div className="app-loader"></div>
                            </div>
                          )}
                          {postsConfig.hesMore && !postsConfig.loading && (
                            <Button className="btn-load-more" onClick={getMore}>
                              Get More
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </>
          )}
        </div>
      </div>

      {/**
       * Delete modal
       */}
      <Modal
        ref={removeModal}
        modalTitle="delete post"
        className="dark-modal delete-modal"
        modalFunction={() => {
          deletePost(postsConfig);
        }}
        functionButtonTitle="yes"
        showTopCloseButton={false}
        showBottomCloseButonnTitle="No"
      >
        Do you want to delete this post?
      </Modal>
      {/**
       * Edite modal
       */}
      <Modal
        ref={editeModal}
        modalTitle="Edit post"
        className="edit-modal"
        modalFunction={savePost}
        functionButtonTitle="Save"
        showBottomCloseButonnTitle="Close"
      >
        <Field
          type="text"
          placeholder="Entry your new post title..."
          label="Post title"
          id="postTitle"
          value={postsConfig.titleValue}
          onChange={(e) => changeValue("titleValue", e.target.value)}
        />
        <Field
          type="textarea"
          placeholder="Entry your new post description..."
          label="Post description"
          id="postDescription"
          value={postsConfig.descValue}
          onChange={(e) => changeValue("descValue", e.target.value)}
        />
        <Button onClick={savePost}>aaaaaaaaaaaaaaaaaaaa</Button>
      </Modal>
    </>
  );
};

export default Posts;
