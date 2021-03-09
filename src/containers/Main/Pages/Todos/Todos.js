import React, { Component } from "react";

import service from "api/service";
import Button from "components/Button/Button";
import Box from "components/Box/Box";

import "./Todos.scss";

const limit = 8;

export class Todos extends Component {
  state = {
    data: null,
    start: 0,
    hesMore: true,
    loading: false,
  };

  componentDidMount() {
    service.getTodos(this.state.start, limit).then((data) => {
      this.setState({
        data: data,
      });
    });
  }

  getMore = () => {
    const newstart = this.state.start + limit;

    this.setState({
      start: newstart,
      loading: true,
    });

    service.getTodos(newstart, limit).then((data) => {
      this.setState({
        data: [...this.state.data, ...data],
        hesMore: data.length < limit ? false : true,
        loading: false,
      });
    });
  };

  render() {
    const { loading, hesMore, data } = this.state;

    if (!data) {
      return (
        <div className="app-loader-container container">
          <div className="app-loader"></div>
        </div>
      );
    }
    if (data.length === 0) {
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
            {data.map((el) => {
              return (
                <div key={el.id} className="tudos-item">
                  <Box box={"todo"} data={el} />
                </div>
              );
            })}
          </div>

          <div className="tudos-load-more">
            {loading && (
              <div className="app-loader-container">
                <div className="app-loader"></div>
              </div>
            )}
            {hesMore && !loading && (
              <Button className="btn-load-more" onClick={this.getMore}>
                Get More
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Todos;
