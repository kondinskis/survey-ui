import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ConfirmDialog from "./ConfirmDialog";

const Confirm = (props) => {
  return new Promise((resolve, reject) => {
    let el = document.createElement("div");

    const handleResolve = (result) => {
      unmountComponentAtNode(el);
      el = null;
      if (result) {
        resolve();
      } else {
        reject();
      }
    };

    render(<ConfirmDialog {...props} onClose={handleResolve} />, el);
  });
};

export default Confirm;
