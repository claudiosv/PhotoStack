import React from 'react';
import PropTypes from 'prop-types';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const GET_AUTOCOMPLETE = gql`
query ($query: String!){
	getAutocomplete(query: $query)
}
`;

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql'
});

export default class HeaderSearch extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			value: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.getSuggestions = this.getSuggestions.bind(this);
	}

	handleChange(value) {
		this.setState({value});
		this.props.onSearch(value);
	}

	handleInputChange(inputValue) {
		this.setState({inputValue});
	}

	handleKeyDown(event) {
		const {inputValue, value} = this.state;
		if (!inputValue) {
			return;
		}
		if (event.key === 'Enter' || event.key === 'Tab') {
			this.setState({
				inputValue: '',
				value: [...value, {label: inputValue, value: inputValue}]
			});
		}
	}

	async getSuggestions(inputValue) {
		console.log(inputValue);
		const {data} = await client.query({
			query: GET_AUTOCOMPLETE,
			variables: {query: inputValue}
		});
		const suggestions = data.getAutocomplete.map(s => {
			return {value: s, label: s};
		});
		if (inputValue) {
			return suggestions.filter(i =>
				i.label.toLowerCase().includes(inputValue.toLowerCase())
			);
		}
		return suggestions;
	}

	render() {
		const {inputValue, value} = this.state;
		const components = {
			DropdownIndicator: null
		};
		const formatLabel = input => (
			<p>Look for &quot;{input}&quot;</p>
		);
		const promiseOptions = inputValue =>
			new Promise(resolve => {
				resolve(this.getSuggestions(inputValue));
			});

		return (
			<AsyncCreatableSelect
				isClearable
				isMulti
				cacheOptions
				defaultOptions
				createOptionPosition="first"
				placeholder="Search..."
				inputValue={inputValue}
				components={components}
				loadOptions={promiseOptions}
				value={value}
				formatCreateLabel={formatLabel}
				onChange={this.handleChange}
				onInputChange={this.handleInputChange}
				onKeyDown={this.handleKeyDown}
			/>
		);
	}
}

HeaderSearch.propTypes = {
	onSearch: PropTypes.func.isRequired
};
