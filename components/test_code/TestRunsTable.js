import { useState, useEffect } from 'react';
// import Link from 'next/link'

import { Link, Card, CardContent, Button, Typography, Divider, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@mui/material';

export default function TestRunsTable({runs}) {

	return (
		<div>
			{
				runs.length > 0 ?
				<>
					<Divider sx={{mt: 2, mb: 1}} />
					<Typography variant="h6" component="span">
						Test Runs
					</Typography>
					<TableContainer component={Paper}>
						<Table size="small" aria-label="a dense table">
							<TableHead>
								<TableRow>
									<TableCell align="left">Job ID</TableCell>
									<TableCell align="left">Status</TableCell>
									<TableCell align="left">Started at</TableCell>
									<TableCell align="left">Completed at</TableCell>
									<TableCell align="left">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{runs.map((run, idx) => (
									<TableRow
										key={idx}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell align="left">{run.job_id}</TableCell>
										<TableCell align="left">{run.status}</TableCell>
										<TableCell align="left">{run.started_at}</TableCell>
										<TableCell align="left">{run.completed_at}</TableCell>
										{
											run.status === 'completed' || run.status === 'error' ?
											<TableCell align="left">
												<Link href={`${run.url}`}>View details</Link>
											</TableCell>
											:
											<TableCell align="left">{run.url}</TableCell>
										}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</>
				:
				<>
					<Card>
						<CardContent>
							<Typography variant="subtitle1" component="span">
								No runs found
							</Typography>
						</CardContent>
					</Card>
				</>
			}
		</div>
	)
}