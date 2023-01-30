import { Box, Container, Switch, TextField, Typography } from "@mui/material";
import React from "react";

const Settings: React.FC<any> = () => {
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
