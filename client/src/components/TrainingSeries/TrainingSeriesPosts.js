// displays all posts of a training series
import React from "react";

// Components
import PostModal from '../Modals/PostModal';

//PropTypes
import PropTypes from "prop-types";

// Styling
import Button from "@material-ui/core/Button";

function TrainingSeriesPosts(props) {
    console.log("props in TSP", props);
    const series = props.trainingSeries.find(series => `${series.trainingSeriesID}` === props.match.params.id);
    console.log("series", series);
    return (
        <>
        <PostModal />
        {series.trainingSeriesID}
        {series.title}
        </>
    )
}

TrainingSeriesPosts.propTypes = {

}

export default TrainingSeriesPosts;