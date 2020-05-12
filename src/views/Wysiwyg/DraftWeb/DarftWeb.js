import React, { Component } from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';


import { db } from '../../../services/firebase/setup'

class DraftWeb extends Component {
    constructor(props) {
        super(props);

        this.state = {}
        this.convertCommentFromJSONToHTML = this.convertCommentFromJSONToHTML.bind(this)

    }

    convertCommentFromJSONToHTML = (text) => {
        return stateToHTML(convertFromRaw(JSON.parse(text)))
    }

    async componentDidMount() {
        const docRef = await db.collection("draft3").doc("UWNLIiJYpeiNksaHFvKu")

            .get().then(function (doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    return doc.data()
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        this.setState(docRef)
        // console.log('convert', this.convertCommentFromJSONToHTML(docRef));
    }

    render() {
        const { editorState } = this.state;
        if (this.state.infJSON) {
            console.log(this.state.infJSON);
            // console.log(stateToHTML(convertFromRaw(JSON.parse(this.state.infJSON))));
          //  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));


        }

        return (
            <div>
                <h1>desde firebase</h1>
                <div>
                    {/* <textarea rows="20" cols="100"
                        disabled
                        value={this.state.infJSON ? draftToHtml(convertToRaw(editorState.infJSON.getCurrentContent())):''}
                    /> */}
                </div>

            </div>
        )

    }
}

export default DraftWeb