import React from "react";
import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux"

// import { AppContext } from "context/AppContext";

import PageNotFoud from "containers/PageNotFoud/PageNotFoud";
import Login from "containers/Admin/Auth/Login/Login";

import Main from "containers/Main/Main";
import HomePage from "containers/Main/Pages/HomePage/HomePage";
import Posts from "containers/Main/Pages/Posts/Posts";
import PostDetails from "containers/Main/Details/PostDetails/PostDetails";
import Todos from "containers/Main/Pages/Todos/Todos";

import Admin from "containers/Admin/Admin";
import Dashboard from "containers/Admin/Pages/Dashboard/Dashboard";
import AdminPosts from "containers/Admin/Pages/Posts/Posts";
import AdminTodos from "containers/Admin/Pages/Todos/Todos";
import Users from "containers/Admin/Pages/Users/Users";


const AppRoutes = (props) => {
  const logdin = props.user
  return (
    <>
      <Switch>
        <Route
          exact
          path={["/admin*"]}
          render={(props) =>
            logdin ? (
              <Admin {...props}>
                <Switch>
                  <Route exact path="/admin" component={Dashboard} />
                  <Route exect path="/admin/posts" component={AdminPosts} />
                  <Route exect path="/admin/todos" component={AdminTodos} />
                  <Route exect path="/admin/users" component={Users} />
                </Switch>
              </Admin>
            ) : (
              <Login {...props} />
            )
          }

        ></Route>

        <Route path={["/", "/posts", "/posts/:postId", "/todos"]} exact>
          <Main>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/posts/:postId" component={PostDetails} />
            <Route exact path="/todos" component={Todos} />
          </Main>
        </Route>
        <Route path="*" component={PageNotFoud} />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.data
  }
}

export default connect(mapStateToProps)(AppRoutes);
