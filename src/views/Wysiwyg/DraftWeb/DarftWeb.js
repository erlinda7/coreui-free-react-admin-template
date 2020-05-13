import React, { Component } from 'react';

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import { convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import { db } from '../../../services/firebase/setup'

class DraftWeb extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contenS:''
        }
    }

    async componentDidMount() {

        const docRef = await db.collection("draft2").doc("32twWPBBmex2jyN2ROrc")
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
        // this.setState(docRef)
        const c = convertFromRaw(JSON.parse(docRef.contenS))
        const html = { contenS: draftToHtml(convertToRaw(c)) }
        this.setState(html)
    }



    render() {
        console.log('statehtml', this.state.contenS);
        return (
            <div>
                <h1>desde firebase</h1>
                <div >
                    {

                        this.state.contenS?
                            <div>{ReactHtmlParser(this.state.contenS)}</div>
                            : <p>Loading...</p>
                    }
                </div>
            </div>
        )

    }
}

export default DraftWeb