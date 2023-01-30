import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./SideNavBar.css";

const SideNavBar: React.FC<any> = (props) => {
	return (
		<>
			<div className="sidenav">
				<Link to="/">My Feed</Link>
				<Link to="/profile">Profile</Link>
				<Link to="/settings">Settings</Link>
			</div>
			<div className="container">
				{/* This links to the appropriate page component  */}
				<Outlet />
			</div>
		</>
	);
};

export default SideNavBar;
