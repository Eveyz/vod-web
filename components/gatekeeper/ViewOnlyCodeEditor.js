import Editor, { Monaco } from "@monaco-editor/react";
import React, { useRef, useState } from 'react'

export default function ViewOnlyCodeEditor({code}) {

  const [isEditorReady, setIsEditorReady] = useState(false)

  const editorRef = useRef(null)

  const handleEditorDidMount = (editor, monaco) => {
    setIsEditorReady(true)
    editorRef.current = editor;
  }

  return (
    <>
      <Editor
        height="60vh"
        defaultLanguage="python"
        defaultValue={code}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          "fontSize": '16px',
          "readOnly": true
        }}
      />
    </>
  );
};