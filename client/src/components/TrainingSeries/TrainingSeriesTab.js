import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import TrainingSeriesTabSingle from "./TrainingSeriesTabSingle.js";

//style related imports
//simport Pagination from 'material-ui-flat-pagination';
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import {
  Paper,
  Typography,
  Fab,
  TextField,
  InputAdornment
} from "@material-ui/core/";

//functional related imports
import {
  getTrainingSeries,
  deleteTrainingSeries,
  getMembersAssigned
} from "../../store/actions";

const TrainingSeriesTab = props => {
  const [searchValue, setSearchValue] = useState("");

  const { classes } = props;

  const routeToSeries = id => {
    props.history.push(`/home/training-series/${id}`);
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
      {props.trainingSeries
        .filter(series => series.title.includes(searchValue))
        .map(series => {
          return (
            <Series
              onClick={e => {
                routeToSeries(series.id);
              }}
            >
              {/* <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography variant="h6">{series.title}</Typography>
                <hr />
              </Grid>
              <Grid item xs={6}>
                <Typography style={{ color: "gray" }} variant="caption">
                  {series.description}
                </Typography>
              </Grid>

              <Grid item xs={6} align="center">
                <Grid item>
                  <Typography variant="overline">
                    messages: {series.posts.length}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="overline">
                    assigned: {series.teamMembers.length}
                  </Typography>
                </Grid>
              </Grid>
			</Grid> */}
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

const Wrapper = styled(Paper)`
  width: 90%;
  padding: 10px;
  margin: 48px auto;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Series = styled(Paper)`
  width: 70%;
  margin: 10px auto;
  padding: 20px;
  cursor: pointer;
  &:hover {
    background: #f8f8f8;
  }
`;
