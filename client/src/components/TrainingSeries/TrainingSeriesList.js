// main page for displaying list of all training series
import React from 'react';
import TrainingSeries from './TrainingSeries';
import styled from 'styled-components';

const TrainingSeriesList = () => {
  return (
    <ListStyles>
      <TrainingSeries />
      <TrainingSeries />
      <TrainingSeries />
      <TrainingSeries />
      <TrainingSeries />
    </ListStyles>
  );
};

export default TrainingSeriesList;

const ListStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
