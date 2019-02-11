import React from "react";
import MediaLibrary from "../../../utils/MediaLibrary";
import { getCurrentUserQuery as query } from "../../../data/query";
import { withApollo } from "react-apollo";

class WizardCreateClientPageSix extends React.Component {
    render() {
        const { getCurrentUser: user } = this.props.client.readQuery({ query });

        return (
            <div>
                {user.client && (
                    <MediaLibrary
                        clientId={parseInt(user.client.id)}
                        height={"60vh"}
                    />
                )}
            </div>
        );
    }
}

export default withApollo(WizardCreateClientPageSix);
