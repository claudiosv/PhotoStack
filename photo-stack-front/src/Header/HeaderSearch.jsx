import React from 'react';
import PropTypes from 'prop-types';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import {ApolloConsumer} from 'react-apollo';
import gql from 'graphql-tag';
import {navigate} from '@reach/router';

const GET_AUTOCOMPLETE = gql`
query ($query: String!){
	getAutocomplete(query: $query)
}
`;

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
	}

	handleChange(value) {
		this.setState({value});
		if (value.length === 0) {
			navigate('/');
		}else {
			navigate('/search/'+ value.map(v => v.value).join('&'))
		}
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

	render() {
		const {inputValue, value} = this.state;
		const components = {
			DropdownIndicator: null
		};
		const formatLabel = input => (
			<p>Look for &quot;{input}&quot;</p>
		);
		

		return (
			<ApolloConsumer>
				{client => {
					const getSuggestions = async (inputValue) => {
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
					return (<AsyncCreatableSelect
						isClearable
						isMulti
						cacheOptions
						defaultOptions
						createOptionPosition="first"
						placeholder="Search..."
						inputValue={inputValue}
						components={components}
						loadOptions={getSuggestions}
						value={value}
						formatCreateLabel={formatLabel}
						onChange={this.handleChange}
						onInputChange={this.handleInputChange}
						onKeyDown={this.handleKeyDown}
					/>)
				}}
			</ApolloConsumer>
		);
	}
}

HeaderSearch.propTypes = {
	onSearch: PropTypes.func.isRequired
};
