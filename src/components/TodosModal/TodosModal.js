import React from "react";
import PropTypes from "prop-types";

import Modal from "components/Modal/Modal";
import Field from "components/Field/Field";

import './TodosModal.scss'

const TodosModal = ({
    modalTitle = '',
    className = "",
    titleValue,
    completedValue,
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
                placeholder="Entry your new todos title..."
                label="Todos title"
                id="todosTitle"
                value={titleValue}
                onChange={changeValue}
            />
            <Field
                className="modal-completed-switch"
                name="completedValue"
                type="switch"
                label="Todos completed"
                id="todosCompleted"
                value={completedValue}
                onChange={changeValue}
                switchColor="primary"
            />
        </Modal>
    )
}

TodosModal.propTypes = {
    modalTitle: PropTypes.string,
    className: PropTypes.string,
    buttonTitle: PropTypes.string.isRequired,
    titleValue: PropTypes.string.isRequired,
    completedValue: PropTypes.bool.isRequired,
    changeValue: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default TodosModal
