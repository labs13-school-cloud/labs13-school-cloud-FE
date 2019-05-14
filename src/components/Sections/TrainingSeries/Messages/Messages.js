import React, { useState } from "react";
import { connect } from "react-redux";

import DeleteModal from "components/UI/Modals/deleteModal";

import { createAMessage, editMessage, getAllMessages } from "store/actions";

import { withStyles } from "@material-ui/core/styles";

import {
  Paper,
  TextField,
  Button,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  InputAdornment,
  Divider
} from "@material-ui/core/";

import {
  styles,
  HeaderContainer,
  HolderText,
  ListItemContainer,
  ListStyles,
  ListButtonContainer
} from "./styles.js";

function Messages(props) {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState("false");
  let messages;
  //console.log(this.props); // checks if the search field is active and there are results from the fuse search
  if (isSearching && this.searchedMessages(this.props.messages).length > 0) {
    messages = this.searchedMessages(this.props.messages);
  } else {
    messages = this.props.messages;
  }
  /* sort messages by days from start */
  const sortedMessages = messages.sort((a, b) =>
    a.days_from_start > b.days_from_start
      ? 1
      : b.days_from_start > a.days_from_start
      ? -1
      : 0
  );

  const routeToeditMessagePage = (e, message) => {
    e.preventDefault();
    this.props.history.push({
      pathname: `/home/message/${message.id}`,
      state: {
        message
      }
    });
  };
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
      {this.state.searchOpen && (
        <TextField
          id="standard-search"
          type="search"
          className={classes.textField}
          onChange={e => this.setState({ searchInput: e.target.value })}
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
      {this.props.messages.length === 0 ? (
        <HolderText>
          <p>You do not have any messages.</p>
        </HolderText>
      ) : (
        <ListStyles className={classes.listStyle}>
          {sortedMessages.map(message => (
            <ListItemContainer key={message.id}>
              <ListItem key={message.id} className={classes.listItem}>
                <ListItemText
                  primary={message.subject}
                  secondary={message.body}
                  className={classes.listItemText}
                  onClick={e => this.routeToeditMessagePage(e, message)}
                />
                <ListItemSecondaryAction className={classes.secondaryAction}>
                  <div>
                    <p>{message.days_from_start} days</p>
                  </div>
                  <ListButtonContainer>
                    <i
                      className={`material-icons ${classes.icons}`}
                      onClick={e => this.routeToEditMessagePage(e, message)}
                    >
                      edit
                    </i>
                    <DeleteModal
                      className={`material-icons ${classes.icons}`}
                      deleteType="message"
                      id={message.id}
                    />
                  </ListButtonContainer>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </ListItemContainer>
          ))}
        </ListStyles>
      )}
    </>
  );
}

export default connect(
  null,
  { createAMessage, editMessage, getAllMessages }
)(withStyles(styles)(Messages));
