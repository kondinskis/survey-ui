import React from "react";

import { Spinner } from "reactstrap";

const Loader = ({ active, color = "dark" }) => {
  return (
    active && (
      <div className="d-flex justify-content-center w-100">
        <Spinner color={color} />
      </div>
    )
  );
};

export default Loader;
