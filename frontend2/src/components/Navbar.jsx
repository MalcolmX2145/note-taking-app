import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const { user, loggedIn } = useContext(AuthContext)

    const handleLogout = () => {
        navigate('/login');
    };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#4caf50' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: '#fff' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {loggedIn && user ? `${user.firstName}'s notes` : "Welcome"}
          </Typography>
        <IconButton onClick={handleLogout} aria-label="logout" sx={{ color: 'inherit', '&:hover': {color: 'red', }}}>
            <LogoutIcon />
        </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
