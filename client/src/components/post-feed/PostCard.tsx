import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import Post from "../../models/Post";
import { Paper, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import PersonIcon from '@mui/icons-material/Person';
import { apiUpsertPost } from '../../remote/social-media-api/post.api';
import { UserContext } from '../../context/user.context';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface postProps {
    post: Post,
    key: number
}


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
}));


export const PostCard = (props: postProps) => {
  const { user } = useContext(UserContext);
  const [expanded, setExpanded ] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [state, setstate] = React.useState({data: props})
  
    const changeState = () => {  
        setstate({data:props}); 
       }; 

  let media = <></>;
  let commentForm = <></>;
  let expandComments = <></>;

  if(props.post.postType === 'Top') {
    expandComments = <CardActions disableSpacing>
          <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <InsertCommentIcon />
        </ExpandMore>
      </CardActions>;
  }

  const handleComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(user);
    props.post.comments.push(new Post(0, data.get('commentText')?.toString() || '', '', [], user, 'Comment'));
    let payload = props.post;
    await apiUpsertPost(payload);
    changeState();
  };

  commentForm = 
  <Paper
      component="form"
      sx={{ p: '4px 0', display: 'flex', alignItems: 'center', width: '100%', mb: '15px' }}
      elevation={1}
      onSubmit={handleComment}>
  <InputBase
        sx={{ ml: 1, flex: 1 }}
        id='commentText'
        name='commentText'
        placeholder="Make a comment..."
        inputProps={{ 'aria-label': 'Make a comment' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="submit">
        <AddCircleIcon color="warning" />
      </IconButton>
 </Paper>;

  if (props.post.imageUrl) {
    media = <CardMedia
    component="img"
    src = {props.post.imageUrl}
    alt="post image"
    sx={{maxHeight: "300px", width: "auto", marginLeft: "auto", marginRight: "auto" }}
  />
  };

  if(!user) {
    commentForm = <></>;
  }

  return (
    <Card sx={{maxWidth:"100%", marginTop: "3%" }}>
      
    <CardHeader
      title={props.post.author.firstName}
      avatar={
          <Avatar sx={{ bgcolor: '#ed6c02' }} aria-label="recipe">
            <PersonIcon/>
          </Avatar>
        }
        />
       
      { media }
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          { props.post.text }
        </Typography>
      </CardContent>
      { expandComments }
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          { commentForm }
          <Divider sx={{ height: 28, m: 0.5 }} orientation="horizontal" />
          <Grid container justifyContent={"center"}>
                <Grid item sx={{width: '100%'}} >
                    {props.post.comments.map((item) =>(
                    <PostCard post={item} key={item.id}/>
                ))
                }
                </Grid> 
            </Grid>
        </CardContent>
      </Collapse>
    </Card>
      );
}