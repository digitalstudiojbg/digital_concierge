import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Dropzone from "react-dropzone";

export default class UploadFileDropZone extends Component {
    state = {
        image_name: null
    };

    render() {
        const { image_name } = this.state;
        return (
            <div>
                <Mutation mutation={UPLOAD_FILES}>
                    {(uploadFiles, { loading, error }) => (
                        <div>
                            <Dropzone
                                onDrop={(files, rejectedFiles) => {
                                    console.log(files);

                                    uploadFiles({ variables: { files } });

                                    this.setState({
                                        image_name: files[0].name
                                    });
                                }}
                            >
                                <React.Fragment>
                                    <div>
                                        <input />
                                        <p>Drop files here...</p>
                                    </div>
                                </React.Fragment>
                            </Dropzone>
                            {image_name && <p>{image_name}</p>}
                            {loading && <p>Loading...</p>}
                            {error && <p>Error :( Please try again</p>}
                        </div>
                    )}
                </Mutation>
            </div>
        );
    }
}

const UPLOAD_FILES = gql`
    mutation uploadFiles($files: [Upload!]!) {
        uploadFiles(files: $files) {
            filename
        }
    }
`;
