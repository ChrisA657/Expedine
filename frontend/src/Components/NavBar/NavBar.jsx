import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import './NavBar.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import { getFarmOwnerID } from '../../api/farms';




export const NavBar = () => {

  const userContext = React.useContext(UserContext);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [pages, setPages] = React.useState([
    { display: "Home", path: "/dashboard" },
    { display: "Food", path: "/food"}
  ]);

  React.useEffect(()=>{
    if(userContext.userData?.isFarmer){

  }
},[userContext])
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
  const logout = () => {
    userContext.setUserData({});
    navigate("/");
  }
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

            {/* Hamburger menu */}
            {
              userContext.userData?.user_id && <>
                <IconButton sx={{ display: { xs: 'flex', md: 'none' } }}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>

                {/* Mobile menu pages */}
                <Box sx={{ flexGrow: { xs: 0, md: 1 }, display: { xs: 'flex', md: 'none' }, background: "black" }}>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {/* Mobile pages */}
                    {pages.map((page, index) => (
                      <MenuItem key={index} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center" color={"black"}> <Link to={page.path} style={{ color: "black" }}>{page.display}</Link></Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            }
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
              {//userContext.userData?.user_id &&  # this is to keep unlogged in users from seeing these tabs on the navbar
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

              {userContext.userData?.user_id && <div style={{ display: "flex", flexGrow: "1", justifyContent: "flex-end", marginRight: "24px" }}>
                <NavLink to={'/cart'} >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'inherit', display: 'block' }}
                >
                  Cart
                </Button>
              </NavLink>
              </div>}
            </Box>

            {/* Profile icon menu */}
            {
              userContext.userData?.user_id ?
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={userContext.userData?.userName} src="https://smu.instructure.com/images/thumbnails/1257944/qzX5yC1AoRV9ybyzzkOq10a1SBuuKYDM3AiR8Uq8" />
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
                    <MenuItem onClick={() => { handleCloseUserMenu(); logout(); }}>
                      <Typography textAlign="center">Logout</Typography>
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

