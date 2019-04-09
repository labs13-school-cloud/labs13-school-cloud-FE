import React from 'react';
import Styled from 'styled-components';

const Container = Styled.div`
    display:flex
    justify-content: space-between;
    width:100%;
`;
const Column = Styled.div`
    width:33%
    height:100%;
    /* padding:5px */
    border: 1px solid #451476;
`;
const Title = Styled.p`
font-size: 1.6rem;
    text-align:center;
    padding: 5px;
    margin:0;
    background-color:#451476;
    color:white;
    border: 1px solid white;
    position:relative;
    top:0;
`;

function Pricing() {
	return (
		<Container>
			<Column>
				<Title>Free</Title>
				<ul>
					<li>Item 1</li>
					<li>Item 2</li>
					<li>Item 3</li>
					<li>Item 4</li>
					<li>Item 5</li>
				</ul>
			</Column>
			<Column>
				<Title>Premier</Title>
				<ul>
					<li>Item 1</li>
					<li>Item 2</li>
					<li>Item 3</li>
					<li>Item 4</li>
					<li>Item 5</li>
				</ul>
			</Column>
			<Column>
				<Title>Pro</Title>
				<ul>
					<li>Item 1</li>
					<li>Item 2</li>
					<li>Item 3</li>
					<li>Item 4</li>
					<li>Item 5</li>
				</ul>
			</Column>
		</Container>
	);
}

export default Pricing;
