import { Box, Container, Switch, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, getUser } from "../store/users.slice";
import { addToast } from "../toasts/toasts.slice";

const Settings: React.FC<any> = () => {
	const dispatch = useDispatch<any>();
	const user = useSelector(getUser);

	//user info
	const [username, setUsername] = useState(user?.username || "");
	const [email, setEmail] = useState(user?.email || "");
	const [currentPwd, setCurrentPwd] = useState(user?.password || "");

	// application settings
	const [darkMode, setDarkMode] = useState(
		localStorage.getItem("darkMode") || false
	);

	// refs for update password section
	const currentPasswordRef = useRef<HTMLInputElement>(null);
	const newPasswordRef = useRef<HTMLInputElement>(null);
	const confirmNewPasswordRef = useRef<HTMLInputElement>(null);

	const handlePasswordChange = (e: any) => {
		// prevent default form submition
		e.preventDefault();

		// get values from the password refs
		const currentPassword = currentPasswordRef.current?.value;
		const newPassword = newPasswordRef.current?.value;
		const confirmNewPassword = confirmNewPasswordRef.current?.value;

		// make sure fields aren't empty
		if (!currentPassword || !newPassword || !confirmNewPassword) {
			dispatch(
				addToast({
					status: "warning",
					message: "Please provide values for all fields.",
				})
			);
		} else {
			// make sure new password and confirmation are the same
			if (newPassword === confirmNewPassword) {
				// make sure new password doesn't match current password
				if (newPassword === currentPassword) {
					dispatch(
						addToast({
							status: "warning",
							message: "New password cannot be your current password.",
						})
					);
				} else {
					// check if given password == current password
					if (currentPassword === currentPwd) {
						const payload = {
							id: user?.userId,
							newPassword,
						};
						dispatch(changePassword(payload));

						// clear the password fields
						currentPasswordRef.current.value = "";
						newPasswordRef.current.value = "";
						confirmNewPasswordRef.current.value = "";

						dispatch(
							addToast({
								status: "success",
								message: "Password has been updated.",
							})
						);
					} else {
						dispatch(
							addToast({
								status: "error",
								message:
									"Cannot update password: your current password is incorrect.",
							})
						);
					}
				}
			} else {
				dispatch(
					addToast({
						status: "warning",
						message: "Passwords do not match.",
					})
				);
			}
		}
	};

	return (
		<Container sx={{ width: 1 }}>
			<Typography variant="h3">Settings</Typography>
			<Container
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					width: 1,
				}}
			>
				<Container sx={{ display: "flex", flexDirection: "column" }}>
					<Box className="pb-1">
						<Typography variant="h6"> Change Password</Typography>
						<Typography className="pl-1" variant="body1">
							Current Password
							<TextField
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
							/>
						</Typography>
						<Typography className="pl-1" variant="body1">
							New Password
							<TextField
								fullWidth
								name="newPassword"
								label="New Password"
								type="password"
								id="newPassword"
							/>
						</Typography>
						<Typography className="pl-1" variant="body1">
							Confirm New Password
							<TextField
								fullWidth
								name="confirmPassword"
								label="New Password"
								type="password"
								id="confirmPassword"
							/>
						</Typography>
					</Box>
					<Box className="pb-1">
						<Typography variant="h6"> Change Email</Typography>
						<Typography className="pl-1" variant="body1">
							Current Email
							<TextField
								fullWidth
								name="email"
								label="Email"
								type="email"
								id="email"
							/>
						</Typography>
						<Typography className="pl-1" variant="body1">
							New Email
							<TextField
								fullWidth
								name="newEmail"
								label="New Email"
								type="email"
								id="newEmail"
							/>
						</Typography>
						<Typography className="pl-1" variant="body1">
							Confirm New Email
							<TextField
								fullWidth
								name="confirmEmail"
								label="New Email"
								type="email"
								id="confirmEmail"
							/>
						</Typography>
					</Box>
				</Container>
				<Container sx={{ display: "flex", flexDirection: "column" }}>
					<Box className="pb-1">
						<Typography variant="h6"> Change Username</Typography>
						<Typography className="pl-1" variant="body1">
							Current Username
							<TextField
								fullWidth
								name="username"
								label="Username"
								type="text"
								id="username"
							/>
						</Typography>
						<Typography className="pl-1" variant="body1">
							New Username
							<TextField
								fullWidth
								name="newUsername"
								label="New Username"
								type="text"
								id="newUsername"
							/>
						</Typography>
						<Typography className="pl-1" variant="body1">
							Confirm New Username
							<TextField
								fullWidth
								name="confirmUsername"
								label="New Username"
								type="text"
								id="confirmUsername"
							/>
						</Typography>
					</Box>
					<Box className="pb-1">
						<Typography variant="h6">Change Theme</Typography>
						<Typography className="pl-1" variant="body1">
							Dark Mode
							<Switch defaultChecked size="medium" />
						</Typography>
					</Box>
				</Container>
			</Container>
		</Container>
	);
};

export default Settings;
