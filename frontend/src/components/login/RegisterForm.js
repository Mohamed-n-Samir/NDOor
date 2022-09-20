import { Formik, Form } from "formik";
import RegisterInput from "./RegisterInput";

const RegisterForm = () => {
	return (
		<div className="blur">
			<div className="register">
				<div className="register_header">
					<i className="exit_icon"></i>
					<span>Sign Up</span>
					<span>It's quick and easy</span>
				</div>
				<Formik>
					{(formik) => (
						<Form className="register_form">
							<div className="regi_line">
							<RegisterInput type="text" placeholder="First name" name="first_name"  />
							</div>

						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default RegisterForm;
