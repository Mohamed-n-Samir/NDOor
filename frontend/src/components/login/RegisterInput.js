import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";

const RegisterInput = ({ ...props }) => {
	const [field, meta] = useField(props);
	// const view1 = useMediaQuery({
	// 	query: "(min-width: 539px)",
	// });
	// const view2 = useMediaQuery({
	// 	query: "(min-width: 850px)",
	// });
	const view3 = useMediaQuery({
		query: "(min-width: 1170px)",
	});
	// console.log(desktopView)
	return (
		<div className="input_wrap">
			<input
				className={meta.touched && meta.error ? "input_error_border" : ""}
				{...field}
				{...props}

			/>
			{meta.touched && meta.error && (
				<div
					className={view3 ? "input_error input_error_desktop" : "input_error"}
					style={{ left: view3 && field.name === "last_name" && "12rem" }}
				>
					{meta.touched && meta.error && <ErrorMessage name={field.name} />}
					{meta.touched && meta.error && (
						<div
							className={
								view3 && field.name !== "last_name"
									? "error_arrow_desktop"
									: view3 && field.name === "last_name"
									? "error_arrow_right"
									: "error_arrow_bottom"
							}
						></div>
					)}
				</div>
			)}
			{meta.touched && meta.error && (
				<i
					className="error_icon"
					// style={{ top: `${!bottom && !desktopView ? "62%" : "15px"}` }}
				></i>
			)}
		</div>
	);
};

export default RegisterInput;
