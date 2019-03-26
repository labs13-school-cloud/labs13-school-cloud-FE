// component to contain all the components related to training series
import React from "react";

//Components
import TrainingSeriesList from "./TrainingSeriesList";

const TrainingSeriesView = props => {
  console.log(props);
  return (
    <div>
      <TrainingSeriesList />
    </div>
  );
};

export default TrainingSeriesView;
