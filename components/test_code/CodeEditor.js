import Editor, { Monaco } from "@monaco-editor/react";
import React, { useRef, useState, useEffect } from 'react'
import { IconButton, Button, CircularProgress, Toolbar, Modal, Box, Typography, Tooltip } from '@mui/material'
import { Replay, Refresh, DirectionsRun, Settings, Save } from '@mui/icons-material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { LoadingButton } from '@mui/lab'

import TestConfigForm from './TestConfigForm';

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

export default function CodeEditor({template, saveCode}) {

  const [isEditorReady, setIsEditorReady] = useState(false)
  const [runResult, setRunResult] = useState(null)
  const [running, setRunning] = useState(false)
  const [isConfigured, setIsConfigured] = useState(false)

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

  const runCode = () => {

    console.log(config)
    console.log(editorRef.current.getValue())
    setRunning(true)

    // TODO: Send config and code to backend API for testing
    // axios.post(url, { "code": editorRef.current.getValue() })
    // .then(res => {
    //   setRunResult(res.data)
    //   props.runResult(res.data)
    //   setRunning(false)
    // })
    // .catch(err => {
    //   setRunning(false)
    // })
  }

  const reset = () => {
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
          <TestConfigForm config={config} saveConfig={saveConfig} />
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
      <IconButton variant="contained" color="warning" disabled={!isEditorReady || running} aria-label="refresh" sx={{my: 1, ml: 2}} onClick={reset}>
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
    </>
  );
};