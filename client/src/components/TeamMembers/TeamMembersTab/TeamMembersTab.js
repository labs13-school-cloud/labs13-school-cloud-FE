import React from "react";
import { connect } from "react-redux";

import Pagination from "material-ui-flat-pagination";
import Grid from "@material-ui/core/Grid";

import styled from "styled-components";

import {
  Paper,
  Typography,
  Fab,
  TextField,
  InputAdornment
} from "@material-ui/core/";

//functional related imports

//fetches team members, likely dont need this here, likely wont need this here but may potentially
//adds team member, likely wont need this here but may potentially
//deleteTeamMembers team member by ID, propbably going to be the only actual functionallity displayed firectly on this page.
import {
  getTeamMembers,
  addTeamMember,
  deleteTeamMember
} from "../../store/actions/teamMembersActions.js";

const TeamMembersTab = props => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div>
      <TeamsTabWrapper>
        <TeamsTabHeader>
          <TextField
            value={searchValue}
            onChange={e => {
              setSearchValue(e.target.value);
            }}
            id="standard-search"
            type="search"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <i className="material-icons">search</i>
                </InputAdornment>
              )
            }}
          />
          <div>
            <Fab
              size="small"
              aria-label="Add"
              onClick={() => {
                props.history.push("/home/create-team-member/");
              }}
              style={{
                margin: "0 10px",
                background: "#451476",
                color: "white"
              }}
            >
              <i className="material-icons">add</i>
            </Fab>
          </div>
        </TeamsTabHeader>

        <hr />
        <Grid container justify="center">
          {fakeTeamMembers
            .filter(member =>
              `${member.firstName} ${member.lastName}`
                .toUpperCase()
                .includes(searchValue.toUpperCase())
            )
            .map(teamMember => {
              //will actually be mapping over props.teamMembers once were hooked up
              return (
                // aware this is throwing an err for not having a key, will use tem members ID's once thats accessible. for now nbd...
                <Grid
                  item
                  style={{ cursor: "pointer" }}
                  onClick={e => {
                    props.history.push(`/home/team-member/${teamMember.id}`);
                  }}
                >
                  <TeamsMember>
                    <Typography variant="subtitle1">
                      {teamMember.firstName} {teamMember.lastName}
                    </Typography>
                    <hr />
                    <Typography variant="subtitle2">
                      {teamMember.email}
                    </Typography>
                    <Typography variant="overline">
                      {teamMember.phoneNumber}
                    </Typography>
                    <Typography variant="overline">
                      mentor: {teamMember.mentor}
                    </Typography>
                    <Typography variant="overline">
                      manager: {teamMember.manager}
                    </Typography>
                    <ul>
                      {teamMember.trainingSeries.map(series => {
                        return <div>{series}</div>;
                      })}
                    </ul>
                  </TeamsMember>
                </Grid>
              );
            })}
        </Grid>
      </TeamsTabWrapper>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    teamMembers: state.teamMembers,
    teamMember: state.teamMember,
    status: state.status
  };
};

export default connect(
  mapStateToProps,
  { getTeamMembers, addTeamMember, deleteTeamMember }
)(TeamMembersTab);

const TeamsTabWrapper = styled(Paper)`
  margin: 10px auto;
  padding: 10px;
  width: 70%;
`;
const TeamsMember = styled(Paper)`
  margin: 10px;
  padding: 10px;
  width: 220px;
  &:hover {
    background: #f8f8f8;
  }
`;
const TeamsTabHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const fakeTeamMembers = [
  //not sureh how these will be structured, so obviously just so we have some kind of data down...
  {
    firstName: "Tom",
    lastName: "Hessburg",
    email: "tom@email.com",
    jobDescription: "does nothing all day, essentially...",
    slackID: "asdfasdfasdfasdf",
    teamsID: "asdfadsfsadf",
    phoneNumber: "352-636-5809",
    trainingSeries: ["series1", "series2"],
    manager: "Adam McKenney",
    mentor: "Nick Cannariato"
  },
  {
    firstName: "Bom",
    lastName: "Fessburg",
    email: "tom@email.com",
    jobDescription: "does nothing all day, essentially...",
    slackID: "asdfasdfasdfasdf",
    teamsID: "asdfadsfsadf",
    phoneNumber: "352-636-5809",
    trainingSeries: ["series1", "series2"],
    manager: "Adam McKenney",
    mentor: "Nick Cannariato"
  },
  {
    firstName: "Crom",
    lastName: "Shessburg",
    email: "tom@email.com",
    jobDescription: "does nothing all day, essentially...",
    slackID: "asdfasdfasdfasdf",
    teamsID: "asdfadsfsadf",
    phoneNumber: "352-636-5809",
    trainingSeries: ["series1", "series2"],
    manager: "Adam McKenney",
    mentor: "Nick Cannariato"
  },
  {
    firstName: "Lom",
    lastName: "Nessburg",
    email: "tom@email.com",
    jobDescription: "does nothing all day, essentially...",
    slackID: "asdfasdfasdfasdf",
    teamsID: "asdfadsfsadf",
    phoneNumber: "352-636-5809",
    trainingSeries: ["series1", "series2"],
    manager: "Adam McKenney",
    mentor: "Nick Cannariato"
  }
];
