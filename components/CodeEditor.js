import Editor, { Monaco } from "@monaco-editor/react";
import React, { useRef, useState, useEffect } from 'react'
import IconButton from '@mui/material/Button'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CircularProgress, Toolbar } from '@mui/material'
import { Replay, Refresh } from '@mui/icons-material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

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

const CodeEditor = props => {

  const [isEditorReady, setIsEditorReady] = useState(false)
  const [cnt, setCnt] = useState(0)
  const [runResult, setRunResult] = useState(null)
  const [running, setRunning] = useState(false)
  const [sectionProgress, setSectionProgress] = useState(null)

	const [editor, setEditor] = useState(null)
	const monacoEl = useRef(null)

  let valueGetter = useRef()

  // useEffect(() => {
  //   setSectionProgress(props.chapter_progress.sections.find(section => section.section_id.$oid === props.section_id.$oid))
  // }, [])

  const handleEditorDidMount = (_valueGetter) => {
    setIsEditorReady(true)
    valueGetter.current = _valueGetter
  }

  const runCode = () => {
    console.log(valueGetter.current())
    setRunning(true)
    axios.post(`/api/v1/sections/run_code`, { "code": valueGetter.current() })
    .then(res => {
      setRunResult(res.data)
      console.log(res.data)
      props.runResult(res.data)
      setRunning(false)
    })
    .catch(err => {
      setRunning(false)
      console.log(err)
    })
  }

  const reset = () => {
    setCnt(cnt + 1)
  }

  return (
    <>
      {/* <div className={classes.title}>
        <Typography variant="subtitle2" style={{fontWeight: 'bold'}}>solution.py</Typography>
      </div> */}
      <Editor
        key={cnt}
        height="48vh"
        language="python" 
        value={['\ndef x() {', '\tprint("Hello world!");', '}'].join('\n')}
        editorDidMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          "fontSize": '16px'
        }}
      />
      <Toolbar style={{minHeight: '50px'}}>
        <IconButton disabled={!isEditorReady || running} className={!isEditorReady || running ? classes.replayDisable : classes.replay} aria-label="刷新">
          <Replay onClick={reset} />
        </IconButton>
        {
          !isEditorReady || running ?
          <div className={classes.root}>
            <div className={classes.wrapper}>
              <Button 
                variant="outlined" 
                disabled
                className={classes.disabledButton}
              >
                运行中...
              </Button>
              <CircularProgress size={20} className={classes.buttonProgress} />
            </div>
          </div>
          :
          <Button 
            variant="outlined" 
            onClick={runCode}
            className={classes.button}
          >
            Run
          </Button>
        }
      </Toolbar>
    </>
  );
};

export default CodeEditor;