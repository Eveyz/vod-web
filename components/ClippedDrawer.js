import Link from 'next/link';
import { useRouter } from 'next/router';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

export default function ClippedDrawer({ selected, children }) {

	const router = useRouter()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
					<Link href="/login">
						<Button color="inherit">Login</Button>
					</Link>
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
        <Box sx={{ overflow: 'auto' }}>
          <List>
						<Link href="/dashboard/validation_suites">
							<ListItem disablePadding selected={selected === "validation_suites"}>
								<ListItemButton>
									<ListItemIcon>
										<InboxIcon />
									</ListItemIcon>
									<ListItemText primary='Validation Suites' />
								</ListItemButton>
							</ListItem>
						</Link>
						<Link href="/dashboard/parameterize_tests">
							<ListItem disablePadding selected={selected === "parameterize_tests"}>
								<ListItemButton>
									<ListItemIcon>
										<MailIcon />
									</ListItemIcon>
									<ListItemText primary='Parameterize Tests' />
								</ListItemButton>
							</ListItem>
						</Link>
						<Link href="/dashboard/test_codes">
							<ListItem disablePadding selected={selected === "test_codes"}>
								<ListItemButton>
									<ListItemIcon>
										<MailIcon />
									</ListItemIcon>
									<ListItemText primary='Test Codes' />
								</ListItemButton>
							</ListItem>
						</Link>
          </List>
          {/* <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
