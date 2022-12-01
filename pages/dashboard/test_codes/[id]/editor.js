import { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box, Card, CardContent, Button, Typography, Snackbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Breadcrumbs, Modal, Stack } from '@mui/material';
import { unstable_getServerSession } from "next-auth/next"

import ClippedDrawer from "../../../../components/ClippedDrawer"
import { authOptions } from '../../../api/auth/[...nextauth]';
import ValidatorMenu from '../../../../components/dashboard/ValidatorMenu';
import { VALIDATOR } from '../../../../helper/constants';
import CodeEditor from '../../../../components/test_code/CodeEditor'
import { get_doc, update_doc } from '../../../../actions/firebase';

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
  def validate(model, params1, params2)
    # train_data = model.get_training_data()
    # test_data = model.get_testing_data()

    # Implement your code logic:

    # vr = ValidationResult()
    # return vr
  \n`,
	"DSAI": `import dsai\n\nclass DSAITest():\n
  def validate(model, params1, params2)
    # train_data = model.get_training_data()
    # test_data = model.get_testing_data()

    # Implement your code logic:

    # vr = ValidationResult()
    # return vr
  \n`,
	"viper_com": `import viper_com\n\nclass ViperComTest():\n
  def validate(model, params1, params2)
    # train_data = model.get_training_data()
    # test_data = model.get_testing_data()

    # Implement your code logic:

    # vr = ValidationResult()
    # return vr
  \n`
}

export default function TestCodeEditor({ test_code, test_id }) {

	const router = useRouter()

	const [open, setOpen] = useState(test_code ? false : true) // open template selection
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

	const [template, setTemplate] = useState('PiML') // set template

	const selectTemplate = (t) => {
		setTemplate(t)
		handleClose()
	}

	const saveCode = async (code) => {
		await update_doc("test_codes", test_id, {"code": code})
		router.push("/dashboard/test_codes")
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
				open ? '' : <CodeEditor saveCode={saveCode} test_id={test_id} template={test_code ? test_code : templates[template]} />
			}
		</ClippedDrawer>
	)
}


export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions)

	if(!session || !session.user || session.user.role !== VALIDATOR) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	const test_id = context.query.id
	const user = { id: session.user.id, role: session.user.role }
	const test_code = (await get_doc("test_codes", test_id))?.code ?? null

	return {
		props: { user, test_code, test_id }
	}
}