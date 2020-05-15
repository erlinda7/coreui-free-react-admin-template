import React, { Component } from "react"
import { convertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { db } from '../../../services/firebase/setup'

const content = {
  "entityMap": {},
  "blocks": [
    {
      "key": "637gr",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    }
  ]
};

class Draft extends Component {
  constructor(props) {
    super(props);
    const contentState = convertFromRaw(content);
    const editorState = EditorState.createWithContent(contentState);
    this.state = {
      contentState,
      editorState
    }
  }

  onContentStateChange = (contentState) => {
    this.setState({
      contentState,
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  async componentDidMount() {

    const docRef = await db.collection("settings").doc("termsOfService")
      .get().then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          return doc.data()
        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
      
      if(Object.keys(docRef).length !== 0 ){
        this.setState({ 
          editorState: EditorState.createWithContent(convertFromRaw(docRef.content)),
        })
      }
 
  }
  enviarDatos = async () => {
    const { contentState } = this.state;
    await db
      .collection('settings')
      .doc('termsOfService')
      .update({ content: JSON.parse(JSON.stringify(contentState)) })
      .then(function () {
        console.log("Document successfully updated!");
      })

  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          onContentStateChange={this.onContentStateChange}
        />
        <button onClick={this.enviarDatos}>Enviar</button>
        {/* <textarea rows="50" cols="130"
          disabled
          value={JSON.stringify(this.state.contentState, null, 4)}
        /> */}
      </div>
    );
  }
}

export default Draft