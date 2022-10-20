import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GroupIcon from '@mui/icons-material/Group';

export default function AssignUserGroup({group, groups}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
  };
	
  const handleClose = () => {
		setAnchorEl(null);
  };
	
	const [curGroup, setGroup] = useState(group);
	const handleAssignGroup = (val) => {
		setGroup(val)
		handleClose()
	}

	useEffect(() => {
		setGroup(group)
	}, [group])

  return (
    <div>
      <Button
				variant="outlined" 
				startIcon={<GroupIcon />}
				color={curGroup ? "primary" : "warning"}
				sx={{ border: curGroup ? "solid" : "dotted", '&:hover': { border: "dotted"} }}
        onClick={handleClick}
      >
        {
					curGroup ? curGroup : "No assignee"
				}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
				{
					groups.map((val, idx) => {
						return <MenuItem key={idx} selected={curGroup === val} onClick={e => handleAssignGroup(val)}>{val}</MenuItem>
					})
				}
      </Menu>
    </div>
  );
}
