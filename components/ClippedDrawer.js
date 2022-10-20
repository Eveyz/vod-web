import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react'

import { ThemeProvider } from '@mui/material/styles';
import { Box, Button, Drawer, AppBar, CssBaseline, Toolbar, Typography, Menu, MenuItem, IconButton  } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import theme from '../helper/theme';

const drawerWidth = 240;

export default function ClippedDrawer({ sidebar, selected, children }) {

	const router = useRouter()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" color="header" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Link href="/">
              <Typography variant="h6" style={{color:"#fff", cursor: 'pointer'}} component="div" sx={{ flexGrow: 1 }}>
                VOD
              </Typography>
            </Link>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          {sidebar}
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
