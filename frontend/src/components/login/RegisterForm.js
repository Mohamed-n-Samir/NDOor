import { Formik, Form } from "formik";
import RegisterInput from "./RegisterInput";
import { useState } from "react";
import * as Yup from "yup";


const RegisterForm = () => {
	const userInfo = {
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		bYear: new Date().getFullYear(),
		bMonth: new Date().getMonth(),
		bDay: new Date().getDate(),
		gender: "",
	};

	const [user, setUser] = useState(userInfo);
	const { first_name, last_name, email, password, bYear, bMonth, bDay, gender } = user;
const registerValidation = Yup.object({
	first_name: Yup.string()
		.required("What's your First name ?")
		.min(2, "Fisrt name must be between 2 and 16 characters.")
		.max(16, "Fisrt name must be between 2 and 16 characters.")
		.matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
	last_name: Yup.string()
		.required("What's your Last name ?")
		.min(2, "Last name must be between 2 and 16 characters.")
		.max(16, "Last name must be between 2 and 16 characters.")
		.matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
	email: Yup.string()
		.required("You'll need this when you log in and if you ever need to reset your password.")
		.email("Enter a valid email address."),
	password: Yup.string()
		.required(
			"Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
		)
		.min(6, "Password must be atleast 6 characters.")
		.max(36, "Password can't be more than 36 characters"),
});

	// console.log(user);
	const tempYear = new Date().getFullYear();
	const years = Array.from(new Array(108), (val, index) => tempYear - index);
	const months = Array.from(new Array(12), (month, index) => 1 + index);
	const getDays = () => {
		return new Date(bYear, bMonth, 0).getDate();
	};
	// console.log(getDays());
	const days = Array.from(new Array(getDays()), (day, index) => index + 1);

	// console.log(days);
	// const handleChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setUser({ ...user, [name]: value });
	// };

	const handleRegisterChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	return (
		<div className="blur">
			<div className="register">
				<div className="register_header">
					<i className="exit_icon"></i>
					<span>Sign Up</span>
					<span>It's quick and easy</span>
				</div>
				<Formik
					enableReinitialize
					initialValues={{first_name, last_name, email, password, bYear, bMonth, bDay, gender}}
					
					validationSchema={registerValidation}

					onSubmit={() => {
						let currentDate = new Date();
						let pickedDate = new Date(bYear,bMonth - 1,bDay);
						let checkAge = (currentDate - pickedDate)/1000/60/60/24/365
						console.log(checkAge)
						if(!(checkAge >= 14 && checkAge <= 70)) {
							console.log("you'r out of age range [14,70]")
						}


					}}
				>
					{(formik) => (
						<Form className="register_form">
							<div className="reg_line">
								<RegisterInput
									type="text"
									placeholder="First name"
									name="first_name"
									onChange={handleRegisterChange}
								/>
								<RegisterInput
									type="text"
									placeholder="Surname"
									name="last_name"
									onChange={handleRegisterChange}
								/>
							</div>
							<div className="reg_line">
								<RegisterInput
									type="text"
									placeholder="Mobile number or email address"
									name="email"
									onChange={handleRegisterChange}
								/>
							</div>
							<div className="reg_line">
								<RegisterInput
									type="password"
									placeholder="New password"
									name="password"
									onChange={handleRegisterChange}
								/>
							</div>
							<div className="reg_col">
								<div className="reg_line_header">
									Date of birth <i className="info_icon"></i>
								</div>
								<div className="reg_grid">
									<select name="bDay" value={bDay} onChange={handleRegisterChange}>
										{days.map((day, index) => {
											return (
												<option value={day} key={index}>
													{day}
												</option>
											);
										})}
									</select>
									<select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
										{months.map((month, index) => {
											return (
												<option value={month} key={index}>
													{month}
												</option>
											);
										})}
									</select>
									<select name="bYear" value={bYear} onChange={handleRegisterChange}>
										{years.map((year, index) => {
											return (
												<option value={year} key={index}>
													{year}
												</option>
											);
										})}
									</select>
								</div>
							</div>
							<div className="reg_col">
								<div className="reg_line_header">
									Gender <i className="info_icon"></i>
								</div>
								<div className="reg_grid">
									<label htmlFor="male">
										Male
										<input
											type="radio"
											name="gender"
											id="male"
											value="male"
											onChange={handleRegisterChange}
										/>
									</label>
									<label htmlFor="female">
										Female
										<input
											type="radio"
											name="gender"
											id="female"
											value="female"
											onChange={handleRegisterChange}
										/>
									</label>
									<label htmlFor="custom">
										custom
										<input
											type="radio"
											name="gender"
											id="custom"
											value="custom"
											onChange={handleRegisterChange}
										/>
									</label>
								</div>
							</div>
							<div className="reg_infos">
								By clicking Sign Up, you agree to Our("")
								<span>Terms, Data Policy &nbsp;</span>
								and <span>Cookie Policy.</span> You may receive SMS notifications from us and can
								opt ut at any time.
							</div>
							<div className="reg_btn_wrapper">
								<button type="submit" className="blue_btn open_signup">Sign Up</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default RegisterForm;
