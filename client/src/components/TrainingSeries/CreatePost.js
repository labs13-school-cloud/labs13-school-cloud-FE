import React from "react";
import { connect } from "react-redux";

import styled from "styled-components";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Redux
import {
  getTrainingSeriesPosts,
  createAPost,
  editPost,
  deletePost,
  getPostById
} from "../../store/actions";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "100%",
    margin: "20px auto"
  },
  form: {
    // width: "100%",
    margin: "0 auto"
  },
  info: {
    "margin-right": "50px"
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    width: "80%",
    margin: "15px auto"
  },
  fab: {
    margin: theme.spacing.unit
  },
  button: {
    "margin-left": theme.spacing.unit
  }
});

class CreatePost extends React.Component {
  state = {
    open: false,
    isUpdating: false,
    post: {
      postName: "",
      postDetails: "",
      link: "",
      daysFromStart: 1,
      trainingSeriesID: ""
    }
  };

  componentDidMount() {
    if (this.props.location.state.trainingSeriesId) {
      this.setState({
        ...this.state,
        post: {
          ...this.state.post,
          trainingSeriesID: this.props.location.state.trainingSeriesId
        }
      });
    }
  }

  //   componentDidUpdate(prevProps) {
  //     if (prevProps.addSuccess !== this.props.addSuccess) {
  //       setTimeout(() => {
  //         const { teamMemberID } = this.props.teamMember && this.props.teamMember;
  //         this.props.history.push(`/home/team-member/${teamMemberID}`);
  //       }, 400);
  //     }
  //   }

  handleChange = name => e => {
    this.setState({
      ...this.state,
      post: {
        ...this.state.post,
        [name]: e.target.value
      }
    });
  };

  handlePostSubmit = e => {
    e.preventDefault();

    this.props.createAPost(this.state.post);
    this.props.history.push(
      `/home/training-series/${this.props.location.state.trainingSeriesId}`
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <MainContainer>
        <Typography variant="display1" align="center" gutterBottom>
          Create A New Message
        </Typography>
        <form
          className={classes.form}
          id="form1"
          onSubmit={e => this.handlePostSubmit(e)}
        >
          {/* <DeleteModal deleteType='inTeamMemberPage' id={this.props.urlId} /> */}

          <Paper className={classes.root}>
            <PostContainer>
              <TextField
                id="standard-name"
                label="Message Title"
                className={classes.textField}
                value={this.state.post.postName}
                onChange={this.handleChange("postName")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Message Content"
                className={classes.textField}
                value={this.state.post.postDetails}
                onChange={this.handleChange("postDetails")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Link"
                className={classes.textField}
                value={this.state.post.link}
                onChange={this.handleChange("link")}
                margin="normal"
                required
              />
              <TextField
                id="outlined-number"
                label="Days from Start"
                margin="normal"
                className={classes.textField}
                onChange={this.handleChange("daysFromStart")}
                type="number"
                value={this.state.post.daysFromStart}
                step="1"
                inputProps={{ min: 1 }}
                required
              />
            </PostContainer>
          </Paper>
          <ButtonContainer>
            {/* <NotificationWidget
              teamMember={this.state.teamMember}
              editTeamMember={this.props.editTeamMember}
              addTeamMember={this.addNewTeamMember}
              type="success"
              submitType="add"
            /> */}
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              form="form1"
            >
              Save
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              onClick={e =>
                this.props.history.push(
                  `/home/training-series/${
                    this.props.location.state.trainingSeriesId
                  }`
                )
              }
            >
              Cancel
            </Button>
          </ButtonContainer>
        </form>
      </MainContainer>
    );
  }
}

const MainContainer = styled.div`
  margin: 0 auto;
  width: 80%;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;

const mapStateToProps = state => {
  return {
    addSuccess: state.teamMembersReducer.status.addSuccess,
    teamMember: state.teamMembersReducer.teamMember
  };
};

export default connect(
  mapStateToProps,
  {
    getTrainingSeriesPosts,
    createAPost,
    editPost,
    deletePost,
    getPostById
  }
)(withStyles(styles)(CreatePost));
