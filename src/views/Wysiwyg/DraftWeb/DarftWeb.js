import React, { Component } from 'react';


import { db } from '../../../services/firebase/setup'

class DraftWeb extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    async componentDidMount() {
        const docRef = await db.collection("draftHtml").doc("wyf3gfXgNfB75Z6szMIA")
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
        console.log('state', this.state);
       

        return (
            <div>
                <h1>desde firebase</h1>
                <div>
                {this.state.parrafo ? this.state.parrafo.map(p=>(<div>p</div>)):<h1>No existe</h1>}
                </div>

            </div>
        )

    }
}

export default DraftWeb