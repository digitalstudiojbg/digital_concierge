import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Dropzone from "react-dropzone";

export default class UploadFileDropZone extends Component {
    render() {
        return (
            <div>
                <Mutation mutation={UPLOAD_FILES}>
                    {(uploadFiles, { loading, error }) => (
                        <div>
                            <Dropzone
                                onDrop={(files, rejectedFiles) => {
                                    console.log(files);
                                    uploadFiles({ variables: { files } });
                                }}
                            >
                                <React.Fragment>
                                    <div>
                                        <input />
                                        <p>Drop files here...</p>
                                    </div>
                                </React.Fragment>
                            </Dropzone>
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
