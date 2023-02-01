import React from "react";
import { useSelector } from "react-redux";
import Toast from "./Toast";
import "./Toast.css";
import { getToasts } from "./toasts.slice";

const Toasts: React.FC<any> = () => {
	const toasts = useSelector(getToasts);

	return (
		<section className="toasts">
			{toasts.map((toast: any) => (
				<Toast
					key={toast?.id}
					id={toast?.id}
					status={toast?.status}
					message={toast?.message}
				/>
			))}
		</section>
	);
};

export default Toasts;
