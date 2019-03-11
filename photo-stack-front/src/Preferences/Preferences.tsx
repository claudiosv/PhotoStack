import React from 'react';
import {Modal, ModalBackground, ModalContent, ModalClose, Box, Columns, Column, Field, Label, Control, Help, Input, Button, Content} from 'bloomer';
import PropTypes from 'prop-types';
import {withFormik} from 'formik';
import * as Yup from 'yup';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

class Preferences extends React.PureComponent {
	render() {
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
						<Content>
							<Column isOffset={1} isSize={10}>
								<Field>
									<Label>First name</Label>
									<Control>
										<Input
											isUnselectable
											isSize="large"
											isColor={errors.firstName && touched.firstName ? 'danger' : ''}
											name="firstName"
											type="text"
											placeholder="Your first name..."
											value={values.firstName}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.firstName && touched.firstName ? (
											<Help isColor="danger">{errors.firstName}</Help>
										) : null}
									</Control>
								</Field>
								<Field>
									<Label>Last name</Label>
									<Control>
										<Input
											isSize="large"
											isColor={errors.lastName && touched.lastName ? 'danger' : ''}
											name="lastName"
											type="text"
											placeholder="Your last name..."
											value={values.lastName}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.lastName && touched.lastName ? (
											<Help isColor="danger">{errors.lastName}</Help>
										) : null}
									</Control>
								</Field>
								<Field>
									<Label>Email</Label>
									<Control>
										<Input
											isSize="large"
											isColor={errors.email && touched.email ? 'danger' : ''}
											name="email"
											type="email"
											placeholder="Your email..."
											value={values.email}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.email && touched.email ? (
											<Help isColor="danger">{errors.email}</Help>
										) : null}
									</Control>
								</Field>
								<Field>
									<Label>Password</Label>
									<Control>
										<Input
											isSize="large"
											isColor={errors.password && touched.password ? 'danger' : ''}
											name="password"
											type="password"
											placeholder="Type a new one to chenge it"
											value={values.password}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.password && touched.password ? (
											<Help isColor="danger">{errors.password}</Help>
										) : null}
									</Control>
								</Field>

								<Field>
									<Label>Password confirmation</Label>
									<Control>
										<Input
											isSize="large"
											isColor={errors.passwordConfirmation && touched.passwordConfirmation ? 'danger' : ''}
											name="passwordConfirmation"
											type="password"
											placeholder="Please confirm..."
											value={values.passwordConfirmation}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										{errors.passwordConfirmation && touched.passwordConfirmation ? (
											<Help isColor="danger">{errors.passwordConfirmation}</Help>
										) : null}
									</Control>
								</Field>
								<Field>
									<Button isFullWidth isSize="large" isColor="info" onClick={handleSubmit}>Save</Button>
								</Field>
							</Column>
						</Content>
					</Box>
		);
	}
}

const PreferencesSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, 'How could it be so short ;)')
		.max(50, 'Too long man!')
		.required('Mmmm... seems we\'ve got an empty field'),
	lastName: Yup.string()
		.min(2, 'How could it be so short ;)')
		.max(50, 'Too long man!')
		.required('Mmmm... seems we\'ve got an empty field'),
	email: Yup.string()
		.email('Please type in a valid email')
		.required('Mmmm... seems we\'ve got an empty field'),
	password: Yup.string()
		.min(8, 'How could it be so short ;)')
		.max(20, 'Too long man!')
		.required('In order to save changes you have to insert the psw'),
	passwordConfirmation: Yup.string()
		.oneOf([Yup.ref('password'), null], 'It does not match your password')
		.required('Mmmm... seems we\'ve got an empty field')
});

const FormikAdapter = withFormik({
	mapPropsToValues: (props) => ({
		firstName: props.initialData.firstName,
		lastName: props.initialData.lastName,
		email: props.initialData.email,
		password: '',
		passwordConfirmation: ''
	}),

	validationSchema: PreferencesSchema,

	handleSubmit: (values, {props}) => {
		props.onSave({variables: values});
	},

	displayName: 'Preferences'
})(Preferences);

export default FormikAdapter;

Preferences.propTypes = {
	values: PropTypes.object.isRequired,
	touched: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleBlur: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
};
