import * as React from 'react';
import { useState, useEffect } from 'react'
import { Box, Typography, Modal, FormControl, InputLabel, Select, OutlinedInput, MenuItem, FormGroup, FormControlLabel, Switch, Button, Stack, TextField, Tooltip, IconButton, Grid } from '@mui/material';

import SearchTestCode from './SearchTestCode';
import ListSearchedTestCode from './SearchedTestCodesList';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { SignalWifiStatusbarNullSharp } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const operator_display = {
	'gt': ">",
	'gte': ">=",
	'e': "=",
	'lt': "<",
	'lte': "<=",
}

export default function AddTestCodeModal({
	handleClose, open, testcode, addTestCode, updateTest, action, cancel
}) {

	const [newCriterion, setAddNewCriterion] = useState(false)

	const [criterion, setCriterion] = useState([])
	const [validator_comments, setValidatorComments] = useState('')

	const [name, setName] = useState('')
	const [operator, setOperator] = useState('gt')
	const [value, setValue] = useState('')

	useEffect(() => {
		if(action === "edit" && testcode) {
			setValidatorComments(testcode['validator_comments'])
			setCriterion(testcode['criterion'])
		}
	}, [testcode, action])

	const reset = () => {
		setName('')
		setOperator('gt')
		setValue('')
		setAddNewCriterion(false)
		setCriterion([])
		setValidatorComments('')
	}

	const addCriteria = () => {
		setCriterion([...criterion, {
			'name': name,
			'operator': operator,
			'value': value
		}])
		setName('')
		setOperator('gt')
		setValue('')
		setAddNewCriterion(false)
	}

	const deleteCriteria = (idx) => {
		setCriterion(criterion.filter((test, index) => index !== idx))
	}

	const setParamsValue = (e, idx, param) => {
		let ps = testcode['params']
		ps[idx]['value'] = e.target.value
		// setParams(ps)
	}

	const save = () => {
		let new_testcode = testcode
		new_testcode["validator_comments"] = validator_comments
		new_testcode["criterion"] = criterion
		if(testcode["params"]) new_testcode["params"] = testcode['params']
		if(action === "new") addTestCode(new_testcode)
		else updateTest(new_testcode)
		reset()
	}

	const cancelAndReset = () => {
		reset()
		cancel()
	}

  return (
    <div>
      <Modal
        open={open}
        onClose={cancelAndReset}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
					<Typography id="modal-modal-title" variant="h5" component="h2">
            Parameterize Test Code
          </Typography>
					<TextField
						fullWidth
						label="Validator Comments"
						name="validator_comments"
						value={validator_comments}
						onChange={(e) => setValidatorComments(e.target.value)}
						multiline
						rows={3}
						sx={{mt: 2}}
					/>
					<Typography variant="h6" component="h2" gutterBottom sx={{mt: 2, mb: 0}}>
						Parameters
					</Typography>
					{
						testcode && ('params' in testcode) ? 
						<>
							<Typography variant="subtitle2" gutterBottom sx={{color: 'grey'}}>
								Fill in the below parameters:
							</Typography>
							<Stack direction="row" spacing={2}>
							{
								testcode['params'].map((p, idx) => {
									return (
											<TextField 
												key={idx}
												label={p['name']}
												defaultValue={p['value'] ? p['value'] : ''}
												size="small"
												onChange={(e) => setParamsValue(e, idx, p['name'])}
											/>
										)
									})
								}
							</Stack>
						</>
						:
						<Typography variant="subtitle1" component="div" gutterBottom sx={{mt: 1}}>
							No params found for this test code
						</Typography>
					}
					<Typography variant="h6" component="h2" gutterBottom sx={{mt: 2}}>
						Criterion
					</Typography>
					{
						criterion.length > 0 ?
						criterion.map((c, idx) => {
							return  (
								<Grid container alignItems={'center'} key={idx}>
									<Grid item xs={5} sx={{borderBottom: '1px solid grey'}}>
										<Typography variant="subtitle1" component="span">
											{idx+1}.
										</Typography>
										<Typography variant="subtitle1" component="span" sx={{ml: 2}}>
											{c['name']}
										</Typography>
										<Typography variant="subtitle1" component="span" sx={{ml: 1}}>
											{operator_display[c['operator']]}
										</Typography>
										<Typography variant="subtitle1" component="span" sx={{ml: 1}}>
											{c['value']}
										</Typography>
									</Grid>
									<Grid item xs={7}>
										<Tooltip title="Delete">
											<IconButton
												aria-label="delete" 
												color="error"
												onClick={() => deleteCriteria(idx)}
											>
												<DeleteIcon />
											</IconButton>
										</Tooltip>
									</Grid>
								</Grid>
							)
						})
						:
						null
					}
					{
						newCriterion ?
						<Stack direction={'row'} spacing={1} sx={{mt: 2}}>
							<TextField 
								label='Criteria Name'
								size="small"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<FormControl sx={{ minWidth: 110 }} required size="small">
								<InputLabel id="multiple-operator-label">Operator</InputLabel>
								<Select
									labelId="multiple-operator-label"
									name='operator'
									autoWidth
									value={operator}
									onChange={(e) => setOperator(e.target.value)}
									input={<OutlinedInput label="Operator" />}
								>
									<MenuItem value={'gt'} selected>{">"}</MenuItem>
									<MenuItem value={'gte'}>{">="}</MenuItem>
									<MenuItem value={'e'}>{"="}</MenuItem>
									<MenuItem value={'lt'}>{"<"}</MenuItem>
									<MenuItem value={'lte'}>{"<="}</MenuItem>
								</Select>
							</FormControl>
							<TextField 
								label='Criteria Value' 
								size="small"
								value={value}
								onChange={(e) => setValue(e.target.value)}
							/>
							<Button variant='outlined' onClick={addCriteria} sx={{mt: 1}}>
								Done
							</Button>
						</Stack>
						:
						null
					}
					<Button variant='outlined' disabled={newCriterion} onClick={() => setAddNewCriterion(true)} startIcon={<AddIcon />} sx={{mt: 1}}>
						Add New Criteria
					</Button>
					<br/>
					<Button variant="contained" onClick={save} sx={{mt: 5}}>
						Save
					</Button>
					<Button onClick={cancelAndReset} sx={{mt: 5, ml: 2}}>
						Cancel
					</Button>
        </Box>
      </Modal>
    </div>
  );
}
