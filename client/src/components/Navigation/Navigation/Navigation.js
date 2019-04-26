// navigation includes tab navigation, breadcrumbs, user avatar
import React from 'react';

//Styling
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const Navigation = props => {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);

    // sets the tab value in dashboard to the new selected tab value
    props.changeTabValue(newValue);
  }
  return (
    <>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab label="Training Series" />
          <Tab label="Team Members" />
        </Tabs>
      </Paper>
    </>
  );
};

export default Navigation;
