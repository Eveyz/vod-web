import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';

export default function AssignManager({manager, managers}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
  };
	
  const handleClose = () => {
		setAnchorEl(null);
  };
	
	const [curManager, setManager] = useState(manager);
	const handleAssignManager = (val) => {
		setManager(val)
		handleClose()
	}

	useEffect(() => {
		setManager(manager)
	}, [manager])

  return (
    <div>
      <Button
				variant="outlined" 
				startIcon={<PersonIcon />}
				color={curManager ? "primary" : "warning"}
				sx={{ border: curManager ? "solid" : "dotted", '&:hover': { border: "dotted"} }}
        onClick={handleClick}
      >
        {
					curManager ? curManager : "No assignee"
				}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
				{
					managers.map((val, idx) => {
						return <MenuItem key={idx} selected={curManager === val} onClick={e => handleAssignManager(val)}>{val}</MenuItem>
					})
				}
      </Menu>
    </div>
  );
}
