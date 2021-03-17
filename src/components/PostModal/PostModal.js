import React from "react";
import PropTypes from "prop-types";

import Modal from "components/Modal/Modal";
import Field from "components/Field/Field";

const PostModal = ({
  modalTitle = null,
  className = "",
  titleValue,
  descValue,
  changeValue,
  action,
  onClose,
  buttonTitle,
  isOpen,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={modalTitle}
      className={className}
      action={action}
      actionButtonTitle={buttonTitle}
      showBottomCloseButonnTitle="Close"
    >
      <Field
        name="titleValue"
        type="text"
        placeholder="Entry your new post title..."
        label="Post title"
        id="postTitle"
        value={titleValue}
        onChange={changeValue}
      />
      <Field
        name="descValue"
        type="textarea"
        placeholder="Entry your new post description..."
        label="Post description"
        id="postDescription"
        value={descValue}
        onChange={changeValue}
      />
    </Modal>
  );
};

PostModal.propTypes = {
  isModalOpen: PropTypes.bool,
  modalTitle: PropTypes.string,
  className: PropTypes.string,
  buttonTitle: PropTypes.string.isRequired,
  titleValue: PropTypes.string.isRequired,
  descValue: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PostModal;
