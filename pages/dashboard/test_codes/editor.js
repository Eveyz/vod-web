import { useEffect, useState } from 'react'
import Link from 'next/link';

import { Box, Card, CardContent, Button, Typography, Snackbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Breadcrumbs, Modal, Stack } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CodeIcon from '@mui/icons-material/Code';
import { DataGrid } from "@mui/x-data-grid";
import { unstable_getServerSession } from "next-auth/next"

import ClippedDrawer from "../../../components/ClippedDrawer"
import { authOptions } from '../../api/auth/[...nextauth]';
import ValidatorMenu from '../../../components/dashboard/ValidatorMenu';
import { VALIDATOR } from '../../../helper/constants';
import CodeEditor from '../../../components/test_code/CodeEditor'

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  bgcolor: 'background.paper',
  boxShadow: 10,
  p: 4,
};

const templates = {
	"PiML": `import piml\n\nclass PiMLTest():\n
  def validate(model, params1, params2) {
    # train_data = model.get_training_data()
    # test_data = model.get_testing_data()

    # Implement your code logic:

    # vr = ValidationResult()
    # return vr
  }\n}`,
	"DSAI": `import dsai\n\nclass DSAITest():\n
  def validate(model, params1, params2) {
    # train_data = model.get_training_data()
    # test_data = model.get_testing_data()

    # Implement your code logic:

    # vr = ValidationResult()
    # return vr
  }\n}`,
	"viper_com": `import viper_com\n\nclass ViperComTest():\n
  def validate(model, params1, params2) {
    # train_data = model.get_training_data()
    # test_data = model.get_testing_data()

    # Implement your code logic:

    # vr = ValidationResult()
    # return vr
  }\n}`
}

export default function TestCodeEditor({ data, user }) {

	const [open, setOpen] = useState(true) // open config form
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

	const [template, setTemplate] = useState('PiML') // open config form

	const selectTemplate = (t) => {
		setTemplate(t)
		handleClose()
	}

	return (
		<ClippedDrawer sidebar={<ValidatorMenu selected={"test_codes"} />}>
			<Breadcrumbs>
				<Link underline="hover" href="/dashboard/test_codes">Back</Link>
				<Typography color="text.primary">Test Editor</Typography>
			</Breadcrumbs>
			<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="new-test-code-template"
        aria-describedby="new-test-code-template"
      >
				<Box sx={style}>
					<Typography variant="h6" component="h2">
						Select Test Code Template
					</Typography>
					<Stack direction="column" spacing={2}>
						{
							["PiML", "viper_com", "DSAI"].map(t => {
								return (
									<Card key={t}>
										<CardContent>
											<Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
												<Typography variant="subtitle1" component="h6">
													{t} Template
												</Typography>
												<Button variant="contained" onClick={() => selectTemplate(t)}>Select</Button>
											</Stack>
										</CardContent>
									</Card>
								)
							})
						}
					</Stack>
				</Box>
      </Modal>
			<br/>
			{
				open ? '' : <CodeEditor template={templates[template]} />
			}
		</ClippedDrawer>
	)
}


export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions)

	if(!session.user) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	} else {
		if(session.user.role !== VALIDATOR) {
			return {
				redirect: {
					destination: '/',
					permanent: false
				}
			}
		}
	}

	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { user }
	}
}