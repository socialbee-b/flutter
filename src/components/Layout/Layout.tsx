import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Toasts from "../toasts/Toasts";

const Layout: React.FC<any> = () => {
	return (
		<>
			<Navbar />
			<div className="p-3">
				<Outlet />
			</div>
			<Toasts />
		</>
	);
};

export default Layout;
