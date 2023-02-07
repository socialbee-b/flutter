import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import SearchBar from "../searchbar/SearchBar";
import Toasts from "../toasts/Toasts";
import "./Layout.css";

const Layout: React.FC<any> = () => {
	return (
		<section className="layoutContainer">
			<div className="layoutHeader">
				<Navbar />
			</div>
			<div className="layoutBody flex-row">
				<Outlet />
			</div>
			<Toasts />
		</section>
	);
};

export default Layout;
