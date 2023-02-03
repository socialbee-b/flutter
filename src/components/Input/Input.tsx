import { forwardRef } from "react";
import "./Input.css";

const Input: React.FC<any> = forwardRef(
	({ label, type, value, placeholder, disabled }, ref: any) => {
		return (
			<div className="styledInput">
				<label>{label}</label>
				<input
					ref={ref}
					type={type || "text"}
					placeholder={placeholder}
					disabled={disabled}
				/>
			</div>
		);
	}
);

export default Input;
