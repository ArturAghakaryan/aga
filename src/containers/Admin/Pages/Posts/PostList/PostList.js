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

import { setReduxPosts, setReduxPostsHasMore, setReduxDeletePosts, setReduxUpdatePosts, setReduxPostsStartAt, setReduxPostsEndAt, getReduxMorePosts } from 'actions/postsActions'

import "./PostList.scss";

const endAt = 9;

const PostList = (props) => {
  const [postsConfig, setPostsConfig] = useState({
    startAt: props.startAt,
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
      props.setReduxPosts(postsConfig.startAt, endAt).then(() => {
        props.setReduxPostsEndAt(endAt)
      })
    }
    fbService.postsService.getAllPosts().then((data) => {
      props.setReduxPostsHasMore(data.length > ((props.posts && props.posts.length) || endAt) ? true : false)
    });
  }, []);


  useEffect(() => {
    if (postsConfig.isOpenEditeModal && postsConfig.postId) {
      props.posts.filter((el) => {
        if (el.id === postsConfig.postId) {
          setPostsConfig({
            ...postsConfig,
            titleValue: el.title,
            descValue: el.body,
          });
        }
      })
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

    const res = await fbService.postsService.editePost(
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

    props.setReduxUpdatePosts(newPosts)

    setPostsConfig({
      ...postsConfig,
      isOpenEditeModal: false,
      titleValue: "",
      descValue: "",
    });
    toast.success(`Post edited`);
  };

  const deletePost = async () => {
    fbService.postsService
      .deletePost(postsConfig.postId, 0, postsConfig.totalItem)
      .then((data) => {
        props.setReduxDeletePosts(data)
        props.setReduxPostsHasMore(data.length < postsConfig.totalItem ? false : true)
        setPostsConfig({
          ...postsConfig,
          postId: null,
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
    const newStartAt = props.startAt + endAt;
    const newEndAt = newStartAt + endAt - 1;

    props.setReduxPostsStartAt(newStartAt)
    props.setReduxPostsEndAt(newEndAt)

    setPostsConfig({
      ...postsConfig,
      loading: true,
    });

    props.getReduxMorePosts(newStartAt, newEndAt, endAt).then(() => {
      setPostsConfig({
        ...postsConfig,
        loading: false,
        totalItem: newEndAt,
      });
    })
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
      <table className="dark-table posts-table">
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
                <th className="dark-table__header--number">No</th>
                <th className="dark-table__header--name">Name</th>
                <th className="dark-table__header--desc">Description</th>
                <th className="dark-table__header--action">Action</th>
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
            {props.hasMore && (
              <tfoot>
                <tr>
                  <td colSpan="4">
                    <div className="posts-load-more">
                      {postsConfig.loading && (
                        <div className="app-loader-container">
                          <div className="app-loader"></div>
                        </div>
                      )}
                      {props.hasMore && !postsConfig.loading && (
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
    posts: state.posts.data,
    postsTotalItems: state.posts.dataTotalItems,
    hasMore: state.posts.hasMore,
    startAt: state.posts.startAt
  }
}

const mapDispacheToProps = {
  setReduxPosts,
  setReduxDeletePosts,
  setReduxUpdatePosts,
  setReduxPostsStartAt,
  setReduxPostsHasMore,
  getReduxMorePosts,
  setReduxPostsEndAt,
}

export default connect(mapStateToProps, mapDispacheToProps)(PostList);
