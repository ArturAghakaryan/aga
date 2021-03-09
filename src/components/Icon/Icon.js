import React, { useState } from "react";

// let path = [];

// const setPath = (value) => {};

// const getPath = (path) => {};

// getPath(path);

//  import IconValu from path;

const Icon = ({ name = "aaa", pack = "default" }) => {
  const path = '';

  console.log(path);
  return (
    <span className={`icon icon-${name}`}>
      {/* // <img src={path}> </img> */}
      <img src={'./assests/Icons/' + pack + '/menu.svg' } />
    </span>
  );
};

export default Icon;

// import React, { Component } from "react";

// console.log(this.name);

// export default class Icon extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "menu",
//       pack: "default",
//     };
//   }
//   render() {
//     return <div></div>;
//   }
// }
