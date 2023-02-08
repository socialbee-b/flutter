import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getStatus,
	getUserFromLocal,
	login,
	setStatus,
} from "../store/users.slice";
import { addToast } from "../toasts/toasts.slice";

const theme = createTheme();

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch<any>();
	const status = useSelector(getStatus);

	useEffect(() => {
		if (status === "rejected") {
			dispatch(
				addToast({
					status: "error",
					message: "Unable to login: invalid credentials.",
				})
			);
		}
		dispatch(setStatus("idle"));
	}, [status]); // eslint-disable-line

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!email || !password) {
			dispatch(
				addToast({
					status: "warning",
					message: "Please enter your email and password.",
				})
			);
		} else {
			const payload = { email, password };
			try {
				dispatch(login(payload));
				// reset form
				setEmail("");
				setPassword("");

				dispatch(getUserFromLocal());

				navigate("/feed");

				dispatch(
					addToast({
						status: "success",
						message: "You have been logged in.",
					})
				);
			} catch (err: any) {
				dispatch(
					addToast({
						status: "error",
						message: "Unable to login.",
					})
				);
			}
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								<Link href="register" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
