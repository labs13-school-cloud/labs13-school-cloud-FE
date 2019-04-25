import React from 'react'
import { connect } from 'react-redux';

import Pagination from 'material-ui-flat-pagination';
import Grid from '@material-ui/core/Grid';

import styled from 'styled-components';

import {
    Paper,
    Typography,
    Fab,
    TextField,
    InputAdornment
} from '@material-ui/core/';

const TeamMembersTab = () => {
  return (
    <div>
      <TeamsTabWrapper>
        <TeamsTabHeader>
            <TextField
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
                    style={{margin: "0 10px", background: "#451476", color: "white"}}
                >
                    <i className="material-icons">add</i>
                </Fab>
            </div>
        </TeamsTabHeader>

        <hr/>
        <Grid container justify="center">
            {fakeTeamMembers.map(teamMember => {
                return(
                    <Grid item >
                        <TeamsMember>
                            <Typography variant="subtitle1">
                                {teamMember.firstName} {teamMember.lastName}
                            </Typography>
                            <hr/>
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
                                    return <div>{series}</div>
                                })}
                            </ul>
                        </TeamsMember>
                    </Grid>
                );
            })}
        </Grid>

      </TeamsTabWrapper>
    </div>
  )
}

export default connect()(TeamMembersTab);


const TeamsTabWrapper = styled(Paper)`
    margin: 10px;
    padding: 10px;
    width: 70%;
`
const TeamsMember = styled(Paper)`
    margin: 10px;
    padding: 10px;
    width: 220px;
`
const TeamsTabHeader = styled.div`
    display: flex;
    justify-content: space-between;
`

const fakeTeamMembers = [//not sureh how these will be structured, so obviously just so we have some kind of data down...
    {
        firstName: "Tom",
        lastName: "Hessburg",
        email: "tom@email.com",
        jobDescription: "does nothing all day, essentially...",
        slackID: "asdfasdfasdfasdf",
        teamsID: "asdfadsfsadf",
        phoneNumber: "352-636-5809",
        trainingSeries: [
            "series1",
            "series2"
        ],
        manager: "Adam McKenney",
        mentor: "Nick Cannariato"
    },
    {
        firstName: "Tom",
        lastName: "Hessburg",
        email: "tom@email.com",
        jobDescription: "does nothing all day, essentially...",
        slackID: "asdfasdfasdfasdf",
        teamsID: "asdfadsfsadf",
        phoneNumber: "352-636-5809",
        trainingSeries: [
            "series1",
            "series2"
        ],
        manager: "Adam McKenney",
        mentor: "Nick Cannariato"
    },
    {
        firstName: "Tom",
        lastName: "Hessburg",
        email: "tom@email.com",
        jobDescription: "does nothing all day, essentially...",
        slackID: "asdfasdfasdfasdf",
        teamsID: "asdfadsfsadf",
        phoneNumber: "352-636-5809",
        trainingSeries: [
            "series1",
            "series2"
        ],
        manager: "Adam McKenney",
        mentor: "Nick Cannariato"
    },
    {
        firstName: "Tom",
        lastName: "Hessburg",
        email: "tom@email.com",
        jobDescription: "does nothing all day, essentially...",
        slackID: "asdfasdfasdfasdf",
        teamsID: "asdfadsfsadf",
        phoneNumber: "352-636-5809",
        trainingSeries: [
            "series1",
            "series2"
        ],
        manager: "Adam McKenney",
        mentor: "Nick Cannariato"
    }
]