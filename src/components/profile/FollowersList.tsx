import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/users.slice";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Paper } from "@mui/material";


const FollowersList: React.FC<any> = () => {
    const user = useSelector(getUser);
    // const [followers, setFollowers] = useState([]);
    useEffect (()=> console.log(user?.followers), [user])
    return (
        <Paper style={{ maxHeight: 320, overflow: 'auto' }}>
        <List sx={{ width: '100%', maxWidth: 360}}>
            {/* sx = {{width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} */}
            {user?.followers.map((person: any) => (
                <><ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="user profile picture" src={person?.imageUrl} aria-labelledby="profile picture" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${person?.firstName} ${person?.lastName}`}
                        secondary={<Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                            </Typography>
                            {person?.username}
                        </Fragment>} />
                </ListItem>
                {/* <Divider variant="inset" component="li" /> */}
                </>

            ))}

        </List>
        </Paper>
    );
};

export default FollowersList;
