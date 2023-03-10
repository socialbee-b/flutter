import { Fragment } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/users.slice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

const FollowingList: React.FC<any> = () => {
	const selectedUser = useSelector(getCurrentUser);

	return (
		<Paper style={{ maxHeight: 320, overflow: "auto" }}>
			<List sx={{ width: "100%", maxWidth: 360 }}>
				{selectedUser?.following?.length === 0 && <p>No users found</p>}
				{selectedUser?.following?.map((person: any, id: any) => (
					<ListItem alignItems="flex-start" key={id}>
						<ListItemAvatar>
							<Avatar
								alt="user profile picture"
								src={person?.imageUrl}
								aria-labelledby="profile picture"
							/>
						</ListItemAvatar>
						<ListItemText
							primary={`${person?.firstName} ${person?.lastName}`}
							secondary={
								<Fragment>
									<Typography
										sx={{ display: "inline" }}
										component="span"
										variant="body2"
										color="text.primary"
									></Typography>
									{person?.username}
								</Fragment>
							}
						/>
					</ListItem>
				))}
			</List>
		</Paper>
	);
};

export default FollowingList;
