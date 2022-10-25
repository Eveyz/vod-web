import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Snackbar, Alert } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import { DEVELOPER, VALIDATOR, GATEKEEPER, ADMIN } from '../../helper/constants';
import { update_doc } from '../../actions/firebase';

const roles = [DEVELOPER, VALIDATOR, GATEKEEPER, ADMIN]

export default function AssignUserRole({user_id, role, showMsg}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
  };
	
  const handleClose = () => {
		setAnchorEl(null);
  };
	
	const [curRole, setRole] = useState(role);

	const handleAssignRole = async (val) => {
		setRole(val)
		handleClose()
		await update_doc("users", user_id, {"role": val})
		showMsg(true)
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
