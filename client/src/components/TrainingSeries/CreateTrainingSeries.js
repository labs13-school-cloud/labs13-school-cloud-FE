import React from 'react';

import { connect } from 'react-redux';

class CreateTrainingSeries extends React.Component {
  render() {
    console.log('NEW TS PAGE', this.props);
    return (
      <div>
        <h1> New Training Series </h1>
      </div>
    );
  }
}

export default CreateTrainingSeries;
