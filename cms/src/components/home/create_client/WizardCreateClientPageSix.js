import React from "react";
import MediaLibrary from "../../../utils/MediaLibrary";
import { getCurrentUserQuery as query } from "../../../data/query";
import { withApollo } from "react-apollo";
import { getNewCreatedClientId } from "../../../data/query";
import Loading from "../../loading/Loading";

class WizardCreateClientPageSix extends React.Component {
    render() {
        const { client } = this.props;
        const { getCurrentUser: user } = client.readQuery({ query });

        let new_create_client_id;
        try {
            new_create_client_id = client.readQuery({
                query: getNewCreatedClientId
            }).new_create_client_id;
        } catch {
            return (
                <React.Fragment>
                    <h1>Can't Find ClientId From Step 1</h1>
                    <Loading />
                </React.Fragment>
            );
        }

        return (
            <div>
                {user.client && (
                    <MediaLibrary
                        clientId={parseInt(new_create_client_id)}
                        height={"60vh"}
                    />
                )}
            </div>
        );
    }
}

export default withApollo(WizardCreateClientPageSix);
