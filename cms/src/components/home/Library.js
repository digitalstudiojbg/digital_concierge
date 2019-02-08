import React from "react";
import MediaLibrary from "./create_client/two/MediaLibrary";
import { getCurrentUserQuery as query } from "../../data/query";
import { withApollo } from "react-apollo";

class Library extends React.Component {
    render() {
        const { getCurrentUser: user } = this.props.client.readQuery({ query });

        return (
            <div style={{ width: "100%", padding: "25px" }}>
                <h1>Library</h1>
                {user.client && (
                    <MediaLibrary
                        clientId={parseInt(user.client.id)}
                        height={"70vh"}
                    />
                )}
            </div>
        );
    }
}

export default withApollo(Library);
