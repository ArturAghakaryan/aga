import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux"

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

import fbService from "api/fbService";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import PostModal from "components/PostModal/PostModal";
import Link from "components/Link/Link";

import { reduxActionTypes } from "reducers/reduxActionTypes";

import "./PostList.scss";

const endAt = 8;

const PostList = (props) => {
  const [postsConfig, setPostsConfig] = useState({
    startAt: 0,
    hasMore: false,
    loading: false,
    totalItem: endAt,
    postId: null,
    titleValue: "",
    descValue: "",
    isOpenRemoveModal: false,
    isOpenEditeModal: false,
  });

  useEffect(() => {
    if (!props.posts) {
      fbService.getPosts(postsConfig.startAt, endAt).then((data) => {
        props.setReduxPosts(data)
        setPostsConfig({
          ...postsConfig,
          hesMore: data.length < postsConfig.totalItem ? false : true,
        });
      });
    } else {
      setPostsConfig({
        ...postsConfig,
        hesMore: props.posts.length < postsConfig.totalItem ? false : true,
      });
    }


  }, []);

  // useEffect(() => {
  //   if (props.posts) {
  //     setPostsConfig({
  //       ...postsConfig,
  //       hesMore: props.posts.length < postsConfig.totalItem ? false : true,
  //     });
  //   }
  // },[props.posts]);


  useEffect(() => {
    if (postsConfig.isOpenEditeModal && postsConfig.postId) {
      fbService.getPost(postsConfig.postId).then((data) => {

        setPostsConfig({
          ...postsConfig,
          titleValue: data.title,
          descValue: data.body,
        });
      });
    }
  }, [postsConfig.isOpenEditeModal]);

  const openModal = (name, id) => {
    setPostsConfig({
      ...postsConfig,
      postId: id,
      [name]: true,
    });
  };

  const closeModal = (name) => {
    setPostsConfig({
      ...postsConfig,
      postId: null,
      [name]: false,
    });
  };

  const updatePost = async () => {
    const postaDatan = props.posts.filter((el) => {
      if (el.id === postsConfig.postId) {
        return el;
      }
    });

    const res = await fbService.editePost(
      postaDatan[0],
      postsConfig.titleValue,
      postsConfig.descValue
    );

    const newPosts = props.posts.map((el) => {
      if (el.id !== postsConfig.postId) {
        return el;
      }
      return res;
    });

    props.updateReduxPosts(newPosts)

    setPostsConfig({
      ...postsConfig,
      isOpenEditeModal: false,
      titleValue: "",
      descValue: "",
    });
    toast.success(`Post edited`);
  };

  const deletePost = async () => {
    fbService
      .deletePost(postsConfig.postId, 0, postsConfig.totalItem)
      .then((data) => {
        props.deleteReduxPosts(data)
        setPostsConfig({
          ...postsConfig,
          postId: null,
          hesMore: data.length <= postsConfig.totalItem ? false : true,
          isOpenRemoveModal: false,
        });
      });

    await toast.success(`Post deleded`);
  };

  const changeValue = (e) => {
    const { name, value } = e.target;
    setPostsConfig({
      ...postsConfig,
      [name]: value,
    });
  };

  const getMore = () => {
    const newStartAt = postsConfig.startAt + endAt + 1;
    const newEndAt = newStartAt + endAt;

    setPostsConfig({
      ...postsConfig,
      loading: true,
    });

    fbService.getPosts(newStartAt, newEndAt).then((data) => {
      props.getReduxMorePosts(data)
      setPostsConfig({
        ...postsConfig,
        hesMore: data.length <= newEndAt ? false : true,
        loading: false,
        startAt: newStartAt,
        totalItem: newEndAt,
      });
    });
  };

  if (!props.posts) {
    return (
      <div className="app-loader-container">
        <div className="app-loader"></div>
      </div>
    );
  }


  return (
    <>
      <table className="dark-table">
        {props.posts.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan="4">
                <span>No resulte</span>
              </td>
            </tr>
          </tbody>
        ) : (
          <>
            <thead>
              <tr className="dark-table__header">
                <th className="dark-table__header-number">No</th>
                <th className="dark-table__header-name">Name</th>
                <th className="dark-table__header-desc">Description</th>
                <th className="dark-table__header-action">Action</th>
              </tr>
            </thead>
            <tbody>
              {props.posts.map((item) => {
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
                            openModal("isOpenEditeModal", item.id);
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
                            openModal("isOpenRemoveModal", item.id);
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
          </>
        )}
      </table>
      {/**
       * Delete modal
       */}
      <Modal
        isOpen={postsConfig.isOpenRemoveModal}
        modalTitle="Delete post"
        className="dark-modal delete-modal"
        action={deletePost}
        actionButtonTitle="Yes"
        onClose={() => {
          closeModal("isOpenRemoveModal");
        }}
        showTopCloseButton={false}
        bottomCloseButonnTitle="No"
      >
        Do you want to delete this post?
      </Modal>
      <PostModal
        isOpen={postsConfig.isOpenEditeModal}
        modalTitle="Edite modal"
        className="edite-modal"
        action={updatePost}
        onClose={() => {
          closeModal("isOpenEditeModal");
        }}
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

  setReduxPosts: (posts) => ({
    type: reduxActionTypes.SET_POSTS,
    payload: {
      posts,
    }
  }),
  getReduxMorePosts: (posts) => ({
    type: reduxActionTypes.GET_MORE_POSTS,
    payload: {
      posts,
    }
  }),
  updateReduxPosts: (posts) => ({
    type: reduxActionTypes.UPDATE_POST,
    payload: {
      posts,
    }
  }),
  deleteReduxPosts: (posts) => ({
    type: reduxActionTypes.DELETE_POST,
    payload: {
      posts,
    }
  }),

}

export default connect(mapStateToProps, mapDispacheToProps)(PostList);
