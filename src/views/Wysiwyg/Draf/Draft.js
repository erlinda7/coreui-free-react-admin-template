import React, { Component } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

//import {stateFromHTML} from 'draft-js-import-html'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


import { db } from '../../../services/firebase/setup'


class Draft extends Component {
  constructor(props) {
    super(props);
    // this.state = { editorState: EditorState.createEmpty() }
    
    const plainText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
    const content = ContentState.createFromText(plainText);
    this.state= {editorState: EditorState.createWithContent(content)}
   // this.enviarDatos = this.enviarDatos.bind(this)
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  // enviarDatos = async () => {
  //   const { editorState } = this.state;
  //   const parrafo = draftToHtml(convertToRaw(editorState.getCurrentContent()))
  //   console.log('enviando', { parrafo: parrafo });
  //   await db
  //     .collection('draftHtml')
  //     .add({ parrafo: parrafo })
  //     .then(function (docRef) {
  //       console.log("Document written with ID: ", docRef.id);
  //     })
  //     .catch(function (error) {
  //       console.error("Error adding document: ", error);
  //     });
  // }




  render() {
    const { editorState } = this.state;

   // console.log('editorState', draftToHtml(convertToRaw(editorState.getCurrentContent())));
    return (

      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea rows="10" cols="100"
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}

        {/* <button onClick={this.enviarDatos}>Enviar</button> */}


      </div>
    );
  }
}

export default Draft