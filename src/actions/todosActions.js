import { reduxActionTypes } from 'reducers/reduxActionTypes'


export const setReduxTodos = (todos) => ({
    type: reduxActionTypes.SET_TODOS,
    payload: {
        todos
    }
});

export const setReduxTodosGetMore = (todos) => ({
    type: reduxActionTypes.GET_MORE_TODOS,
    payload: {
        todos
    }
})

export const setReduxTodosHasMore = (value) => ({
    type: reduxActionTypes.SET_TODOS_HASMORE,
    payload: {
        hasMore: value
    }
})

export const setReduxTodosStartAt = (value) => ({
    type: reduxActionTypes.SET_TODOS_STARTAT,
    payload: {
        startAt: value
    }
})

export const setReduxTodosEndAt = (value) => ({
    type: reduxActionTypes.SET_TODOS_ENDAT,
    payload: {
        endAt: value
    }
})

export const crateReduxTodos = (todos) => ({
    type: reduxActionTypes.CRATE_TODOS,
    payload: {
        todos,
    }
});