import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import './NavBar.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';






export const NavBar = () => {


  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [pages, setPages] = React.useState([
    { display: "Home", path: "/dashboard" },
    { display: "Food", path: "/food"}
  ]);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const redirect = (route) =>{
    navigate(route);
  }

  return (
    <nav className="main-navbar">
      <AppBar position="static" sx={{ bgcolor: "black" }}>
        <Container maxWidth="3000px">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <NavLink to="/"> Expedine </NavLink>
            </Typography>

           
            {/* Mobile icon center piece */}
            <Typography
              variant="h6"
              noWrap
              component="span"
              sx={{ flexGrow: 1, mr: 2, display: { xs: 'flex', md: 'none' } }}
            >
              <NavLink to="/"> Expedine </NavLink>
            </Typography>

            {/* desktop page links */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
              {
              pages.map((page, index) => (
                <NavLink key={index} to={page.path} >
                  <Button
                    variant='text'
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'inherit', display: 'block' }}
                  >
                    {page.display}
                  </Button>
                </NavLink>
              ))}
            </Box>

            {/* Profile icon menu */}
            {
              false ?
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={'profile'} src="https://smu.instructure.com/images/thumbnails/1257944/qzX5yC1AoRV9ybyzzkOq10a1SBuuKYDM3AiR8Uq8" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {/* {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))} */}
                    <MenuItem onClick={() => { handleCloseUserMenu(); redirect('/cart'); }}>
                      <Typography textAlign="center">My cart</Typography>
                    </MenuItem>

                  </Menu>
                </Box>
                :
                <Link to={'/login'}>
                  <Button variant="contained" color="success" >
                    <Typography textAlign="center">Login</Typography>
                  </Button>
                </Link>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </nav>
  );
};

