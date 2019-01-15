import React from 'react';
import PropTypes from 'prop-types';
import {Columns, Column} from 'bloomer';
import plus from '../plus-solid.png';
import Heap from './Heap.jsx';
import {Redirect} from 'react-router-dom';

export default class HeapContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			heapSet: [],
			createOpen: false
		};
		this.toggleCreate = this.toggleCreate.bind(this);
	}

	componentDidMount() {
		// Load heap groups
		this.setState(
			{heapSet: [
				{
					thumbnail: 'https://via.placeholder.com/128x128',
					id: '1'
				},
				{
					thumbnail: 'https://via.placeholder.com/128x128',
					id: '2'
				},
				{
					thumbnail: 'https://via.placeholder.com/128x128',
					id: '3'
				},
				{
					thumbnail: 'https://via.placeholder.com/128x128',
					id: '4'
				},
				{
					thumbnail: 'https://via.placeholder.com/128x128',
					id: '5'
				}
			]}
		);
	}

	toggleCreate() {
		this.setState(
			{
				createOpen: true
			}
		);
	}

	render() {
		const {heapSet, createOpen} = this.state;
		return (
			<Columns isMultiline isGrid>
				{
					heapSet.map(heap => {
						return (
							<Column key={heap.id} isSize="1/4">
								<Heap thumbnail={heap.thumbnail} name={heap.id}/>
							</Column>
						);
					})
				}
				<Column isSize="1/4">
					<div onClick={this.toggleCreate}>
						<Heap thumbnail={plus} name="Create new..."/>
					</div>
				</Column>
				{createOpen ? <Redirect to="/create"/> : null}
			</Columns>
		);
	}
}

HeapContainer.propTypes = {
	userId: PropTypes.string.isRequired
};
