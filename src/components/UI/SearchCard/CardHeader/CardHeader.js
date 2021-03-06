import React, { useState } from "react";
import { connect } from "react-redux";

import { Typography, Fab, TextField, InputAdornment } from "@material-ui/core/";

import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { styles } from "./styles.js";
import AddModal2 from "components/UI/Modals/addModalV2.js";

function CardHeader(props) {
  const {
    title,
    tour,
    classes,
    searchHook,
    adminVolunteerOverview,
    setVolunteerFilter,
    volunteerFilter,
    user,
    section,
  } = props;

  const [isSearching, setIsSearching] = useState(!!props.isSearching);
  const [search, setSearch] = searchHook;

  const toggleSearch = e => {
    e.preventDefault();
    setIsSearching(!isSearching);
  };

  return (
    <>
      <div className={classes.columnHeader}>
        <Typography variant="h5">{title}</Typography>
        <div className={classes.icons}>
          {adminVolunteerOverview && (
            <div>
              <FormControl className={classes.formControl}>
                <Select
                  native
                  className={classes.selection}
                  value={volunteerFilter}
                  onChange={e => setVolunteerFilter(e.target.value)}>
                  <option value={"filter"}>Filter</option>
                  <option value={"approved"}>Approved</option>
                  <option value={"unapproved"}>Unapproved</option>
                </Select>
              </FormControl>
            </div>
          )}
          {!props.isSearching && (
            <Fab
              data-tour={tour ? tour[0] : ""}
              size="small"
              aria-label="Add"
              className={classes.fab}
              onClick={e => toggleSearch(e)}>
              <i className="material-icons">search</i>
            </Fab>
          )}
          {/* Code below keeps modal button from showing up on volunteers */}
          {section !== "Volunteers" &&
            (user.role !== "volunteer" && (
              <AddModal2
                titleForModal={props.titleForModal}
                fields={props.fields}
                section={props.section}
              />
            ))}
        </div>
      </div>
      <div>
        {isSearching && (
          <TextField
            id="standard-search"
            type="search"
            value={search}
            className={classes.textField}
            onChange={e => setSearch(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <i className="material-icons">search</i>
                </InputAdornment>
              ),
            }}
          />
        )}
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.userProfile.user,
  };
};

export default connect(
  mapStateToProps,
  {},
)(withStyles(styles)(CardHeader));
