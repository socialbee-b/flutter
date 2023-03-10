import { Box, useTheme } from "@mui/material";
import { useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import Input from "../Input/Input";
import {
	changeEmail,
	changePassword,
	changeUsername,
	getUser,
} from "../store/users.slice";
import { addToast } from "../toasts/toasts.slice";
import "./SettingsPage.css";
import { IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../Theme2";

const Settings: React.FC<any> = () => {
	const dispatch = useDispatch<any>();
	const user = useSelector(getUser);

	// username stuff
	const usernameFormRef = useRef<HTMLFormElement>(null);
	const currentUsername = user?.username;
	const newUsernameRef = useRef<HTMLInputElement>(null);
	const confirmNewUsernameRef = useRef<HTMLInputElement>(null);
	const handleChangeUsername = async (e: any) => {
		e.preventDefault();

		const newUsername = newUsernameRef.current?.value;
		const confirmNewUsername = confirmNewUsernameRef.current?.value;

		// field validation
		if (!newUsername || !confirmNewUsername) {
			dispatch(
				addToast({
					status: "warning",
					message: "Please enter all required fields.",
				})
			);
		} else {
			// compare fields
			if (newUsername !== confirmNewUsername) {
				dispatch(
					addToast({
						status: "warning",
						message: "New usernames do not match.",
					})
				);
			} else {
				// new field not equal to previous
				if (newUsername === currentUsername) {
					dispatch(
						addToast({
							status: "warning",
							message: "New username cannot be the same as the old username.",
						})
					);
				} else {
					const body = {
						id: user?.id,
						username: newUsername,
					};
					dispatch(changeUsername(body));

					// clear the fields
					usernameFormRef.current && usernameFormRef.current.reset();

					// display success message
					dispatch(
						addToast({
							status: "success",
							message: "Username has been updated.",
						})
					);
				}
			}
		}
	};

	// email stuff
	const emailFormRef = useRef<HTMLFormElement>(null);
	const currentEmail = user?.email;
	const newEmailRef = useRef<HTMLInputElement>(null);
	const confirmNewEmailRef = useRef<HTMLInputElement>(null);
	const handleChangeEmail = async (e: any) => {
		e.preventDefault();

		const newEmail = newEmailRef.current?.value;
		const confirmNewEmail = confirmNewEmailRef.current?.value;

		// field validation
		if (!newEmail || !confirmNewEmail) {
			dispatch(
				addToast({
					status: "warning",
					message: "Please enter all required fields.",
				})
			);
		} else {
			// compare fields
			if (newEmail !== confirmNewEmail) {
				dispatch(
					addToast({
						status: "warning",
						message: "New emails do not match.",
					})
				);
			} else {
				// new field not equal to previous
				if (newEmail === currentEmail) {
					dispatch(
						addToast({
							status: "warning",
							message: "New email cannot be the same as the old email.",
						})
					);
				} else {
					const body = {
						id: user?.id,
						email: newEmail,
					};
					dispatch(changeEmail(body));
					// clear the fields
					emailFormRef.current && emailFormRef.current.reset();

					// display success message
					dispatch(
						addToast({
							status: "success",
							message: "Email has been updated.",
						})
					);
				}
			}
		}
	};

	// password stuff
	const passwordFormRef = useRef<HTMLFormElement>(null);
	const currentPasswordRef = useRef<HTMLInputElement>(null);
	const newPasswordRef = useRef<HTMLInputElement>(null);
	const confirmNewPasswordRef = useRef<HTMLInputElement>(null);
	const handleChangePassword = async (e: any) => {
		e.preventDefault();

		const currentPassword = currentPasswordRef.current?.value;
		const newPassword = newPasswordRef.current?.value;
		const confirmNewPassword = confirmNewPasswordRef.current?.value;

		// field validation
		if (!currentPassword || !newPassword || !confirmNewPassword) {
			dispatch(
				addToast({
					status: "warning",
					message: "Please enter all required fields.",
				})
			);
		} else {
			// is current password match real password?
			if (currentPassword === user?.password) {
				// compare fields
				if (newPassword !== confirmNewPassword) {
					dispatch(
						addToast({
							status: "warning",
							message: "New passwords do not match.",
						})
					);
				} else {
					// new field not equal to previous
					if (newPassword === currentPassword) {
						dispatch(
							addToast({
								status: "warning",
								message: "New password cannot be the same as the old password.",
							})
						);
					} else {
						const body = {
							id: user?.id,
							password: newPassword,
						};
						dispatch(changePassword(body));
						// clear the fields
						passwordFormRef.current && passwordFormRef.current.reset();

						// display success message
						dispatch(
							addToast({
								status: "success",
								message: "Password has been updated.",
							})
						);
					}
				}
			} else {
				dispatch(
					addToast({
						status: "warning",
						message: "Current password is incorrect.",
					})
				);
			}
		}
	};

	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);

	return (
		<>
			<h1>Settings</h1>
			<section className="settingsGrid">
				<div className="settingsSection">
					<h3>Change Username</h3>
					<form
						ref={usernameFormRef}
						className="flex-column"
						onSubmit={handleChangeUsername}
					>
						<Input
							label="Current Username:"
							placeholder={currentUsername}
							disabled
						/>
						<Input ref={newUsernameRef} label="New Username *:" />
						<Input
							ref={confirmNewUsernameRef}
							label="Confirm New Username *:"
						/>
						<Button>Update Username</Button>
					</form>
				</div>
				<div className="settingsSection">
					<h3>Change Email</h3>
					<form
						ref={emailFormRef}
						className="flex-column"
						onSubmit={handleChangeEmail}
					>
						<Input label="Current Email:" placeholder={currentEmail} disabled />
						<Input ref={newEmailRef} label="New Email *:" />
						<Input ref={confirmNewEmailRef} label="Confirm New Email *:" />
						<Button>Update Email</Button>
					</form>
				</div>
				<div className="settingsSection">
					<h3>Change Password</h3>
					<form
						ref={passwordFormRef}
						className="flex-column"
						onSubmit={handleChangePassword}
					>
						<Input ref={currentPasswordRef} label="Current Password *:" />
						<Input ref={newPasswordRef} label="New Password *:" />
						<Input
							ref={confirmNewPasswordRef}
							label="Confirm New Password *:"
						/>
						<Button>Update Password</Button>
					</form>
				</div>
				<div className="settingsSection">
					<h3>Change Theme</h3>
					<Box
						sx={{
							display: "flex",
							width: "100%",
							alignItems: "center",
							justifyContent: "center",
							bgcolor: "background.default",
							color: "text.primary",
							borderRadius: 1,
							p: 3,
						}}
					>
						<span className="capitalize">{theme.palette.mode} Mode</span>
						<IconButton
							sx={{ ml: 1 }}
							onClick={colorMode.toggleColorMode}
							color="inherit"
						>
							{theme.palette.mode === "dark" ? (
								<Brightness7Icon />
							) : (
								<Brightness4Icon />
							)}
						</IconButton>
					</Box>
				</div>
			</section>
		</>
	);
};

export default Settings;
