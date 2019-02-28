import React from "react";
import MediaLibrary from "../../../utils/MediaLibrary";
import { getCurrentUserQuery as query } from "../../../data/query";
import { withApollo } from "react-apollo";
import { getNewCreatedClientId } from "../../../data/query";
import Loading from "../../loading/Loading";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { WELCOME_URL } from "../../../utils/Constants";

class WizardCreateClientPageSix extends React.Component {
    navigateToDashboard = () => {
        const { history } = this.props;
        history.push(WELCOME_URL);
    };

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
                <div
                    style={{
                        width: "100%",
                        paddingTop: 20,
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.navigateToDashboard}
                    >
                        Confirm & Complete Setup
                    </Button>
                </div>
            </div>
        );
    }
}

export default withApollo(withRouter(WizardCreateClientPageSix));
