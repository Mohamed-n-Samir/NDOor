import { useMediaQuery } from "react-responsive";

const DateOfBirthSelect = (
{	bDay,
	bMonth,
	days,
	handleRegisterChange,
	months,
	bYear,
	years,
	dateError,}
) => {
	// const view1 = useMediaQuery({
	// 	query: "(min-width: 539px)",
	// });
	// const view2 = useMediaQuery({
	// 	query: "(min-width: 850px)",
	// });
	const view3 = useMediaQuery({
		query: "(min-width: 1170px)",
	});
	return (
		<div className="reg_col">
			<div className="reg_line_header">
				Date of birth <i className="info_icon"></i>
			</div>
			<div className="reg_grid"
			style={{marginBottom: dateError && !view3 && "90px"}}>
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
				{dateError && (
					<div className={!view3 ? "input_error" : "input_error input_error_select_large"}>
						<div className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}></div>
						{dateError}
					</div>
				)}
			</div>
		</div>
	);
}
 
export default DateOfBirthSelect;