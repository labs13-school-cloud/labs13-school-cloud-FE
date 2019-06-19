// Parent "card" container for any Notification displays
import React, { useState, Suspense } from "react";
import { connect } from "react-redux";

import filter from "components/Pages/Notifications/Card/filter.js";

import SearchCard from "components/UI/SearchCard"

import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core/";
import Pagination from "material-ui-flat-pagination";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { styles, MainContainer } from "./styles.js";

function VolunteerCard(props) {
  const [offset, setOffset] = useState(0);

  const { classes, List } = props;
  const limit = props.limit || 5;

  // const pagination = { limit, offset, setMax: setNotificationsCount };

  return (
    <MainContainer>
      <Paper
        data-tour="5"
        style={{ width: props.width || "100%" }}
        className={classes.root}
        elevation={2}
      >
        <div className={classes.columnHeader}>
          <Typography variant="h5" className={classes.lgTitle}>
            Volunteers
          </Typography>
          <div>
            <FormControl className={classes.formControl}>
              <Select
                native
                className={classes.selection}
              >
                <option value={"approved"}>Approved</option>
                <option value={"unapproved"}>Unapproved</option>
              </Select>
            </FormControl>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <h1>Hello</h1>
        </Suspense>
        <div className={classes.footer}>
          <Pagination
            limit={limit}
            offset={offset}
            centerRipple={true}
            onClick={(e, newOffset) => setOffset(newOffset)}
          />
        </div>
      </Paper>
    </MainContainer>
  );
}

const mapStateToProps = state => ({
  isLoading: state.notificationsReducer.isLoading
});

export default connect(mapStateToProps)(withStyles(styles)(VolunteerCard));
