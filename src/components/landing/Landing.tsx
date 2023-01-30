import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";

const Landing: React.FC<any> = () => {
	return (
		<Box>
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
						Big Text About Our App Goes Here
					</Typography>
					<Typography
						variant="body1"
						sx={{ fontSize: "1rem", color: "#5A6473", my: 2 }}
					>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero,
						deleniti error iure quae praesentium commodi expedita ea alias vel
						earum sequi asperiores repellat odio laborum laboriosam, delectus
						aliquid provident harum!Lorem ipsum dolor sit amet, consectetur
						adipisicing elit.
					</Typography>
					<Button
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
					<img src="socialmedia.png" style={{ marginBottom: "2rem" }} />
				</Box>
			</Container>
		</Box>
	);
};

export default Landing;
