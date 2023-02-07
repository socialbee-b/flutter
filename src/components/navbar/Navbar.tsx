import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUser, handleLogout } from "../store/users.slice";
import { useEffect, useState } from "react";
import SearchBar from "../searchbar/SearchBar";

const Navbar: React.FC<any> = () => {
	const navigate = useNavigate();
	const user = useSelector(getUser);
	const [log, setLog] = useState("Login");
	const [logButton, setLogButton] = useState(<></>);
	const dispatch = useDispatch<any>();
	const users = useSelector(getAllUsers);

	useEffect(() => {
		if (user?.email) {
			setLog("Logout");
			setLogButton(<LogoutIcon />);
		} else {
			setLog("Login");
			setLogButton(<LoginIcon />);
		}
	}, [user]);

	const handleClick = () => {
		if (user?.email) {
			navigate("/");
			dispatch(handleLogout());
		} else {
			navigate("/login");
		}
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" color="transparent">
				<Toolbar>
					<Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
						Fluttr
					</Typography>
					<SearchBar />
					<Tooltip disableFocusListener disableTouchListener title={log}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							color="inherit"
							onClick={handleClick}
						>
							{logButton}
						</IconButton>
					</Tooltip>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
