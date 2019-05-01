import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';

        //style related imports
//simport Pagination from 'material-ui-flat-pagination';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import {
    Paper,
    Typography,
    Fab,
    TextField,
    InputAdornment
} from '@material-ui/core/';

        //functional related imports
import {
    getTrainingSeries,
    deleteTrainingSeries,
    getMembersAssigned
} from '../../store/actions';

const TrainingSeriesTab = props => {

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        console.log(props)
    },[])

  return (
    <Wrapper>
        <HeaderWrapper>
            <Typography
                variant="h6"
            >
                Training Series
            </Typography>
            <Fab
                size="small"
                onClick={e => {
                    props.history.push('/home/create-training-series');
                }}
                aria-label="Add"
                style={{margin: "0 10px", background: "#451476", color: "white"}}
            >
                <i className="material-icons">add</i>
            </Fab>
        </HeaderWrapper>
        
        <TextField
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            fullWidth
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
			{exampleTrainingSeries.map((series) => {
				return (
					<Series>
						<Grid container spacing={24}>
							<Grid item xs={12}>
								<Typography variant="h6">{series.title}</Typography>
								<hr />
							</Grid>
							<Grid item xs={6}>
								<Typography style={{ color: 'gray' }} variant="caption">
									{series.description}
								</Typography>
							</Grid>

							<Grid item xs={6} align="center">
								<Grid item>
									<Typography variant="overline">messages: {series.posts.length}</Typography>
								</Grid>
								<Grid item>
									<Typography variant="overline">assigned: {series.teamMembers.length}</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Series>
				);
			})}
			
		</Wrapper>
	);
};


const mapStateToProps = state => {
    return state.trainingSeriesReducer; //just going to leave this as is for now. can cherry pick what we need once im actually putting it together.
}
export default connect(mapStateToProps, { getTrainingSeries, deleteTrainingSeries, getMembersAssigned })(TrainingSeriesTab);

const Wrapper = styled(Paper)`
    width: 70%;
    padding: 10px;
    margin: 10px auto;
`;

const HeaderWrapper = styled.div`
	display: flex;
	align-items: center;
`;

const Series = styled(Paper)`
    width: 90%;
    margin: 10px auto;
    padding: 20px;
    cursor: pointer;
    &:hover{
        background: #F8F8F8;
    }
`;

export default connect()(TrainingSeriesTab);

//Just some bs info until we get everything hooked up...
const exampleTrainingSeries = [
	{
		title: 'example series 1',
		description: 'random description of the training series that explains in short what it is and such....',
		posts: [
			{
				postName: 'example post 1',
				postDetails: 'some random details about the post...',
				link: 'aasdf',
				daysFromStart: 1,
				postimage: null
			},
			{
				postName: 'example post 2',
				postDetails:
					'some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long...',
				link: 'aasdf',
				daysFromStart: 2,
				postimage: null
			},
			{
				postName: 'example post 3',
				postDetails: 'asdfsadf',
				link: 'aasdf',
				daysFromStart: 2,
				postimage: null
			}
		],
		teamMembers: [
			//could realistically grab them by
			//ID from state or whatever but just for save of seeing what it looks like...
			{
				firstName: 'Tom',
				lastName: 'Hessburg',
				email: 'tom@email.com',
				jobDescription: 'does nothing all day, essentially...',
				slackID: 'asdfasdfasdfasdf',
				teamsID: 'asdfadsfsadf',
				phoneNumber: '352-636-5809',
				trainingSeries: [ 'series1', 'series2' ],
				manager: 'Adam McKenney',
				mentor: 'Nick Cannariato'
			},
			{
				firstName: 'Tom',
				lastName: 'Hessburg',
				email: 'tom@email.com',
				jobDescription: 'does nothing all day, essentially...',
				slackID: 'asdfasdfasdfasdf',
				teamsID: 'asdfadsfsadf',
				phoneNumber: '352-636-5809',
				trainingSeries: [ 'series1', 'series2' ],
				manager: 'Adam McKenney',
				mentor: 'Nick Cannariato'
			}
		]
	},
	{
		title: 'example series 2',
		description: 'random description of the training series that explains in short what it is and such....',
		posts: [
			{
				postName: 'example post 1',
				postDetails: 'some random details about the post...',
				link: 'aasdf',
				daysFromStart: 1,
				postimage: null
			},
			{
				postName: 'example post 2',
				postDetails:
					'some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long...',
				link: 'aasdf',
				daysFromStart: 2,
				postimage: null
			},
			{
				postName: 'example post 3',
				postDetails: 'asdfsadf',
				link: 'aasdf',
				daysFromStart: 2,
				postimage: null
			}
		],
		teamMembers: [
			//could realistically grab them by
			//ID from state or whatever but just for save of seeing what it looks like...
			{
				firstName: 'Tom',
				lastName: 'Hessburg',
				email: 'tom@email.com',
				jobDescription: 'does nothing all day, essentially...',
				slackID: 'asdfasdfasdfasdf',
				teamsID: 'asdfadsfsadf',
				phoneNumber: '352-636-5809',
				trainingSeries: [ 'series1', 'series2' ],
				manager: 'Adam McKenney',
				mentor: 'Nick Cannariato'
			},
			{
				firstName: 'Tom',
				lastName: 'Hessburg',
				email: 'tom@email.com',
				jobDescription: 'does nothing all day, essentially...',
				slackID: 'asdfasdfasdfasdf',
				teamsID: 'asdfadsfsadf',
				phoneNumber: '352-636-5809',
				trainingSeries: [ 'series1', 'series2' ],
				manager: 'Adam McKenney',
				mentor: 'Nick Cannariato'
			}
		]
	},
	{
		title: 'example series 3',
		description: 'random description of the training series that explains in short what it is and such....',
		posts: [
			{
				postName: 'example post 1',
				postDetails: 'some random details about the post...',
				link: 'aasdf',
				daysFromStart: 1,
				postimage: null
			},
			{
				postName: 'example post 2',
				postDetails:
					'some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long some random details about the post thats super long...',
				link: 'aasdf',
				daysFromStart: 2,
				postimage: null
			},
			{
				postName: 'example post 3',
				postDetails: 'asdfsadf',
				link: 'aasdf',
				daysFromStart: 2,
				postimage: null
			}
		],
		teamMembers: [
			//could realistically grab them by
			//ID from state or whatever but just for save of seeing what it looks like...
			{
				firstName: 'Tom',
				lastName: 'Hessburg',
				email: 'tom@email.com',
				jobDescription: 'does nothing all day, essentially...',
				slackID: 'asdfasdfasdfasdf',
				teamsID: 'asdfadsfsadf',
				phoneNumber: '352-636-5809',
				trainingSeries: [ 'series1', 'series2' ],
				manager: 'Adam McKenney',
				mentor: 'Nick Cannariato'
			},
			{
				firstName: 'Tom',
				lastName: 'Hessburg',
				email: 'tom@email.com',
				jobDescription: 'does nothing all day, essentially...',
				slackID: 'asdfasdfasdfasdf',
				teamsID: 'asdfadsfsadf',
				phoneNumber: '352-636-5809',
				trainingSeries: [ 'series1', 'series2' ],
				manager: 'Adam McKenney',
				mentor: 'Nick Cannariato'
			}
		]
	}
];
