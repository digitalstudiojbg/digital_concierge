import React, { Component, lazy, Suspense } from "react";
import { withApollo, compose, graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CANCEL_CLIENT } from "../../../data/mutation";
import { getNewCreatedClientId } from "../../../data/query";
import { WELCOME_URL } from "../../../utils/Constants";
// import MultipleMutationAndQueryExample from "./MultipleMutationAndQueryExample";

const NewClientSetupTitleContainer = styled.div`
    width: 100%;
    display: flex;
`;

const NewClientSetupTitle = styled.h4`
    padding-top: 15px;
    font-size: 28px;
    font-weight: bold;
    font-family: Source Sans Pro;
`;

const CancelButtonContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const styles = theme => ({
    root: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#F4F4F4",
        height: "100%"
    },
    button: {
        marginRight: theme.spacing.unit
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    unCompletedIcon: {
        color: "white",
        border: "2px solid #DDDDDD",
        borderRadius: "50%",
        fontColor: "black"
    },
    completedIcon: {
        color: "#2699FB !important",
        border: "2px solid #2699FB"

        // alternativeLabel: {
        //     color: "red !important"
        // }
    },
    activeIcon: {
        color: "white !important",
        border: "2px solid #2699FB",
        borderRadius: "50%",
        StepConnector: "blue"
        // alternativeLabel: {
        //     color: "#2699FB !important"
        // }
    },
    topButtons: {
        width: "80px",
        color: "white",
        backgroundColor: "#595959",
        marginLeft: "10px",
        borderRadius: "5px",
        boxShadow: "2px 2px 3px #888888"
    }
});

const WizardInitialPage = lazy(() => import("./WizardInitialPage"));

const array_components = [
    {
        component: lazy(() => import("./WizardCreateClientPageOne")),
        title: "1.Client",
        inStepper: true
    },
    {
        component: lazy(() => import("./WizardCreateClientPageTwo")),
        title: "2.Account set-up",
        inStepper: true
    },
    {
        component: lazy(() => import("./WizardCreateClientPageThree")),
        title: "3.Structure",
        inStepper: true
    },
    {
        component: lazy(() => import("./WizardCreateClientPageFour")),
        title: "4.System",
        inStepper: true
    },
    {
        component: lazy(() => import("./WizardCreateClientPageFive")),
        title: "5.Theme",
        inStepper: true
    },
    {
        component: lazy(() => import("./WizardCreateClientPageSix")),
        title: "6.Media",
        inStepper: true
    }
];

class CreateClient extends Component {
    state = {
        activeStep: -1
    };

    handleNext = () => {
        const { activeStep } = this.state;

        this.setState({
            activeStep: Math.min(activeStep + 1, array_components.length - 1)
        });
    };
    handleBack = () => {
        const { activeStep } = this.state;

        this.setState({
            activeStep: activeStep - 1
        });
    };

    // handlePrev = () => {
    //     const { activeStep } = this.state;

    //     this.setState({
    //         activeStep: Math.max(activeStep - 1, array_components.length + 1)
    //     });
    // };

    handleCancel = () => {
        const { cancelClient, client, history } = this.props;
        const { activeStep } = this.state;

        let new_create_client_id = null;

        if (activeStep > 0) {
            //Only try to get client ID from cache after the first step (which is creating the client)
            try {
                new_create_client_id = client.readQuery({
                    query: getNewCreatedClientId
                }).new_create_client_id;
                console.log("Cache Client ID: ", new_create_client_id);
            } catch {
                console.log("Unable to get cache Client ID");
            }
        }

        //If client ID from cache cannot be retrieved, just redirect to welcome page url
        Boolean(cancelClient) && Boolean(new_create_client_id)
            ? cancelClient({ variables: { id: new_create_client_id } }).then(
                  () => {
                      history.push(WELCOME_URL + "/dashboard");
                  }
              )
            : history.push(WELCOME_URL + "/dashboard");
    };

    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;
        const SelectedComponent =
            activeStep === -1
                ? WizardInitialPage
                : array_components[activeStep].component;

        return (
            <div className={classes.root}>
                {activeStep > -1 && (
                    <div
                        style={{ width: "100%", height: 250, padding: "2% 4%" }}
                    >
                        <NewClientSetupTitleContainer>
                            <NewClientSetupTitle>
                                New Client Setup
                            </NewClientSetupTitle>
                            <CancelButtonContainer>
                                <Button
                                    className={classes.topButtons}
                                    variant="outlined"
                                    onClick={this.handleCancel}
                                >
                                    CANCEL
                                </Button>
                                <Button
                                    className={classes.topButtons}
                                    variant="outlined"
                                    onClick={this.handleBack}
                                >
                                    BACK
                                </Button>
                            </CancelButtonContainer>
                        </NewClientSetupTitleContainer>
                        <Stepper
                            activeStep={activeStep}
                            alternativeLabel
                            style={{
                                // marginLeft: "50px",
                                backgroundColor: "#F4F4F4"
                            }}
                        >
                            {array_components
                                .filter(({ inStepper }) => Boolean(inStepper))
                                .map(({ title }) => {
                                    const props = {};
                                    const labelProps = {};
                                    return (
                                        <Step key={title} {...props}>
                                            <StepLabel
                                                {...labelProps}
                                                StepIconProps={{
                                                    classes: {
                                                        root:
                                                            classes.unCompletedIcon,
                                                        completed:
                                                            classes.completedIcon,
                                                        active:
                                                            classes.activeIcon
                                                    }
                                                }}
                                            >
                                                {title}
                                            </StepLabel>
                                        </Step>
                                    );
                                })}
                        </Stepper>
                    </div>
                )}

                <Suspense>
                    <SelectedComponent next={this.handleNext} />
                </Suspense>

                {/* <div>
                    <div>
                        <Suspense>
                            <SelectedComponent next={this.handleNext} />
                        </Suspense>
                        <div style={{ display: "flex" }}>
                            <div style={{ paddingBottom: 10 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handlePrev}
                                    className={classes.button}
                                    disabled={activeStep === 0}
                                >
                                    Back
                                </Button>
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === array_components.length - 1
                                        ? "Finish"
                                        : "Next"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/*activeStep !== 5 && (
                    <button
                        style={{
                            height: "50px",
                            width: "200px",
                            marginTop: "15px"
                        }}
                        onClick={() => {
                            this.setState({ activeStep: 5 });
                        }}
                    >
                        <h1>GO TO STEP 6 (MEDIA) </h1>
                    </button>
                    )*/}
                {/* <MultipleMutationAndQueryExample /> */}
            </div>
        );
    }
}

CreateClient.propTypes = {
    classes: PropTypes.object
};

export default compose(
    withApollo,
    withRouter,
    withStyles(styles),
    graphql(CANCEL_CLIENT, { name: "cancelClient" })
)(CreateClient);
