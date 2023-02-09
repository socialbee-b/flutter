import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const OutOfBounds: React.FC<any> = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(-1);
	};

	useEffect(() => {
		setTimeout(() => {
			navigate(-1);
		}, 5000);
	}, []); //eslint-disable-line

	return (
		<div className="flex-column center">
			<h1>Whoops! Page Not Found</h1>
			<p>You will be redirected in 5 seconds...</p>
			<Button onClick={handleClick}>Go Back Now</Button>
		</div>
	);
};

export default OutOfBounds;
