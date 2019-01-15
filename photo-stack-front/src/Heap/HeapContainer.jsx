import React from 'react';
import PropTypes from 'prop-types';
import {Columns, Column} from 'bloomer';
import Heap from './Heap.jsx';

import plus from '../plus-solid.svg';

export default class HeapContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			heapSet: []
		};
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

	render() {
		const {heapSet} = this.state;
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
					<Heap thumbnail={plus} name="Create new..."/>
				</Column>
			</Columns>
		);
	}
}

HeapContainer.propTypes = {
	userId: PropTypes.string.isRequired
};
