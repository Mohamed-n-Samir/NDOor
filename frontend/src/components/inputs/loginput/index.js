import "./style.css";

const LoginInput = ({placeholder, type, name}) => {
	return (
		<div className="input_wrap">
			<input type={type} name={name} placeholder={placeholder} />
		</div>
	);
};

export default LoginInput;
