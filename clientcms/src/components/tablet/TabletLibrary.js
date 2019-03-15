import React from "react";
import { Query } from "react-apollo";
import { getSystemDetailSidebar } from "../../data/query";
import Loading from "../loading/Loading";
import Library from "../../utils/MediaLibrary";

export const TabletLibrary = ({ match }) => (
    <Query
        query={getSystemDetailSidebar}
        variables={{ id: match.params.system_id }}
        fetchPolicy="no-cache"
    >
        {({ loading, error, data: { system } }) => {
            if (loading) return <Loading loadingData />;
            if (error)
                return <React.Fragment>ERROR: {error.message}</React.Fragment>;
            const { client = {} } = system || {};
            const { id: clientId = "" } = client;
            return <Library clientId={clientId} height="80vh" />;
        }}
    </Query>
);

export default TabletLibrary;
