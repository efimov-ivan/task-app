import React, {useState, useEffect} from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function MyEditor({setFormValues, formValues}) {
  
  let defaultContent = ''
  if(formValues.content === ''){
    defaultContent = EditorState.createEmpty()
  } else {
    defaultContent = EditorState.createWithContent(convertFromRaw(JSON.parse(formValues.content)))
  }
  
  const [editorState, setEditorState] = useState(defaultContent)

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    setFormValues({...formValues, content: JSON.stringify(convertToRaw(contentState))})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorState])

  return <Editor
          editorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            options: ['inline', 'list', 'textAlign'],
            inline: {
              superscript: {className: 'hidden'},
              subscript: {className: 'hidden'}
            },
            list: {
              indent: {className: 'hidden'},
              outdent: {className: 'hidden'}
            },
            textAlign: {
              options: ['left', 'center', 'right'],
            }
          }}
          onEditorStateChange={setEditorState}
        />
}

export default MyEditor