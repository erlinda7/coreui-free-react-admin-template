import React, { Component } from "react"
import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


import { db } from '../../../services/firebase/setup'

const content = { "entityMap": {}, "blocks": [{ "key": "637gr", "text": "Initialized from content state.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }] };

class Draft extends Component {
  constructor(props) {
    super(props);
    const contentState = convertFromRaw(content);
    this.state = {
      contentState,
      prueba: [],
    }
 //   this.enviarDatos = this.enviarDatos.bind(this)
  }

  onContentStateChange = (contentState) => {
    this.setState({
      contentState,
    });
  };

  // enviarDatos = async (contenS) => {
  //   console.log(contenS);
    
  //   const data = { nombre: 'probando', edad: '557575' }
  //   await db
  //     .collection('draft')
  //     .add({contenS})
  //     .then(function (docRef) {
  //       console.log("Document written with ID: ", docRef.id);
  //     })
  //     .catch(function (error) {
  //       console.error("Error adding document: ", error);
  //     });
  // }

  importar = async ()=>{
    db.collection('draft2')
    .onSnapshot((onSnapshot) => {
      const docs = [];
      onSnapshot.forEach((doc) => {   //snapshot es un objeto con muchas propiedades
        const data = doc.data();

        docs.push({
          ...data,
          id: doc.id,
        });
      });
      console.log('db-importado', docs);

      this.setState({
        importado: docs
      })
    });
  }


  render() {
    const { contentState } = this.state;
    
    return (
      <div>
        <Editor
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          onContentStateChange={this.onContentStateChange}
        />
        <textarea rows="50" cols="130"
          disabled
          value={JSON.stringify(contentState, null, 4)}
        />

        {/* <button onChange={this.enviarDatos(JSON.stringify(contentState, null, 4))}>Enviar</button> */}


      </div>
    );
  }
}

export default Draft