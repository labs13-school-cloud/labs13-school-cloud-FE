// main page for displaying list of all training series
import React from 'react';
import axios from 'axios';

//Styling
import styled from 'styled-components';

//Components
import TrainingSeries from './TrainingSeries';

const TrainingSeriesList = props => {
	let arr = [];
	let offset = props.offset;
	let x = offset;
	let y = offset + 10;
	console.log('Offset Spacing', x, y);
	arr = props.trainingSeries.slice(x, y);

	return (
		<>
			<ListStyles>
				{arr.map(series => {
					// Get training series posts count
					// const postCount = await axios.get(
					//   `${process.env.REACT_APP_API}/api/training-series/${
					//     series.trainingSeriesID
					//   }/posts`
					// );

					return (
						<TrainingSeries
							key={series.trainingSeriesID}
							deleteTrainingSeries={props.deleteTrainingSeries}
							data={series}
							match={props.match}
							userID={props.userID}
							// postCount={postCount}
						/>
					);
				})}
			</ListStyles>
		</>
	);
};

export default TrainingSeriesList;
//Styled Components
const ListStyles = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
