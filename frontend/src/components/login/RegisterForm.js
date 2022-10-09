import { Formik, Form } from "formik";
import RegisterInput from "./RegisterInput";
import { useState } from "react";
import * as Yup from "yup";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";

const RegisterForm = () => {
	const userInfo = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		bYear: new Date().getFullYear(),
		bMonth: new Date().getMonth(),
		bDay: new Date().getDate(),
		gender: "",
	};

	const [user, setUser] = useState(userInfo);
	const { firstName, lastName, email, password, bYear, bMonth, bDay, gender } = user;
	const registerValidation = Yup.object({
		firstName: Yup.string()
			.required("What's your First name ?")
			.min(2, "Fisrt name must be between 2 and 16 characters.")
			.max(16, "Fisrt name must be between 2 and 16 characters.")
			.matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
		lastName: Yup.string()
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
	const [dateError, setDateError] = useState("");
	const [genderError, setGenderError] = useState("");

	const [error, setError] = useState("");
	const [success, setsuccess] = useState("");
	const [loading, setloading] = useState(false);
	const registerSubmit = async () => {
		try {
			setloading(true);
			const { data } = await axios.post(`http://localhost:8000/register`, {
				firstName,
				lastName,
				email,
				password,
				bYear,
				bMonth,
				bDay,
				gender,
			});
			console.log(data)
			setError("");
			setsuccess(data.message);
			setloading(false);
		} catch (error) {
			setloading(false);
			setsuccess("");
			setError(error.response.data.message);
		}
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
					initialValues={{ firstName, lastName, email, password, bYear, bMonth, bDay, gender,username:"" }}
					validationSchema={registerValidation}
					onSubmit={() => {
						let currentDate = new Date();
						let pickedDate = new Date(bYear, bMonth - 1, bDay);
						let checkAge = (currentDate - pickedDate) / 1000 / 60 / 60 / 24 / 365;
						console.log(checkAge);
						if (!(checkAge >= 14 && checkAge <= 70)) {
							setDateError(
								"it looks like you've entered wrong info. Please make sure that you use your real date of birth."
							);
							if (gender === "") {
								setGenderError("Please choose a gender. you can change who can see this later.");
							}
						} else {
							setDateError("");
							setGenderError("");
							registerSubmit();
						}
					}}
				>
					{(formik) => (
						<Form className="register_form">
							<div className="reg_line">
								<RegisterInput
									type="text"
									placeholder="First name"
									name="firstName"
									onChange={handleRegisterChange}
								/>
								<RegisterInput
									type="text"
									placeholder="Surname"
									name="lastName"
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
							<DateOfBirthSelect
								bDay={bDay}
								bMonth={bMonth}
								bYear={bYear}
								months={months}
								days={days}
								years={years}
								handleRegisterChange={handleRegisterChange}
								dateError={dateError}
							/>
							<GenderSelect genderError={genderError} handleRegisterChange={handleRegisterChange} />
							<div className="reg_infos">
								By clicking Sign Up, you agree to Our("")
								<span>Terms, Data Policy &nbsp;</span>
								and <span>Cookie Policy.</span> You may receive SMS notifications from us and can
								opt ut at any time.
							</div>
							<div className="reg_btn_wrapper">
								<button type="submit" className="blue_btn open_signup">
									Sign Up
								</button>
							</div>
							<DotLoader
								color="#1875f2"
								loading={loading}
								cssOverride=""
								size={60}
								aria-label="Loading Spinner"
							/>
							{error && <div className="error_text">{error}</div>}
							{success && <div style={{color: "green"}}>{success}</div>}
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default RegisterForm;
