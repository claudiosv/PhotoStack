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
					thumbnail: 'https://images.unsplash.com/photo-1515688403147-44e0433f180f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400',
					id: 'Holidays'
				},
				{
					thumbnail: 'https://images.unsplash.com/photo-1523472721958-978152f4d69b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400',
					id: 'Colorful pictures'
				},
				{
					thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400',
					id: 'Cool cars'
				},
				{
					thumbnail: 'https://images.unsplash.com/photo-1513862448120-a41616062133?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400',
					id: 'Snowdays'
				},
				{
					thumbnail: 'https://images.unsplash.com/photo-1541701711-f5b5c81a6780?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400',
					id: 'Last night party'
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
