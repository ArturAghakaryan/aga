import React, { Component } from "react";
import { connect } from 'react-redux'

import Button from "components/Button/Button";
import Box from "components/Box/Box";
import fbService from 'api/fbService'
import { setReduxTodos, setReduxTodosHasMore, setReduxTodosStartAt, setReduxTodosGetMore } from 'actions/todosActions'

import "./Todos.scss";

const endAt = 6;

export class Todos extends Component {
  state = {
    loading: false,
    dataMaxItem: null
  };

  componentDidMount() {
    if (!this.props.todos) {
      fbService.todosService.getTodos(this.props.startAt, endAt).then((data) => {
        this.props.setReduxTodos(data)
      })
    }
    fbService.todosService.getAllTodos().then((data) => {
      this.setState({
        dataMaxItem: data.length
      })
      this.props.setReduxTodosHasMore(data.length > this.props.todos.length ? true : false)
    })
  }

  getMore = () => {
    const newStartAt = this.props.startAt + endAt;
    const newEndAt = newStartAt + endAt - 1;

    this.setState({
      loading: true
    })

    this.props.setReduxTodosStartAt(newStartAt);

    fbService.todosService.getTodos(newStartAt, newEndAt).then((data) => {
      this.props.setReduxTodosGetMore(data)
      this.props.setReduxTodosHasMore(this.state.dataMaxItem > this.props.todos.length ? true : false)
      this.setState({
        loading: false
      })
    })
  
  };

  render() {
    const { loading } = this.state;
    const { todos, hasMore } = this.props;
    if (!todos) {
      return (
        <div className="app-loader-container container">
          <div className="app-loader"></div>
        </div>
      );
    }

    if (todos.length === 0) {
      return (
        <div className="container">
          <div className="tudos-inner">
            <p className="tudos-no-result">No results</p>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="tudos-inner">
          <div className="tudos-items">
            {todos.map((el) => {
              return (
                <div key={el.id} className="tudos-item">
                  <Box box={"todo"} data={el} />
                </div>
              );
            })}
          </div>

          {hasMore && (
            <div className="tudos-load-more">
              {loading && (
                <div className="app-loader-container">
                  <div className="app-loader"></div>
                </div>
              )}
              {hasMore && !loading && (
                <Button className="btn is-primary btn-load-more" onClick={this.getMore}>
                  Get More
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.data,
    hasMore: state.todos.hasMore,
    startAt: state.todos.startAt
  }
}

const mapDispacheToProps = {
  setReduxTodos,
  setReduxTodosHasMore,
  setReduxTodosStartAt,
  setReduxTodosGetMore
}

export default connect(mapStateToProps, mapDispacheToProps)(Todos);
