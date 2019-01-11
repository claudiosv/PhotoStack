import React from 'react';
import PropTypes from 'prop-types';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';

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

	getSuggestions(inputValue) {
		// Get from server suggestions
		const suggestions = [
			{value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true},
			{value: 'blue', label: 'Blue', color: '#0052CC', disabled: true},
			{value: 'purple', label: 'Purple', color: '#5243AA'},
			{value: 'red', label: 'Red', color: '#FF5630', isFixed: true},
			{value: 'orange', label: 'Orange', color: '#FF8B00'},
			{value: 'yellow', label: 'Yellow', color: '#FFC400'},
			{value: 'green', label: 'Green', color: '#36B37E'},
			{value: 'forest', label: 'Forest', color: '#00875A'},
			{value: 'slate', label: 'Slate', color: '#253858'},
			{value: 'silver', label: 'Silver', color: '#666666'}
		];
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
