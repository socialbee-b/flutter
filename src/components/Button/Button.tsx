import "./Button.css";

const Button: React.FC<any> = ({ children }) => {
	return <button className="styledButton">{children}</button>;
};

export default Button;
