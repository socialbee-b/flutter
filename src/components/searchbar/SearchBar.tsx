import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUser, handleLogout } from "../store/users.slice";
import { styled, alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

export default function SearchBar() {
	// const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(getUser);
	const [log, setLog] = useState("Login");
	const [logButton, setLogButton] = useState(<></>);
  const dispatch = useDispatch<any>();

	useEffect(() => {
		if (user?.email) {
			setLog("Logout");
			setLogButton(<LogoutIcon />);
		} 
    else {
			setLog("Login");
			setLogButton(<LoginIcon />);
		}
	}, [user]);

	const handleClick = () => {
		if (user?.email) {
			navigate("/");
			dispatch(handleLogout());
		} else {
			navigate("/login");
		}
	};

  // Options to be replaced with actual users/post data from backend
  // const users : any[] = [
  //   {
  //     username: "tlast"
  //   },
  //   {
  //     username: "test"
  //   },
  //   {
  //     username: "newuser"
  //   },
  //   {
  //     username: "spinner"
  //   }
  // ]
  // "users" variable should equal to the Axios call to get all users as a list
  // const user = useSelector(whatever the response list is called here);
  const users = useSelector((state: any) => state.users.users);

  const posts : any[] = [
    {
      id: 1,
      text: "Some Text"
    },
    {
      id: 2,
      text: "Some text with a few more words for searching and maybe longer text."
    },
    {
      id: 3,
      text: "This is a sentence with a bunch of letters."
    },
    {
      id: 4,
      text: "Your post written here is invalid."
    },
    {
      id: 5,
      text: "I'm new to this platform, how do I make friends?"
    },
    {
      id: 6,
      text: "Time is being wasted on wars, let's focus on global warming issues."
    },
    {
      id: 7,
      text: "Will this platform ever implement direct messaging."
    },
    {
      id: 8,
      text: "New post script just a variety of post messages."
    }
  ]
  // "posts" should be equal to axios request to all posts top level posts
  // const posts = useSelector(name for getting all posts list)


  // This compiles all the users and posts in one list of options that will be searchable through.
  const options = [
    ...users.map((option: any) => {
      const type = "Users";
      return {
        type: type,
        ...option,
      }
    }),
    ...posts.map((option) => {
      const type = "Posts";
      return {
        type: type,
        ...option,
      }
    })
  ]

const OPTIONS_LIMIT = 10;
const defaultFilterOptions = createFilterOptions();

const filterOptions = (options: any, state: any) => {
  return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" color="transparent">
				<Toolbar>
					<Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
						Fluttr
					</Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <Autocomplete
              onFocus={(event) => {
                dispatch(getAllUsers());
              }}
              id="free-solo-demo"
              freeSolo
              sx={{ 
                borderRadius: "16px",
                width: 200
              }}
              filterOptions = {filterOptions}
              options={options}
              groupBy={(option) => option.type}
              getOptionLabel={(option) => {
                if (option.type == "Users") {
                  return option.username;
                }
                else {
                  return option.text;
                }
              }}
              renderInput={(params) => {
                const {InputLabelProps, InputProps, ...rest} = params;
                return <StyledInputBase {...params.InputProps} {...rest} placeholder="Search..."/>
            }}
            />
          </Search>
          
					<div>
						<Tooltip
							disableFocusListener
							disableTouchListener
							title={log}
						>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								color="inherit"
								onClick={handleClick}
							>
								{logButton}
							</IconButton>     
						</Tooltip>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
