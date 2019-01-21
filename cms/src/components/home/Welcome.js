import React, { Component } from "react";
import "./Welcome.css";
import { getCurrentUserQuery as query } from "../../data/query";
import { withApollo } from "react-apollo";
import { Query } from "react-apollo";

import { gql } from "apollo-boost";

const CURRENT_SYSTEM = gql`
    {
        currentSystem @client
    }
`;

class Welcome extends Component {
    render() {
        const { client } = this.props;
        const { getCurrentUser: user } = client.readQuery({
            query
        });

        return (
            <div
                style={{
                    width: "100vw",
                    height: `calc(100vh - 80px)`,
                    position: "relative",
                    backgroundColor: "rgb(247,247,247)"
                }}
            >
                WELCOME PAGE
                {user.client.systems.map(system => {
                    return (
                        <h3
                            key={system.id}
                            onClick={() => {
                                client.writeData({
                                    data: { currentSystem: system.name }
                                });
                            }}
                        >
                            {system.id} {system.name}
                        </h3>
                    );
                })}
                <Query query={CURRENT_SYSTEM}>
                    {({ data }, client) => {
                        const { currentSystem } = data;
                        return currentSystem ? (
                            <h1>Current System:{currentSystem} </h1>
                        ) : (
                            <h1>Current System: No System For You</h1>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default withApollo(Welcome);
