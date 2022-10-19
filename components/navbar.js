import Link from 'next/link';
import { useState } from 'react'
import { AppBar, Box, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSession, signIn, signOut } from 'next-auth/react'
import useAdminAuth from '../helper/useAdminAuth';

const navItems = ['Home', 'About', 'Contact'];

export default function Navbar() {

	const isAuthenticated = useAdminAuth(true)

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            VOD
          </Typography>
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						<Link href="/dashboard">
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
                color="inherit"
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
							<Button color="inherit">Sign in</Button>
						</Link>
					}
        </Toolbar>
      </AppBar>
    </Box>
  );
}