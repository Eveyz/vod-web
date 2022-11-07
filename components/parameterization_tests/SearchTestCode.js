import * as React from 'react';
import { useState } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Menu, MenuItem } from '@mui/material'

export default function SearchTestCode({search}) {

	const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

	const searchTestCode = async () => {
		search()
	}

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton 
				sx={{ p: '10px' }} 
				aria-label="menu" 
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
        <MenuIcon />
      </IconButton>
			<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Name</MenuItem>
        <MenuItem onClick={handleClose}>Type</MenuItem>
        <MenuItem onClick={handleClose}>Group</MenuItem>
        <MenuItem onClick={handleClose}>Creator</MenuItem>
      </Menu>

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Test Codes"
        inputProps={{ 'aria-label': 'search test codes' }}
				onChange={searchTestCode}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
