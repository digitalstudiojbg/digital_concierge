import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export default class UploadFile extends Component {
    render() {
        return (
            <div>
                <Mutation mutation={UPLOAD_FILE}>
                    {(uploadFile, { loading, error }) => (
                        <div>
                            <input
                                type="file"
                                required
                                accept=".png,.jpg"
                                onChange={({
                                    target: {
                                        validity,
                                        files: [file]
                                    }
                                }) => {
                                    console.log(file);
                                    uploadFile({ variables: { file } });
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

const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!) {
        uploadFile(file: $file) {
            filename
        }
    }
`;
