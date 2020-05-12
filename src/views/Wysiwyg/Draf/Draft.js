import React, { Component } from "react"
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


import { db } from '../../../services/firebase/setup'


class Draft extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() }
    //   this.enviarDatos = this.enviarDatos.bind(this)
  }

  onChange = (editorState) => this.setState({ editorState });

  // enviarDatos = async (infJSON) => {

  //   await db
  //     .collection('draft3')
  //     .add({ infJSON })
  //     .then(function (docRef) {
  //       console.log("Document written with ID: ", docRef.id);
  //     })
  //     .catch(function (error) {
  //       console.error("Error adding document: ", error);
  //     });
  // }




  render() {
    console.log('convert', convertToRaw(this.state.editorState.getCurrentContent()));
    const infJSON = convertToRaw(this.state.editorState.getCurrentContent())
    return (

      <div>
        <Editor
          editorState={this.state.editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          onEditorStateChange={this.onChange}
        />
        <textarea rows="50" cols="130"
          disabled
          value={JSON.stringify(this.state.editorState, null, 4)}
        />

        {/* <button onChange={this.enviarDatos(infJSON)}>Enviar</button> */}


      </div>
    );
  }
}

export default Draft