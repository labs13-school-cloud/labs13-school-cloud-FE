// Parent "card" container for any TeamMembers displays

import React, { useState, Suspense } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import CardHeader from "./CardHeader/";
import filter from "./filter.js";

import Pagination from "material-ui-flat-pagination";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core/";
import { MessageContainer, styles } from "./styles.js";

function SearchCard(props) {
  const [itemCount, setItemCount] = useState(0);
  const search = useState("");

  const [offset, setOffset] = useState(0);

  const {
    user_id,
    classes,
    Child,
    containerTourNum,
    headerTourNum,
    section,
    handleAdd,
    history
  } = props;
  const limit = props.limit || 5;

  const pagination = { offset: offset, limit: limit, setMax: setItemCount };
  return (
    <Paper data-tour={containerTourNum} className={classes.root} elevation={2}>
      <CardHeader
        searchHook={search}
        title={section}
        tour={headerTourNum}
        add={() => handleAdd()}
      />
      <Suspense fallback={<span />}>
        <Child
          pagination={pagination}
          search={search[0]}
          user_id={user_id}
          filter={filter}
          history={history}
        />
      </Suspense>
      {!itemCount && (
        <MessageContainer>
          <p>
            {props.isLoading
              ? `Loading your ${section}.`
              : `You do not have any ${section}.`}
          </p>
        </MessageContainer>
      )}
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

const mapStateToProps = state => ({
  isLoading: state.teamMembersReducer.status.isLoading
});

export default connect(mapStateToProps)(
  withStyles(styles)(withRouter(SearchCard))
);
