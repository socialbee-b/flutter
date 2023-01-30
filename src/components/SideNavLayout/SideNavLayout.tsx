import React from "react";
import SideNavBar from "../sidenavbar/SideNavBar";

const SideNavLayout: React.FC<any> = () => {
	return (
		<div className="gap-3 flex-row">
			<SideNavBar />
		</div>
	);
};
export default SideNavLayout;
