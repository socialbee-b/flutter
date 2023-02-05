import "./Button.css";

const Button: React.FC<any> = ({ children, onClick }) => {
	return (
		<button onClick={onClick ? onClick : null} className="styledButton">
			{children}
		</button>
	);
};

export default Button;
