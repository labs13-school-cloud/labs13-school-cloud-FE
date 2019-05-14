import React, { useState } from "react";

import filter from "./filter.js";

import { withStyles } from "@material-ui/core/styles";

import {
  TextField,
  Button,
  Typography,
  InputAdornment
} from "@material-ui/core/";

import { styles, HeaderContainer, HolderText, ListStyles } from "./styles.js";

function Messages(props) {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [count, setCount] = useState(0);

  const { classes, List, ts_id: training_series_id } = props;

  return (
    <>
      <HeaderContainer>
        <Typography variant="title">Messages</Typography>
        <div>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={e =>
              props.history.push({
                pathname: "/home/create-message",
                state: { training_series_id }
              })
            }
          >
            {/* ^^^^^^^Long term, the id should just be in the URL so it doesn't break on refresh */}
            New Message
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={() => setIsSearching(!isSearching)}
          >
            Search
          </Button>
        </div>
      </HeaderContainer>
      {/* Search Input */}
      {isSearching && (
        <TextField
          id="standard-search"
          type="search"
          className={classes.textField}
          onChange={e => setSearch(e.target.value)}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <i className="material-icons">search</i>
              </InputAdornment>
            )
          }}
        />
      )}
      {!count && (
        <HolderText>
          <p>You do not have any messages.</p>
        </HolderText>
      )}
      <ListStyles className={classes.listStyle}>
        <List
          filter={filter}
          search={search.toLowerCase()}
          history={props.history}
          setCount={setCount}
          ts_id={props.ts_id}
        />
      </ListStyles>
    </>
  );
}

export default withStyles(styles)(Messages);
