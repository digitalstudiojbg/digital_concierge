import React from 'react';
import Query from "react-apollo/Query";
import { withRouter } from "react-router-dom";
import { getSystemDetail } from "../../data/query";

const withClientId = Component => withRouter(
    React.memo((props) => {
        const { system_id } = props.match.params;

        return (
            <Query
                query={getSystemDetail}
                variables={{ id: system_id }}
            >
                {({ data: { system: data } }) => (
                    <Component
                        {...props}
                        clientId={data && data.client && Number(data.client.id)}
                    />
                )}
            </Query>
        )
    })
);

export default withClientId;
