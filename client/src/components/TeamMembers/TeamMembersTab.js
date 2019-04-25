import React from 'react'
import { connect } from 'react-redux';

import Pagination from 'material-ui-flat-pagination';

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
                    style={{margin: "0 10px"}}
                >
                    <i className="material-icons">search</i>
                </Fab>
                <Fab
                    size="small"
                    aria-label="Add"
                    style={{margin: "0 10px"}}
                >
                    <i className="material-icons">add</i>
                </Fab>
            </div>
        </TeamsTabHeader>

        <hr/>

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
const TeamsTabHeader = styled.div`
    display: flex;
    justify-content: space-between;
`