import Link from 'next/link';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const navItems = ['Home', 'About', 'Contact'];

export default function Navbar() {
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
					<Link href="/login">
						<Button color="inherit">Login</Button>
					</Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}