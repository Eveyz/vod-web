import Link from 'next/link';

import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import CodeIcon from '@mui/icons-material/Code';

export default function ValidatorMenu({ selected }) {
	return (
		<Box sx={{ overflow: 'auto' }}>
			<List>
				<Link href="/dashboard/validation_tasks">
					<ListItem disablePadding selected={selected === "validation_tasks"}>
						<ListItemButton>
							<ListItemIcon>
								<AssignmentIcon />
							</ListItemIcon>
							<ListItemText primary='Validation Tasks' />
						</ListItemButton>
					</ListItem>
				</Link>
				{/* <Link href="/dashboard/parameterization_tests">
					<ListItem disablePadding selected={selected === "parameterization_tests"}>
						<ListItemButton>
							<ListItemIcon>
								<QuizIcon />
							</ListItemIcon>
							<ListItemText primary='Parameterization Tests' />
						</ListItemButton>
					</ListItem>
				</Link> */}
				<Link href="/dashboard/test_codes">
					<ListItem disablePadding selected={selected === "test_codes"}>
						<ListItemButton>
							<ListItemIcon>
								<CodeIcon />
							</ListItemIcon>
							<ListItemText primary='Test Codes' />
						</ListItemButton>
					</ListItem>
				</Link>
			</List>
		</Box>
	)
}