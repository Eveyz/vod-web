import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GroupIcon from '@mui/icons-material/Group';
import { update_doc } from '../../actions/firebase';

export default function AssignUserGroup({showMsg, user_id, group, groups}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
  };
	
  const handleClose = () => {
		setAnchorEl(null);
  };
	
	const [curGroup, setGroup] = useState(group);
	const handleAssignGroup = async (val) => {
		setGroup(val)
		handleClose()
		await update_doc("users", user_id, {"group": val})
		showMsg(true)
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
					curGroup ? curGroup : "No group"
				}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
				{
					groups.map((group, idx) => {
						return <MenuItem key={idx} selected={curGroup === group} onClick={e => handleAssignGroup(group)}>{group}</MenuItem>
					})
				}
      </Menu>
    </div>
  );
}
