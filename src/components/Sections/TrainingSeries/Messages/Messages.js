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

  const { classes, List } = props;

  return (
    <>
      <HeaderContainer>
        <Typography variant="title">Messages</Typography>
        <div>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={e => props.history.push("/home/create-message")}
          >
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
                <i class="material-icons">search</i>
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
        />
      </ListStyles>
    </>
  );
}

export default withStyles(styles)(Messages);
