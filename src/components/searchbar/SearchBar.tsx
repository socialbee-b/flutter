import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { getUser } from "../store/users.slice"; 
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


export default function SearchBar() {
	const navigate = useNavigate();
	const user = useSelector(getUser);

	const handleClick = () => {
		if (user?.email) {
			localStorage.setItem("user", "{}");
			navigate("/welcome");
		} else {
			navigate("/login");
		}
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" color="transparent">
				<Toolbar>
					<Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
						Fluttr
					</Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
						/>
                     </Search>
					<div>
						<Tooltip
							disableFocusListener
							disableTouchListener
							title={user?.email ? "Logout" : "Login"}
						>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								color="inherit"
								onClick={handleClick}
							>
								{user?.email ? <LogoutIcon /> : <LoginIcon />}
							</IconButton>
                         
						</Tooltip>

                       
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);

    
}
