import React from 'react';
import {Field, Label, Control, Input, Checkbox, Button, Help} from 'bloomer';
import PropTypes from 'prop-types';
import {withFormik} from 'formik';
import * as Yup from 'yup';

class SignUpForm extends React.PureComponent {
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
			<>
				<Field>
					<Label>First name</Label>
					<Control>
						<Input
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
							placeholder="Don't tell anyone..."
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
					<Control>
						<Checkbox
							isUnselectable
							name="consent"
							checked={values.consent}
							onChange={handleChange}
							onBlur={handleBlur}
						>
							<span> I have read and I agree</span> with the privacy terms
						</Checkbox>
						{errors.consent && touched.consent ? (
							<Help isColor="danger">{errors.consent}</Help>
						) : null}
					</Control>
				</Field>
				<Field>
					<Button isFullWidth isSize="large" isColor="info" onClick={handleSubmit}>Sign up</Button>
				</Field>
			</>
		);
	}
}

const SignupSchema = Yup.object().shape({
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
		.required('Mmmm... seems we\'ve got an empty field'),
	passwordConfirmation: Yup.string()
		.oneOf([Yup.ref('password'), null], 'It does not match your password')
		.required('Mmmm... seems we\'ve got an empty field'),
	consent: Yup.bool()
		.test(
			'consent',
			'You must accept terms to sign up!',
			value => value === true
		)
		.required('You must accept terms to sign up!')
});

const FormikAdapter = withFormik({
	mapPropsToValues: () => ({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		passwordConfirmation: '',
		consent: false
	}),

	validationSchema: SignupSchema,

	handleSubmit: (values, {props}) => {
		props.onSignUp(values);
	},

	displayName: 'SignUpForm'
})(SignUpForm);

export default FormikAdapter;

SignUpForm.propTypes = {
	values: PropTypes.object.isRequired,
	touched: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleBlur: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};
