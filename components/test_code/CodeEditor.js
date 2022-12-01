import Editor, { Monaco } from "@monaco-editor/react";
import React, { useRef, useState, useEffect } from 'react'
import { IconButton, Button, Snackbar, Toolbar, Modal, Box, Typography, Tooltip } from '@mui/material'
import { Replay, Refresh, DirectionsRun, Settings, Save } from '@mui/icons-material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { LoadingButton } from '@mui/lab'

import TestConfigForm from './TestConfigForm';
import TestRunsTable from './TestRunsTable';

const theme = createTheme({
  palette: {
  },
});

const classes = {
  title: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    color: 'white',
  },
  bottom: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  replay: {
    color: 'white',
    '&:hover': {
      // color: "rgba(3,239,98,0.8)",
      boxShadow: 'none',
    },
  },
  replayDisable: {
    color: 'white!important',
    opacity: 0.4
  },
  button: {
    marginRight: theme.spacing(2),
    border: "1px solid #7986cb",
    color: "#7986cb",
    '&:hover': {
      boxShadow: 'none',
      opacity: 0.8
    },
  },
  disabledButton: {
    marginRight: theme.spacing(2),
    border: "1px solid #7986cb!important",
    color: '#7986cb!important',
    opacity: 0.4,
    width: '90px'
  },
  submitbutton: {
    marginRight: theme.spacing(2),
    backgroundColor: "#3f51b5",
    color: 'white',
    width: '90px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: "#5c6bc0",
    },
  },
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: '#3f51b5',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  grow: {
    flexGrow: 1,
  }
};

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  boxShadow: 10,
  p: 4,
};

export default function CodeEditor({template, test_id, saveCode}) {

  const [isEditorReady, setIsEditorReady] = useState(false)
  const [runs, setRuns] = useState([
    {job_id: 'xsreeeeee11231', status: 'running', started_at: '13:40', completed_at: '15:80', url: ''},
    {job_id: 'xsreeeeee11231', status: 'running', started_at: '13:40', completed_at: '15:80', url: ''},
    {job_id: 'xsreeeeee11231', status: 'error', started_at: '13:40', completed_at: '15:80', url: ''},
    {job_id: 'xsreeeeee11231', status: 'completed', started_at: '13:40', completed_at: '15:80', url: 'http://linktoresult.com'}
  ])
  const [running, setRunning] = useState(false)
  const [isConfigured, setIsConfigured] = useState(false)
  const [timer, setTimer] = useState(null)

  const editorRef = useRef(null)

  const handleEditorDidMount = (editor, monaco) => {
    setIsEditorReady(true)
    editorRef.current = editor;
  }

  const [open, setOpen] = useState(false) // open config form
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
	
	const [config, setConfig] = useState(null) // config: conda_env, transponder_url
	const saveConfig = (config) => {
		setConfig(config)
    setIsConfigured(true)
    handleClose()
	}

  const runCode = async () => {
    setRunning(true)
    config['code'] = editorRef.current.getValue()
    config['type'] = "testing" // mark current run is for testing only and differentiate from actual runs

    // TODO: submit to backend for testing
    // config: {conda_env: '', type: 'testing', transponder_url: '', params: [{name: '', value: ''}], code: ''}
    // should return job_id from the api
    // runTestCode(config)
    setRunning(false)
  }

  useEffect(() => {
    fetchRuns()
  }, [])

  useEffect(() => {
    return () => {
      // Destroy timer to stop fetching runs
      clearInterval(timer)
    }
  }, [timer])

  const fetchRuns = () => {
    // check result every 5s
    var tm = setInterval(async () => {
      // TODO: fetch all testing runs for current test from server
      // const rs = await getRuns(test_id, 'testing')
      // setRuns(rs)
    }, 5000);
    setTimer(tm)
  }

  const reset = () => {
    setConfig(null)
    setIsConfigured(false)
    editorRef.current.setValue(template)
  }

  const saveTestCode = () => {
    setRunning(true)
    saveCode(editorRef.current.getValue())
  }

  return (
    <>
      <Editor
        height="60vh"
        defaultLanguage="python"
        defaultValue={template}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          "fontSize": '16px',
        }}
      />
      <Button variant="outlined" disabled={!isEditorReady || running} startIcon={<Settings />} onClick={handleOpen} sx={{my: 1, mr: 1}}>
				Testing Config
			</Button>
			<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="new-test-code"
        aria-describedby="new-test-code"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Testing Configuration
          </Typography>
          <TestConfigForm config={config} saveConfig={saveConfig} handleClose={handleClose} />
        </Box>
      </Modal>
      {
        running ?
        <LoadingButton
          loading
          variant="contained"
        >
          Running...
        </LoadingButton>
        :
        isEditorReady && isConfigured ?
        <Button
          variant="contained" 
          onClick={runCode}
          startIcon={<DirectionsRun />}
        >
          Test
        </Button>
        :
        <Tooltip title="Missing configurations">
          <span>
            <Button
              disabled
              variant="contained" 
              startIcon={<DirectionsRun />}
              >
              Test
            </Button>
          </span>
        </Tooltip>
      }
      <IconButton variant="contained" color="warning" disabled={!isEditorReady || running} aria-label="refresh" sx={{my: 1, ml: 2}} onClick={() => {
        if(window.confirm('Reset all?')) { 
          reset()
        }
      }}>
        <Replay />
      </IconButton>
      <Button
        variant="contained"
        sx={{my: 1, ml: 2}}
        onClick={saveTestCode}
        disabled={!isEditorReady || running}
        startIcon={<Save />}
      >
        Save
      </Button>
      <Snackbar
        open={running}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Submitted successfully"
      />
      <TestRunsTable runs={runs} />
    </>
  );
};