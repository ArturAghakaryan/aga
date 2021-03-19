import React, { useEffect } from 'react'
import { connect } from "react-redux"

import Switch from '@material-ui/core/Switch';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import fbService from 'api/fbService';
import { setReduxTodos, setReduxTodosHasMore, setReduxTodosStartAt, setReduxTodosEndAt, setReduxTodosGetMore } from 'actions/todosActions'

import Button from "components/Button/Button"

import './TodosList.scss'
import TodosModal from 'components/TodosModal/TodosModal';
import { toast } from 'react-toastify';
import Modal from 'components/Modal/Modal';

const endAt = 8;

const TodosList = (props) => {

    const [todosConfig, setTodosConfig] = React.useState({
        startAt: props.startAt,
        lodaing: false,
        totalShowItems: endAt,
        todosMaxItemCount: null,
        todosId: null,
        titleValue: "",
        completedValue: false,
        isOpenRemoveModal: false,
        isOpenEditeModal: false,
    });

    useEffect(async () => {
        if (!props.todos) {
            fbService.todosService.getTodos(todosConfig.startAt, endAt).then((data) => {
                props.setReduxTodos(data)
                props.setReduxTodosEndAt(endAt)
            })
        }
        await fbService.todosService.getAllTodos().then((data) => {
            setTodosConfig({
                ...todosConfig,
                todosMaxItemCount: data.length
            })
            props.setReduxTodosHasMore(data.length > ((props.todos && props.todos.length) || endAt) ? true : false)
        })
    }, [])

    useEffect(() => {
        if (todosConfig.isOpenEditeModal && todosConfig.todosId) {
            props.todos.filter((el) => {
                if (el.id === todosConfig.todosId) {
                    setTodosConfig({
                        ...todosConfig,
                        titleValue: el.title,
                        completedValue: el.completed,
                    });
                }
            })
        }
    }, [todosConfig.isOpenEditeModal]);

    const handleSwitchChange = async (event, data) => {
        let completed = event.target.checked ? true : false;
        const res = await fbService.todosService.updateTodos(data, data.title, completed)

        const newTodos = props.todos.map((el) => {
            if (el.id !== data.id) {
                return el
            }
            return res
        })

        props.setReduxTodos(newTodos);
    };

    const openModal = (name, id) => {
        setTodosConfig({
            ...todosConfig,
            todosId: id,
            [name]: true,
        });
    };

    const closeModal = (name) => {
        setTodosConfig({
            ...todosConfig,
            todosId: null,
            [name]: false,
        });
    };

    const updateTodos = async () => {
        const todosData = props.todos.filter((el) => {
            if (el.id === todosConfig.todosId) {
                return el
            }
        })

        const res = await fbService.todosService.updateTodos(todosData[0], todosConfig.titleValue, todosConfig.completedValue)

        const newTodos = props.todos.map((el) => {
            if (el.id !== todosConfig.todosId) {
                return el
            }
            return res
        })

        props.setReduxTodos(newTodos);

        setTodosConfig({
            ...todosConfig,
            titleValue: "",
            completedValue: false,
            isOpenEditeModal: false
        })

        toast.success(`Todo edited`);
    }

    const deleteTodos = async () => {
        fbService.todosService.deleteTodos(
            todosConfig.todosId,
            0,
            todosConfig.totalShowItems,
        ).then((data) => {
            props.setReduxTodos(data)
            props.setReduxTodosEndAt(props.endAt - 1)
            props.setReduxTodosHasMore(data.length < todosConfig.totalShowItems ? false : true)
            setTodosConfig({
                ...todosConfig,
                todosId: null,
                isOpenRemoveModal: false
            })
        })
        console.log(props.endAt);
        await toast.success(`Todo deleded`);
    }

    const getMore = () => {
        const newStartAt = props.startAt + endAt
        const newEndAt = newStartAt + endAt - 1

        setTodosConfig({
            ...todosConfig,
            lodaing: true,
        })

        props.setReduxTodosStartAt(newStartAt);
        props.setReduxTodosEndAt(newEndAt)

        fbService.todosService.getTodos(newStartAt, newEndAt).then((data) => {
            props.setReduxTodosGetMore(data);
            props.setReduxTodosHasMore(todosConfig.dataMaxItem > (props.todos && props.todos.length) ? true : false);
            setTodosConfig({
                ...todosConfig,
                lodaing: false,
                totalShowItems: newEndAt,
            })
        })

    }

    const changeValue = (e) => {
        const name = e.target.name;
        const value = e.target[e.target.type === "checkbox" ? "checked" : "value"]
        setTodosConfig({
            ...todosConfig,
            [name]: value,
        });
    };

    console.log(todosConfig);

    if (!props.todos) {
        return (
            <div className="app-loader-container">
                <div className="app-loader"></div>
            </div>
        );
    }
    return (
        <>
            <table className="dark-table todos-table">
                {props.todos.length === 0 ? (
                    <tbody>
                        <tr>
                            <td colSpan="4">
                                <span>No resulte</span>
                            </td>
                        </tr>
                    </tbody>
                ) : (<>
                    <thead>
                        <tr className="dark-table__header">
                            <th className="dark-table__header-number">No</th>
                            <th className="dark-table__header-name">Title</th>
                            <th className="dark-table__header-completed">Completed</th>
                            <th className="dark-table__header-action">Action</th>
                        </tr>
                    </thead>
                    <tbody className="dark-table__body">
                        {props.todos.map((el) => {
                            return (
                                <tr key={el.id}>
                                    <td>{el.id}</td>
                                    <td>{el.title}</td>
                                    <td className="dark-table__body-completed">
                                        <Switch className="dark-table__body-completed-switch" checked={el.completed} onChange={(e) => { handleSwitchChange(e, el) }} name={`checked-${el.id}`} color="primary" />
                                    </td>
                                    <td>
                                        <div className="table-buttons">
                                            <Button
                                                className="table-button"
                                                onClick={() => {
                                                    openModal("isOpenEditeModal", el.id);
                                                }}
                                            >
                                                <EditIcon />
                                            </Button>
                                            <Button
                                                className="table-button"
                                                onClick={() => {
                                                    openModal("isOpenRemoveModal", el.id);
                                                }}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    {props.hasMore && (
                        <tfoot>
                            <tr>
                                <td colSpan="4">
                                    <div className="posts-load-more">
                                        {todosConfig.loading && (
                                            <div className="app-loader-container">
                                                <div className="app-loader"></div>
                                            </div>
                                        )}
                                        {props.hasMore && !todosConfig.loading && (
                                            <Button className="btn-load-more" onClick={getMore}>
                                                Get More
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    )}
                </>)}
            </table>
            {/**
             * Delete modal
             */}
            <Modal
                isOpen={todosConfig.isOpenRemoveModal}
                modalTitle="Delete todo"
                className="dark-modal delete-modal"
                action={deleteTodos}
                actionButtonTitle="Yes"
                onClose={() => {
                    closeModal("isOpenRemoveModal");
                }}
                showTopCloseButton={false}
                bottomCloseButonnTitle="No"
            >
                Do you want to delete this todos?
            </Modal>
            <TodosModal
                isOpen={todosConfig.isOpenEditeModal}
                modalTitle="Edite modal"
                className="todos-edite-modal"
                action={updateTodos}
                onClose={() => {
                    closeModal("isOpenEditeModal");
                }}
                titleValue={todosConfig.titleValue}
                completedValue={todosConfig.completedValue}
                changeValue={changeValue}
                buttonTitle="Save"
            />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.data,
        startAt: state.todos.startAt,
        endAt: state.todos.endAt,
        hasMore: state.todos.hasMore,
    }
}

const mapDispacheToProps = {
    setReduxTodos,
    setReduxTodosHasMore,
    setReduxTodosStartAt,
    setReduxTodosEndAt,
    setReduxTodosGetMore,
}

export default connect(mapStateToProps, mapDispacheToProps)(TodosList)
