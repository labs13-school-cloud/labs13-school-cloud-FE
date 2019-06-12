import React, { useState } from "react";

import {
  Typography,
  Fab,
  TextField,
  InputAdornment,
  Select,
  FormControl
} from "@material-ui/core/";

import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles.js";

function CardHeader(props) {
  const { title, tour, classes, add, searchHook } = props;
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
          {!props.isSearching && (
            <Fab
              data-tour={tour ? tour[0] : ""}
              size="small"
              aria-label="Add"
              className={classes.fab}
              onClick={e => toggleSearch(e)}
            >
              <i className="material-icons">search</i>
            </Fab>
          )}

          {/* <Fab
            data-tour={tour ? tour[1] : ""}
            size="small"
            aria-label="Add"
            className={classes.fab}
            onClick={() => add()}
          >
            <i className="material-icons">add</i>
          </Fab> */}
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
                  <FormControl className={classes.formControl}>
                    <Select
                      native
                      className={classes.selection}
                      inputProps={{
                        id: "status-selector",
                        label: "Filter Selector"
                      }}
                    >
                      <option value={"active"}>Active</option>
                      <option value={"available"}>Available</option>
                      <option value={"Completed"}>Completed</option>
                    </Select>
                  </FormControl>
                </InputAdornment>
              )
            }}
          />
        )}
      </div>
    </>
  );
}
export default withStyles(styles)(CardHeader);
