import React from "react";
import { FiHome, FiSettings, FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUser } from "../store/users.slice";
import "./SideNavBar.css";

const SideNavBar: React.FC<any> = () => {
	const user = useSelector(getUser);
	const activeStyle = {
		background: "rgba(255, 255, 255, 0.1)",
	};

	return (
		<div className="sidenav">
			<h3>Welcome, {user?.firstName || "user"}!</h3>
			<nav>
				<NavLink
					to="/feed"
					style={({ isActive }) => (isActive ? activeStyle : undefined)}
				>
					<FiHome />
					<p>Feed</p>
				</NavLink>
				<NavLink
					to="/profile"
					style={({ isActive }) => (isActive ? activeStyle : undefined)}
				>
					<FiUser />
					<p>Profile</p>
				</NavLink>
				<NavLink
					to="/settings"
					style={({ isActive }) => (isActive ? activeStyle : undefined)}
				>
					<FiSettings />
					<p>Settings</p>
				</NavLink>
			</nav>
		</div>
	);
};

export default SideNavBar;
