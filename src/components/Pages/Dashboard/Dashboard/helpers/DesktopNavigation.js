import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import styled from "styled-components";

class SimpleTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
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
    const { value } = this.state;

    return (
      <div>
        <AppBar position="static">
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
export default SimpleTabs;

const TabsStyled = styled(Tabs)`
  background: #f0f0f0;
  color: black;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled(AppBar)`
  @media (max-width: 650px) {
    display: none;
  }
`;
