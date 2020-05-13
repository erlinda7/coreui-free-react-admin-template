import React, { Component } from 'react';


import { db } from '../../../services/firebase/setup'

class DraftWeb extends Component {
    constructor(props) {
        super(props);

        this.state = {
            parrafo: '',
        }
    }

    async componentDidMount() {

        const docRef = await db.collection("draftHtml").doc("wyf3gfXgNfB75Z6szMIA")
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
        this.setState(docRef)
    }

    render() {
        console.log('state', this.state.parrafo);
        return (
            <div>
                <h1>desde firebase</h1>
                <div >
                    {
                        this.state.parrafo? <div
                        dangerouslySetInnerHTML={{
                            __html: this.state.parrafo
                        }}></div>
                        :<p>Loading....</p>
                    }
                </div>
            </div>
        )

    }
}

export default DraftWeb