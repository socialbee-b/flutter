import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../store/users.slice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

const FollowingList: React.FC<any> = () => {
	const user = useSelector(getUser);
	useEffect(() => console.log(user?.following), [user]);
	return (
		<Paper style={{ maxHeight: 320, overflow: "auto" }}>
			<List sx={{ width: "100%", maxWidth: 360 }}>
				{user?.following?.map((person: any, id: any) => (
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
