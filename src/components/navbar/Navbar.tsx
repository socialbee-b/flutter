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
import { getUser, handleLogout } from "../store/users.slice";
import { useEffect } from "react";

export default function Navbar() {
	const dispatch = useDispatch<any>();
	const navigate = useNavigate();
	const user = useSelector(getUser);

	const handleClick = () => {
		if (user?.email) {
			navigate("/welcome");
		} else {
			dispatch(handleLogout());
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
					<div>
						<Tooltip
							disableFocusListener
							disableTouchListener
							title={user?.email ? "Logout" : "Login"}
						>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								color="inherit"
								onClick={handleClick}
							>
								{user?.email ? <LogoutIcon /> : <LoginIcon />}
							</IconButton>
						</Tooltip>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
