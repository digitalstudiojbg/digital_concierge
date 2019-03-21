import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { WELCOME_URL } from "../../../utils/Constants";
import { withStyles } from "@material-ui/core/styles";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
`;

const CancelButtonContainerDiv = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const ContentContainerDiv = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TitleDiv = styled.div`
    font-size: 3em;
    color: black;
    display: flex;
    align-items: center;
    margin-bottom: 100px;
`;

const HighlightSpan = styled.span`
    font-size: 2em;
    font-weight: 700;
    padding-left: 10px;
`;

const StartSetupButtonContainerDiv = styled.div`
    width: 30%;
`;

const styles = () => ({
    startSetupButton: {
        height: 50,
        fontSize: "1.5em"
    }
});

export const WizardInitialPage = ({ next, history, classes }) => {
    const cancelCreate = () => {
        history.push(WELCOME_URL);
    };
    return (
        <ContainerDiv>
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
                        color="primary"
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
