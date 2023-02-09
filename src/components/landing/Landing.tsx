import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing: React.FC<any> = () => {
	const navigate = useNavigate();

	return (
		<Box sx={{ margin: "5rem auto" }}>
			<Container
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					padding: 2,
				}}
			>
				<Box>
					<Typography variant="h2" sx={{ fontWeight: "bold" }}>
						Stay Connected!
					</Typography>
					<Typography
						variant="body1"
						sx={{ fontSize: "20px", color: "#5A6473", my: 2 }}
					>
						Welcome to Fluttr: Connecting with others has never been easier;
						share your thoughts and like/comment on your friends' posts.
						Register now and unleash your social butterfly!
					</Typography>
					<Button
						onClick={() => navigate("/register")}
						variant="contained"
						sx={{
							fontSize: "18px",
							padding: 2,
							borderRadius: "10px",
						}}
					>
						Register Now!
					</Button>
				</Box>

				<Box sx={{ flex: "1.25", padding: "1rem" }}>
					<img src="socialmedia.png" style={{ marginBottom: "2rem" }} alt="" />
				</Box>
			</Container>
		</Box>
	);
};

export default Landing;
