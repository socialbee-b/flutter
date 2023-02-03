import React from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "../sidenavbar/SideNavBar";

const SideNavLayout: React.FC<any> = () => {
	return (
		<div className="flex-row gap-0 full-width">
			<SideNavBar />
			<div className="p-1 full-width">
				<Outlet />
			</div>
		</div>
	);
};
export default SideNavLayout;
