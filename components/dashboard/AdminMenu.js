import { useEffect } from 'react'
import Link from 'next/link';

import { Box, Card, CardContent, Button, Typography, Snackbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleIcon from '@mui/icons-material/People';
import CodeIcon from '@mui/icons-material/Code';
export default function AdminMenu({ selected }) {

	return (
		<Box sx={{ overflow: 'auto' }}>
			<List>
				<Link href="/admin/users">
					<ListItem disablePadding selected={selected === "users"}>
						<ListItemButton>
							<ListItemIcon>
								<PeopleIcon />
							</ListItemIcon>
							<ListItemText primary='Users' />
						</ListItemButton>
					</ListItem>
				</Link>
				<Link href="/admin/test_codes">
					<ListItem disablePadding selected={selected === "test_codes"}>
						<ListItemButton>
							<ListItemIcon>
								<CodeIcon />
							</ListItemIcon>
							<ListItemText primary='Test Codes' />
						</ListItemButton>
					</ListItem>
				</Link>
				<Link href="/admin/groups">
					<ListItem disablePadding selected={selected === "groups"}>
						<ListItemButton>
							<ListItemIcon>
								<GroupsIcon />
							</ListItemIcon>
							<ListItemText primary='Groups' />
						</ListItemButton>
					</ListItem>
				</Link>
			</List>
		</Box>
	)
}