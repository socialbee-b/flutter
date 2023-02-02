import React, { useState, useEffect } from "react";
import {
	FiAlertCircle,
	FiAlertOctagon,
	FiAlertTriangle,
	FiCheck,
	FiX,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { removeToast } from "./toasts.slice";

const Toast: React.FC<any> = ({ id, status, message }) => {
	const dispatch = useDispatch();

	const [color, setColor] = useState("#1e90ff");
	const [icon, setIcon] = useState(<FiAlertCircle />);

	const handleClick = () => {
		dispatch(removeToast(id));
	};

	useEffect(() => {
		switch (status.toLowerCase()) {
			case "error":
				setIcon(<FiAlertOctagon />);
				setColor("#ff4757");
				break;
			case "warning":
				setIcon(<FiAlertTriangle />);
				setColor("#ffa502");
				break;
			case "success":
				setIcon(<FiCheck />);
				setColor("#2ed573");
				break;
			default:
				setIcon(<FiAlertCircle />);
				setColor("#1e90ff");
				break;
		}

		setTimeout(() => {
			dispatch(removeToast(id));
		}, 6000);
	}, []); // eslint-disable-line

	return (
		<div className="toast" style={{ color: color }}>
			<div className="icon statusIcon">{icon}</div>
			<p>{message}</p>
			<div onClick={handleClick} className="icon exitBtn">
				<FiX />
			</div>
		</div>
	);
};

export default Toast;
