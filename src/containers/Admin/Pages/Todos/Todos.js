import React, { useState } from 'react'
import { connect } from "react-redux"

import Button from "components/Button/Button"
import TodosList from "./TodosList/TodosList"
import TodosModal from 'components/TodosModal/TodosModal'
import fbService from 'api/fbService'

import { crateReduxTodos, setReduxTodosHasMore } from 'actions/todosActions'

import './Todos.scss'
import { toast } from 'react-toastify'


const Todos = (props) => {

    const [todosConfig, setTodosConfig] = useState({
        titleValue: "",
        completedValue: false,
        isOpenCrateModal: false,
    })

    const openCrateModal = () => {
        setTodosConfig({
            ...todosConfig,
            isOpenCrateModal: true,
        })
    }

    const closeCrateModal = () => {
        setTodosConfig({
            ...todosConfig,
            isOpenCrateModal: false,
        })
    }

    const crateTodos = async () => {
        fbService.todosService.crateTodos({
            title: todosConfig.titleValue,
            completed: todosConfig.completedValue
        }).then((data) => {
            if (props.todos.length < props.endAt) {
                props.crateReduxTodos(data)
            }
            toast.success(`Todo create`);
        })

        await fbService.todosService.getAllTodos().then((data) => {
            props.setReduxTodosHasMore(data.length >= props.endAt ? true : false)
        });

        setTodosConfig({
            ...todosConfig,
            titleValue: "",
            completedValue: false,
            isOpenCrateModal: false
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
    return (
        <>
            <div className="app-admin-todos">
                <div className="app-admin-todos__title">Todos</div>
                <div className="app-admin-todos__buttons">
                    <Button className="add-new-todo" onClick={openCrateModal}>Add new todos</Button>
                </div>
                <div className="app-admin-todos__table">
                    <TodosList />
                </div>
            </div>
            <TodosModal
                isOpen={todosConfig.isOpenCrateModal}
                action={crateTodos}
                modalTitle="Crate post"
                className="crate-modal"
                buttonTitle="Save"
                onClose={closeCrateModal}
                changeValue={changeValue}
                completedValue={todosConfig.completedValue}
                titleValue={todosConfig.titleValue}
            />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.data,
        endAt: state.todos.endAt
    }
}

const mapDispacheToProps = {
    crateReduxTodos,
    setReduxTodosHasMore
}

export default connect(mapStateToProps, mapDispacheToProps)(Todos)
