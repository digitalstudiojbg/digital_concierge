import React from 'react';
import Query from "react-apollo/Query";
import { getCurrentUserQuery } from "../../data/query";

const withClientId = (Component) => React.memo((props) => (
    <Query query={getCurrentUserQuery}>
        {({ data: { getCurrentUser: data } }) => (
            <Component {...props} clientId={data.client && Number(data.client.id)} />
        )}
    </Query>
));

export default withClientId;
