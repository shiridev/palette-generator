import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const Pdf = (props) => {
  var colors = useSelector((state) => state.colorReducer.colors);
  var dispatch = useDispatch();

  console.log(props.ref);

  return (
    <div className="pdf" ref={props.ref}>
      Pdf
    </div>
  );
};
