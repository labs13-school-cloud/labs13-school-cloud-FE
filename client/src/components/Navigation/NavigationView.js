// component to contain all the components related to navigation
import React from 'react';

//Components
import {Navigation} from './index';

const NavigationView = props => {
  return (
    <>
      <Navigation {...props} />
    </>
  );
};

export default NavigationView;
