import React from "react";
import MediaLibrary from "../../../utils/MediaLibrary";
import { getCurrentUserQuery as query } from "../../../data/query";
import { withApollo } from "react-apollo";
import { getNewCreatedClientId } from "../../../data/query";
import Loading from "../../loading/Loading";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { WELCOME_URL } from "../../../utils/Constants";
//import { ContinueButton } from "./CreateClientStyleSet";

import {
    SectionDiv,
    ContinueButton,
    ContinueButtonContainer
} from "./CreateClientStyleSet";

class WizardCreateClientPageSix extends React.Component {
    navigateToDashboard = () => {
        const { history } = this.props;
        history.push(WELCOME_URL);
    };

    render() {
        const { client } = this.props;
        const { getCurrentUser: user } = client.readQuery({ query });

        let new_create_client_id;
        //let new_create_client_id = 1;
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

                <SectionDiv
                    style={{
                        width: "100%",
                        height: "100px",
                        border: "0px",
                        padding: "0px"
                    }}
                >
                    <ContinueButtonContainer
                    // style={{
                    //     // flex: 1,
                    //     display: "flex",
                    //     flexDirection: "column",
                    //     justifyContent: "flex-end",
                    //     alignItems: "flex-end"
                    // }}
                    >
                        <ContinueButton
                            variant="contained"
                            color="primary"
                            onClick={this.navigateToDashboard}
                        >
                            CONFIRM & COMPLETE SETUP
                        </ContinueButton>
                    </ContinueButtonContainer>
                </SectionDiv>
                <div style={{ clear: "both" }} />
            </div>
        );
    }
}

export default withApollo(withRouter(WizardCreateClientPageSix));
