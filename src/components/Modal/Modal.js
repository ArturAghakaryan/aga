import React, { Component } from "react";
import { Modal as MaterialModal } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "components/Button/Button";

import "./Modal.scss";

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      modalTitle: props.modalTitle ? props.modalTitle : null,
      className: props.className ? props.className : "",
      modalFunction: props.modalFunction ? props.modalFunction : null,
      functionButtonTitle: props.functionButtonTitle
        ? props.functionButtonTitle
        : null,
      functionButtonDisabled: props.functionButtonDisabled
        ? props.functionButtonDisabled
        : false,
      showTopCloseButton: props.showTopCloseButton !== false ? true : null,
      showBottomCloseButonn:
        props.showBottomCloseButonn !== false ? true : null,
      showBottomCloseButonnTitle: props.showBottomCloseButonnTitle
        ? props.showBottomCloseButonnTitle
        : "Close",
    };
  }

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };
  s;

  render() {
    const {
      isModalOpen,
      modalTitle,
      className,
      modalFunction,
      functionButtonTitle,
      functionButtonDisabled,
      showTopCloseButton,
      showBottomCloseButonn,
      showBottomCloseButonnTitle,
    } = this.state;
    
    return (
      <MaterialModal
        open={isModalOpen}
        onClose={this.closeModal}
        className={`modal ${className}`}
      >
        <div className="modal__content">
          <div className="modal__header">
            {modalTitle ? <span>{modalTitle}</span> : ""}

            {showTopCloseButton && (
              <Button className="modal__close-btn" onClick={this.closeModal}>
                <HighlightOffIcon />
              </Button>
            )}
          </div>
          <div className="modal__body">{this.props.children}</div>
          <div className="modal__footer">
            {showBottomCloseButonn && (
              <Button className="is-secondary" onClick={this.closeModal}>
                {showBottomCloseButonnTitle}
              </Button>
            )}
            {modalFunction && (
              <Button
                className="is-primary"
                onClick={modalFunction}
                loading={functionButtonDisabled}
              >
                {functionButtonTitle}
              </Button>
            )}
          </div>
        </div>
      </MaterialModal>
    );
  }
}

export default Modal;
