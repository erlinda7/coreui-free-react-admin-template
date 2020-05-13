import React, { Component } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

//import {stateFromHTML} from 'draft-js-import-html'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


import { db } from '../../../services/firebase/setup'


class Draft extends Component {
  constructor(props) {
    super(props);
    // this.state = { editorState: EditorState.createEmpty() }
    const rawJsText = `{
      "entityMap": {},
      "blocks": [
        {
          "key": "e4brl",
          "text": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [
            {
              "offset": 0,
              "length": 11,
              "style": "BOLD"
            },
            {
              "offset": 28,
              "length": 29,
              "style": "BOLD"
            },
            {
              "offset": 12,
              "length": 15,
              "style": "ITALIC"
            },
            {
              "offset": 28,
              "length": 28,
              "style": "ITALIC"
            }
          ],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "3bflg",
          "text": "Aenean commodo ligula eget dolor.",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        }
      ]
    }`;
    const content  = convertFromRaw(JSON.parse(rawJsText));
    this.state = { editorState: EditorState.createWithContent(content) }
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