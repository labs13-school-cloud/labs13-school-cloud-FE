import React, { useState } from "react";
import { connect } from "react-redux";

import TrainingSeriesTabSingle from "./TrainingSeriesTabSingle.js";
import Pagination from "material-ui-flat-pagination";

import { Typography, Fab, TextField, InputAdornment } from "@material-ui/core/";

import { Wrapper, HeaderWrapper, Series } from "./TrainingSeriesTabStyles.js";

//functional related imports
import {
  getTrainingSeries,
  deleteTrainingSeries,
  getMembersAssigned
} from "store/actions";

const TrainingSeriesTab = props => {
  const [searchValue, setSearchValue] = useState("");
  const [limit] = useState(4);
  const [offset, setOffset] = useState(0);

  const routeToSeries = id => {
    props.history.push(`/home/training-series/${id}`);
  };

  const handleClick = offset => {
    setOffset(offset);
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <Typography variant="h6">Training Series</Typography>
        <Fab
          size="small"
          onClick={e => {
            props.history.push("/home/create-training-series");
          }}
          aria-label="Add"
          style={{ margin: "0 10px", background: "#451476", color: "white" }}
        >
          <i className="material-icons">add</i>
        </Fab>
      </HeaderWrapper>

      <TextField
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        fullWidth
        type="search"
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <i className="material-icons">search</i>
            </InputAdornment>
          )
        }}
      />
      <Pagination
        limit={limit}
        offset={offset}
        total={props.trainingSeries.length}
        centerRipple={true}
        onClick={(e, offset) => handleClick(offset)}
      />
      {props.trainingSeries
        .slice(offset, limit + offset)
        .filter(series => series.title.includes(searchValue))
        .map(series => {
          return (
            <Series
              key={series.id}
              onClick={e => {
                routeToSeries(series.id);
              }}
            >
              <TrainingSeriesTabSingle series={series} />
            </Series>
          );
        })}
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return state.trainingSeriesReducer; //just going to leave this as is for now. can cherry pick what we need once im actually putting it together.
};
export default connect(
  mapStateToProps,
  { getTrainingSeries, deleteTrainingSeries, getMembersAssigned }
)(TrainingSeriesTab);
