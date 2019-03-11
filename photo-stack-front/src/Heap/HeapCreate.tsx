import React from 'react';
import {Modal, ModalBackground, ModalContent, ModalClose, Box, Columns, Column, Field, Label, Control, Help, Input, Button} from 'bloomer';
import PropTypes from 'prop-types';
import {withFormik} from 'formik';
import * as Yup from 'yup';
import HeaderSearch from '../Header/HeaderSearch.jsx';

class HeapCreate extends React.PureComponent {
	constructor(props) {
		super(props);

		this.onTagInsert = this.onTagInsert.bind(this);
	}

	onTagInsert(values) {
		//Needed to adapt the custom selector
		this.props.handleChange({
			target: {
				name: 'tags',
				value: values
			}
		});
	}

	render() {
		const {isOpen, onClose} = this.props;
		const {
			values,
			touched,
			errors,
			handleChange,
			handleBlur,
			handleSubmit
		} = this.props;
		return (
			<Box hasTextAlign="centered">
				<Columns>
					<Column>
						<Field>
							<Label>Heap name</Label>
							<Control>
								<Input
									isSize="medium"
									isColor={errors.name && touched.name ? 'danger' : ''}
									name="name"
									type="text"
									placeholder="The heap name..."
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{errors.name && touched.name ? (
									<Help isColor="danger">{errors.name}</Help>
								) : null}
							</Control>
						</Field>
						<Field>
							<Label>Heap tags</Label>
							<Control>
								<HeaderSearch name="tags" onEnter={this.onTagInsert} onEmpty={() => {}}/>
								{errors.tags && touched.tags ? (
									<Help isColor="danger">{errors.tags}</Help>
								) : null}
							</Control>
						</Field>
						<Field>
							<Button isFullWidth isSize="large" isColor="info" onClick={handleSubmit}>Create</Button>
						</Field>
					</Column>
				</Columns>
			</Box>
		);
	}
}

const HeapSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, 'How could it be so short ;)')
		.max(50, 'Too long man!')
		.required('Mmmm... seems we\'ve got an empty field'),
	tags: Yup.array()
		.min(1, 'There must be at least one tag!')
});

const FormikAdapter = withFormik({
	mapPropsToValues: () => ({
		name: '',
		tags: []
	}),

	validationSchema: HeapSchema,

	handleSubmit: ({name, tags}, {props}) => {
		console.log({name, tags: tags.map(({value}) => value)});
		props.onHeapCreate({variables: {name, tags: tags.map(({value}) => value)}});
	},

	displayName: 'HeapCreate'
})(HeapCreate);

export default FormikAdapter;

HeapCreate.propTypes = {
	values: PropTypes.object.isRequired,
	touched: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleBlur: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};
