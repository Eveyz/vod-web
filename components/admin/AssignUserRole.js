import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';

export default function AssignUserRole({role, roles}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
  };
	
  const handleClose = () => {
		setAnchorEl(null);
  };
	
	const [curRole, setRole] = useState(role);
	const handleAssignRole = (val) => {
		setRole(val)
		handleClose()
	}

	useEffect(() => {
		setRole(role)
	}, [role])

  return (
    <div>
      <Button
				variant="outlined" 
				startIcon={<PersonIcon />}
				color={curRole ? "primary" : "warning"}
				sx={{ border: curRole ? "solid" : "dotted", '&:hover': { border: "dotted"} }}
        onClick={handleClick}
      >
        {
					curRole ? curRole : "No assignee"
				}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
				{
					roles.map((val, idx) => {
						return <MenuItem key={idx} selected={curRole === val} onClick={e => handleAssignRole(val)}>{val}</MenuItem>
					})
				}
      </Menu>
    </div>
  );
}
