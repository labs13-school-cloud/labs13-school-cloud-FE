// main page for displaying list of all training series
import React from "react";

//Styling
import styled from "styled-components";

//Components
import TrainingSeries from "./TrainingSeries";

import { withStyles } from "@material-ui/core";

const TrainingSeriesList = props => {
  return (
    <>
      <ListStyles>
        {props.trainingSeries.map(series => {
          return (
            <TrainingSeries
              key={series.trainingSeriesID}
              deleteTrainingSeries={props.deleteTrainingSeries}
              data={series}
              match={props.match}
              userID={props.userID}
            />
          );
        })}
      </ListStyles>
    </>
  );
};

export default TrainingSeriesList;
//Styled Components
const ListStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
