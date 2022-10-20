import Link from 'next/link';
import { useState } from 'react'
import { AppBar, Box, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { signOut } from 'next-auth/react'
import theme from '../helper/theme';

export default function Navbar({url, isAuthenticated}) {

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="header">
          <Toolbar>
            <Link href="/">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer', color: "#fff" }}>
                VOD
              </Typography>
            </Link>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Link href={url}>
                <Button sx={{ color: '#fff' }}>
                  Dashboard
                </Button>
              </Link>
            </Box>
            {
              isAuthenticated ?
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="white"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
                </Menu>
              </div>
              :
              <Link href="/auth/signin">
                <Button color="white">Sign in</Button>
              </Link>
            }
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}