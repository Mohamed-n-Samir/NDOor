import { ErrorMessage, useField } from "formik";
import { useMediaQuery} from "react-responsive"



const LoginInput = ({ bottom, ...props }) => {
	const [field, meta] = useField(props);
	const desktopView = useMediaQuery({
		query: "(min-width: 850px)"
	})
	// console.log(desktopView)
	return (
		<div className="input_wrap">
			{meta.touched && meta.error && !bottom && (
				<div
					className={
						desktopView ? "input_error input_error_desktop" : "input_error"
					}
				>
					{meta.touched && meta.error && <ErrorMessage name={field.name} />}
					{meta.touched && meta.error && (
						<div
							className={
								desktopView ? "error_arrow_desktop" : "error_arrow_top"
							}
						></div>
					)}
				</div>
			)}
			<input
				className={meta.touched && meta.error ? "input_error_border" : ""}
				{...field}
				{...props}
			/>
			{meta.touched && meta.error && bottom && (
				<div
					className={
						desktopView ? "input_error input_error_desktop" : "input_error"
					}
				>
					{meta.touched && meta.error && <ErrorMessage name={field.name} />}
					{meta.touched && meta.error && (
						<div
							className={
								desktopView ? "error_arrow_desktop" : "error_arrow_bottom"
							}
						></div>
					)}
				</div>
			)}
			{meta.touched && meta.error && (
				<i
					className="error_icon"
					style={{ top: `${!bottom  && !desktopView ? "62%" : "15px"}` }}
				></i>
			)}
		</div>
	);
};

export default LoginInput;
