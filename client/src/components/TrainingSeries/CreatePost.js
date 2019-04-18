import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import styled from "styled-components";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
    width: "89%",
    backgroundColor: theme.palette.background.paper,
    boxSizing: "border-box",
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    margin: "5px auto",

    "@media (max-width: 768px)": {
      textAlign: "center",
      padding: "30px"
    }
  },
  form: {
    width: "100%",
    margin: "0 auto"
  },
  info: {
    "margin-right": "50px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
    margin: "15px auto"
  },
  fab: {
    margin: theme.spacing.unit
  },
  button: {
    "margin-left": theme.spacing.unit
  },
  createButton: {
    "margin-left": theme.spacing.unit,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    }
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
    this.props.createAPost(this.state.post, this.state.post.trainingSeriesID);
  };

  render() {
    const { classes } = this.props;
    const sendDay = moment().add(3, "days").format("MMM Do");
    return (
      <form
        className={classes.form}
        id="form1"
        onSubmit={e => this.handlePostSubmit(e)}
      >
        {/* <DeleteModal deleteType='inTeamMemberPage' id={this.props.urlId} /> */}
        <MainContainer>
          <Paper className={classes.root}>
            <Typography variant="title" gutterBottom>
              Create A New Message
            </Typography>
            <Divider />
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
                label="Optional Link"
                className={classes.textField}
                value={this.state.post.link}
                onChange={this.handleChange("link")}
                margin="normal"
              />
              <TextField
                id="outlined-number"
                label="Days From Start"
                margin="normal"
                className={classes.textField}
                onChange={this.handleChange("daysFromStart")}
                type="number"
                value={this.state.post.daysFromStart}
                step="1"
                inputProps={{ min: 1 }}
                required
              />
              <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>What is "Days From Start"?</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            This is the number of days after a training series starts that a message will be sent. For example, if you assign a team member to this training series with a start date of today, and you set this message's "days from start" number to 3, it will send out on {sendDay}.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
            </PostContainer>
            <ButtonContainer>
              <Button
                variant="outlined"
                className={classes.createButton}
                type="submit"
                form="form1"
              >
                Create
              </Button>
              <Button
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
          </Paper>
        </MainContainer>
      </form>

    );
  }
}

const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 768px;
  @media (max-width: 768px) {
    width: 95%;
  }
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
