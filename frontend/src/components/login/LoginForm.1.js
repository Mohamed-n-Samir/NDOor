import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "./LoginInput";
import { useState } from "react";
import * as yup from "yup";

export function LoginForm() {
	const loginInfos = {
		email: "",
		password: "",
	};
	const [login, setLogin] = useState(loginInfos);
	const { email, password } = login;
	// console.log(login)
	const handleChange = (e) => {
		const { name, value } = e.target;
		setLogin({ ...login, [name]: value });
	};
	const loginValidation = yup.object({
		email: yup.string().required("Email address is required").email("Must be a valid Email"),
		password: yup.string().required("Password is required").min("5"),
	});
	return (
		<div className="login_wrap">
			<div className="login_1">
				<img src="../../icons/facebook.svg" alt="" />
				<span>Facebook helps you connect and share with the people in your life.</span>
			</div>
			<div className="login_2">
				<div className="login_2_wrap">
					<Formik
						enableReinitialize
						initialValues={{
							email,
							password,
						}}
						validationSchema={loginValidation}
					>
						{(formik) => (
							<Form>
								<LoginInput
									type="text"
									name="email"
									placeholder="Email address or phone number"
									onChange={handleChange}
								/>
								<LoginInput
									type="password"
									name="password"
									placeholder="password"
									onChange={handleChange}
									bottom
								/>
								<button type="submit" className="blue_btn">
									Log In
								</button>
							</Form>
						)}
					</Formik>
					<Link to="/forgot" className="forgot_password">
						Forgotten password?
					</Link>

					<div className="sign_splitter"></div>
					<button className="blue_btn open_signup">Create Account</button>
				</div>
				<Link to="/" className="sign_extra">
					<b>Create a Page</b> for a celebrity, brand or business.
				</Link>
			</div>
		</div>
	);
}
