// Parent "card" container for any TeamMembers displays

import React, { useState, Suspense } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import CardHeader from "./CardHeader/";
import filter from "./filter.js";

import Pagination from "material-ui-flat-pagination";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core/";
import { styles } from "./styles.js";

function SearchCard(props) {
  const [itemCount, setItemCount] = useState(0);
  const [volunteerFilter, setVolunteerFilter] = useState('filter');
  const search = useState("");
  const [offset, setOffset] = useState(0);

  const {
    user_id,
    classes,
    List,
    containerTourNum,
    headerTourNum,
    section,
    history,
    adminVolunteerOverview,
    topTab
  } = props;
  const limit = props.limit || 5;

  const pagination = { offset, limit, setMax: setItemCount };
  return (
    <Paper data-tour={containerTourNum} className={classes.root} elevation={2}>
      <CardHeader
        searchHook={search}
        isSearching={props.isSearching}
        title={section}
        tour={headerTourNum}
        setVolunteerFilter={setVolunteerFilter}
        volunteerFilter={volunteerFilter}
        adminVolunteerOverview={adminVolunteerOverview}
      />
      <Suspense fallback={<div />}>
        <List
          user_id={user_id}
          getFiltered={items =>
            filter({ items, pagination, volunteerFilter, search: search[0].toLowerCase(0) })
          }
          volunteerFilter={volunteerFilter}
          history={history}
          topTab={topTab}
        />
      </Suspense>
      <div className={classes.footer}>
        <Pagination
          limit={limit}
          reduced={true}
          offset={offset}
          total={itemCount}
          centerRipple={true}
          onClick={(e, newOffset) => setOffset(newOffset)}
        />
      </div>
    </Paper>
  );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(
  withStyles(styles)(withRouter(SearchCard))
);
