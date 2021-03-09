import React from "react";

import BoxPost from "./BoxPost/BoxPost";
import BoxStandart from "./BoxStandart/BoxStandart";

import "./Box.scss"

const boxItem = {
  post: "post",
  todo: "todo",
};

const Box = ({ box, data = {}, className = "" }) => {
  switch (box) {
    case boxItem.post:
      return <BoxPost data={data} className={className} />;
    case boxItem.todo:
      return <BoxPost data={data} className={className} />;
    default:
      return <BoxStandart data={data} className={className} />;
  }
};

export default Box;
