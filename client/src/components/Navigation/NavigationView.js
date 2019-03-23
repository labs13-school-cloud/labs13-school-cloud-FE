// component to contain all the components related to navigation
import React from "react";
import { Navigation } from "./index";

const NavigationView = props => {
  //   console.log(props);

  return (
    <>
      <Navigation {...props} />
    </>
  );
};

export default NavigationView;
