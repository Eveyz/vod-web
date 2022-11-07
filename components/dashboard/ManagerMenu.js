import Link from 'next/link';

import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import GroupsIcon from '@mui/icons-material/Groups';
import CodeIcon from '@mui/icons-material/Code';

export default function ManagerMenu({ selected }) {
	return (
		<Box sx={{ overflow: 'auto' }}>
			<List>
				<Link href="/dashboard/manager/test_codes">
					<ListItem disablePadding selected={selected === "test_codes"}>
						<ListItemButton>
							<ListItemIcon>
								<CodeIcon />
							</ListItemIcon>
							<ListItemText primary='Test Codes' />
						</ListItemButton>
					</ListItem>
				</Link>
				<Link href="/dashboard/manager/validation_models">
					<ListItem disablePadding selected={selected === "validation_models"}>
						<ListItemButton>
							<ListItemIcon>
								<AssignmentIcon />
							</ListItemIcon>
							<ListItemText primary='Validation Models' />
						</ListItemButton>
					</ListItem>
				</Link>
			</List>
		</Box>
	)
}