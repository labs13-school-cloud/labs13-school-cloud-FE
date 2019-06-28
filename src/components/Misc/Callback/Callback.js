import React from "react";

//Loading SVG that gets displayed
import Progress from "components/UI/Progress/ProgressCircle";
import { style } from "./styles.js";
import { connect } from "react-redux";

function Callback() {
  //Customized styling

  return (
    <div style={style}>
      <Progress />
    </div>
  );
}

const mapStateToProps = state => {
  console.log('callback', state);
}

export default connect(
  mapStateToProps,
  {}
)(Callback);
