import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';

export default function AssignValidator({validator, validators}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
  };
	
  const handleClose = () => {
		setAnchorEl(null);
  };
	
	const [curValidator, setValidator] = useState(validator);
	const handleAssignValidator = (val) => {
		setValidator(val)
		handleClose()
	}

	useEffect(() => {
		setValidator(validator)
	}, [validator])

  return (
    <div>
      <Button
				variant="outlined" 
				startIcon={<PersonIcon />}
				color={curValidator ? "primary" : "warning"}
				sx={{ border: curValidator ? "solid" : "dotted", '&:hover': { border: "dotted"} }}
        onClick={handleClick}
      >
        {
					curValidator ? curValidator : "No assignee"
				}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
				{
					validators.map((val, idx) => {
						return <MenuItem key={idx} selected={curValidator === val} onClick={e => handleAssignValidator(val)}>{val}</MenuItem>
					})
				}
      </Menu>
    </div>
  );
}
