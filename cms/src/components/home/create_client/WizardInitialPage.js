import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { WELCOME_URL } from "../../../utils/Constants";
import { withStyles } from "@material-ui/core/styles";

import {
    ContainerDiv,
    CancelButtonContainerDiv,
    ContentContainerDiv,
    TitleDiv,
    HighlightSpan,
    StartSetupButtonContainerDiv
} from "./CreateClientStyleSet";

const styles = () => ({
    startSetupButton: {
        //  height: 50,
        color: "white",
        backgroundColor: "#2699FB",
        fontSize: "20px",
        padding: "3% 5%",
        margin: "0 10%",
        width: "80%"
        // &:active{ backgroundColor: "red" }
    }
});

export const WizardInitialPage = ({ next, history, classes }) => {
    const cancelCreate = () => {
        history.push(WELCOME_URL + "/dashboard");
    };
    return (
        <ContainerDiv style={{ display: "inline-block", height: "100vh" }}>
            <CancelButtonContainerDiv>
                <Button variant="outlined" onClick={cancelCreate}>
                    CANCEL
                </Button>
            </CancelButtonContainerDiv>
            <ContentContainerDiv>
                <TitleDiv>
                    NEW CLIENT <HighlightSpan>SETUP</HighlightSpan>
                </TitleDiv>
                <StartSetupButtonContainerDiv>
                    <Button
                        onClick={next}
                        fullWidth={true}
                        variant="contained"
                        // color="#2699FB"
                        className={classes.startSetupButton}
                    >
                        START SETUP
                    </Button>
                </StartSetupButtonContainerDiv>
            </ContentContainerDiv>
        </ContainerDiv>
    );
};

export default withRouter(withStyles(styles)(WizardInitialPage));
