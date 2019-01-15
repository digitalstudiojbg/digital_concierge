import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export default class UploadFiles extends Component {
    render() {
        return (
            <div>
                <Mutation mutation={UPLOAD_FILES}>
                    {(uploadFiles, { loading, error }) => (
                        <div>
                            <input
                                type="file"
                                multiple
                                required
                                onChange={({ target: { validity, files } }) => {
                                    console.log(files);
                                    uploadFiles({ variables: { files } });
                                }}
                            />
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
