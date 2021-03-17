import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal as MaterialModal } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import Button from "components/Button/Button";

import "./Modal.scss";

export class Modal extends Component {
  render() {
    const {
      isOpen,
      modalTitle,
      className,
      action,
      actionButtonTitle,
      actionButtonDisabled,
      onClose,
      showTopCloseButton,
      showBottomCloseButonn,
      bottomCloseButonnTitle,
    } = this.props;

    return (
      <MaterialModal
        open={isOpen}
        onClose={onClose}
        className={`modal ${className}`}
      >
        <div className="modal__content">
          <div className="modal__header">
            {modalTitle ? <span>{modalTitle}</span> : ""}

            {showTopCloseButton && (
              <Button className="modal__close-btn" onClick={onClose}>
                <HighlightOffIcon />
              </Button>
            )}
          </div>
          <div className="modal__body">{this.props.children}</div>
          <div className="modal__footer">
            {showBottomCloseButonn && (
              <Button className="is-secondary" onClick={onClose}>
                {bottomCloseButonnTitle}
              </Button>
            )}
            {action && (
              <Button
                className="is-primary"
                onClick={action}
                loading={actionButtonDisabled}
              >
                {actionButtonTitle}
              </Button>
            )}
          </div>
        </div>
      </MaterialModal>
    );
  }
}

Modal.defaultProps = {
  isOpen: false,
  modalTitle: null,
  className: "",
  action: null,
  actionButtonTitle: null,
  actionButtonDisabled: false,
  showTopCloseButton: true,
  showBottomCloseButonn: true,
  bottomCloseButonnTitle: "Close",
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  modalTitle: PropTypes.string,
  className: PropTypes.string,
  action: PropTypes.func,
  actionButtonTitle: PropTypes.string,
  actionButtonDisabled: PropTypes.bool,
  onClose: PropTypes.func,
  showTopCloseButton: PropTypes.bool,
  showBottomCloseButonn: PropTypes.bool,
  bottomCloseButonnTitle: PropTypes.string,
};

export default Modal;
