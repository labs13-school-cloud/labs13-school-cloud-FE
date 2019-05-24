import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { withStyles } from "@material-ui/core/styles";

import styled from "styled-components";

const styles = theme => ({
  root: {
    flexGrow: 1,
    boxShadow: "0 7px 3px rgba(0,0,0,0.2)"
  }
});

class SimpleTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (_, value) => {
    value === 0
      ? this.props.setTopTab("overview")
      : value === 1
      ? this.props.setTopTab("team members")
      : value === 2
      ? this.props.setTopTab("training series")
      : value === 3
      ? this.props.setTopTab("notifications")
      : this.props.setTopTab("responses");

    this.setState({
      value
    });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div>
        <AppBar
          className={classes.root}
          data-tour={window.innerWidth > 650 ? "7" : null}
          position="static"
        >
          <TabsStyled
            indicatorColor="primary"
            textColor="primary"
            value={value}
            onChange={this.handleChange}
          >
            <Tab label="Overview" />
            <Tab label="Team Members" />
            <Tab label="Training Series" />
            <Tab label="Notifications" />
            <Tab label="Responses" />
          </TabsStyled>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles)(SimpleTabs);

const TabsStyled = styled(Tabs)`
  background: white;
  color: black;
  width: 100vw;
  display: flex;
  justify-content: center;
`;
