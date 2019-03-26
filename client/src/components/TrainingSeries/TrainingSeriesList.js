// main page for displaying list of all training series
import React from "react";

//Styling
import styled from "styled-components";

//Components
import TrainingSeries from "./TrainingSeries";

const TrainingSeriesList = props => {
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

//Styled Components
const ListStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
