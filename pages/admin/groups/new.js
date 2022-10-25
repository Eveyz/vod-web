import { useEffect } from 'react'
import Link from 'next/link';

import { Typography, Breadcrumbs } from '@mui/material';
import { unstable_getServerSession } from "next-auth/next"

import ClippedDrawer from "../../../components/ClippedDrawer"
import { authOptions } from '../../api/auth/[...nextauth]';
import { ADMIN } from '../../../helper/constants';
import AdminMenu from '../../../components/dashboard/AdminMenu';
import GroupForm from '../../../components/admin/GroupForm';
import { add_doc } from '../../../actions/firebase';

export default function NewGroup() {

	const addGroup = (group) => {
		group['members'] = 0
		add_doc("groups", group)
	}

	return (
		<ClippedDrawer sidebar={<AdminMenu selected={"groups"} />}>
			<Breadcrumbs>
				<Link underline="hover" href="/admin/groups">Back</Link>
				<Typography color="text.primary">New Group</Typography>
			</Breadcrumbs>
			<br/>
			<GroupForm handleSubmit={addGroup} />
		</ClippedDrawer>
	)
}

export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions)

	if(!session || !session.user || session.user.role !== ADMIN) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { user }
	}
}