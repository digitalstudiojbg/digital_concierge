import React, { useState, lazy, Suspense } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Query, withApollo, Mutation, gql } from "react-apollo";
import PropTypes from "prop-types";
import {
    Button,
    Stepper,
    Step,
    StepLabel,
    StepButton
} from "@material-ui/core";
import { isEmpty } from "lodash";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitleHelper from "../../../utils/DialogTitleHelper";
import { SlideUpTransition } from "../../../utils/Constants";

const styles = theme => ({
    root: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#F4F4F4",
        height: "100%"
    },
    buttonCancel: {
        backgroundColor: "#595959",
        color: "white",
        fontFamily: "Source Sans Pro, sans-serif",
        margin: "2%",
        padding: "3% 0",
        width: "150px",
        boxShadow: "2px 2px 3px #888888"
    },
    unCompletedIcon: {
        color: "#DDDDDD",
        border: "2px solid #DDDDDD",
        borderRadius: "50%",
        fontColor: "black"
    },
    completedIcon: {
        color: "#2699FB",
        border: "2px solid #2699FB"
    },
    activeIcon: {
        color: "white !important",
        border: "2px solid #2699FB",
        borderRadius: "50%",
        StepConnector: "blue"
    }
});

const array_components = [
    {
        component: lazy(() => import("./StepAdvertiser")),
        title: "Advertiser"
    },
    {
        component: lazy(() => import("./StepContract")),
        title: "Contract"
    },
    {
        component: lazy(() => import("./StepArtwork")),
        title: "Artwork"
    }
];

const MainSectionContainer = styled.div`
    width: 100%;
    height: 100%;

    padding: 3%;
`;
const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
`;

const HeaderContainerDiv = styled.h2`
    width: 80%;
    height: 70px;
    display: flex;
    padding: 3%;
`;
const SubSectionTop = styled.div`
    display: flex;
`;

const HeaderTitleDiv = styled.div`
    width: 80%;
`;

const HeaderButtonDiv = styled.div`
    // width: 10%;
    display: flex;
    //  height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const ContentContainer = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
`;

const ModifyAdvertiser = props => {
    const { goToNext, push, exitUrl, has_data, classes } = props;

    const [activeStep, setActiveStep] = useState(goToNext ? 1 : 0);
    const [showModal, setShowModal] = useState(false);
    let currentComponentFormikRef = React.createRef();

    const handleNext = () =>
        setActiveStep(Math.min(activeStep + 1, array_components.length - 1));

    // const handlePrev = () => setActiveStep(Math.max(activeStep - 1, 0));

    const safeToExit = () =>
        Boolean(currentComponentFormikRef) &&
        Boolean(currentComponentFormikRef.state) &&
        !Boolean(currentComponentFormikRef.state.isSubmitting) &&
        isEmpty(currentComponentFormikRef.state.touched);

    const goBack = () => push(exitUrl);

    const handleCancel = () => {
        if (safeToExit()) {
            goBack();
        } else {
            setShowModal(true);
        }
    };

    const handleStep = step => () => {
        setActiveStep(step);
    };

    const closeModal = () => setShowModal(false);
    // const { classes } = this.props;

    const SelectedComponent = array_components[activeStep].component;
    //  const className = "";
    return (
        <React.Fragment>
            <MainSectionContainer className={classes.root}>
                <SubSectionTop>
                    <HeaderTitleDiv>
                        <h2
                            style={{
                                fontSize: "30px",
                                paddingBottom: "2%",
                                display: "inline-Block"
                            }}
                        >
                            Just Brilliant Guides
                        </h2>
                        <h2
                            style={{
                                fontSize: "30px",
                                paddingBottom: "2%",
                                display: "inline-Block"
                            }}
                        >
                            {has_data && !goToNext
                                ? ": Edit Advertiser"
                                : ": Add  Advertiser"}
                        </h2>
                    </HeaderTitleDiv>
                    <HeaderButtonDiv>
                        <Button
                            className={classes.buttonCancel}
                            variant="outlined"
                            onClick={handleCancel}
                            disabled={
                                Boolean(currentComponentFormikRef) &&
                                Boolean(currentComponentFormikRef.state) &&
                                Boolean(
                                    currentComponentFormikRef.state.isSubmitting
                                )
                            }
                        >
                            CANCEL
                        </Button>
                    </HeaderButtonDiv>
                </SubSectionTop>
                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    nonLinear={has_data && !goToNext}
                    style={{
                        //  marginLeft: "50px",
                        backgroundColor: "#F4F4F4"
                    }}
                >
                    {array_components.map(({ title }, index) => {
                        const props = {};
                        const labelProps = {};

                        return (
                            <Step key={`${index} -${title}`} {...props}>
                                {has_data && !goToNext ? (
                                    <StepButton onClick={handleStep(index)}>
                                        <StepLabel
                                            {...labelProps}
                                            StepIconProps={{
                                                classes: {
                                                    root:
                                                        classes.unCompletedIcon,

                                                    completed:
                                                        classes.completedIcon,
                                                    active: classes.activeIcon
                                                }
                                            }}
                                        >
                                            {title}
                                        </StepLabel>
                                    </StepButton>
                                ) : (
                                    <StepLabel {...labelProps}>
                                        {title}
                                    </StepLabel>
                                )}
                            </Step>
                        );
                    })}
                </Stepper>
                <ContentContainer>
                    <Suspense>
                        <SelectedComponent
                            next={handleNext}
                            onRef={ref => (currentComponentFormikRef = ref)}
                            {...props}
                        />
                    </Suspense>
                </ContentContainer>
            </MainSectionContainer>
            <Dialog
                open={showModal}
                TransitionComponent={SlideUpTransition}
                keepMounted
                onClose={closeModal}
            >
                <DialogTitleHelper onClose={closeModal}>
                    CONFIRM PAGE NAVIGATION
                </DialogTitleHelper>
                <DialogContent>
                    <DialogContentText component="div">
                        <div
                            style={{
                                paddingTop: 10
                            }}
                        >
                            ARE YOU SURE YOU WANT TO LEAVE THIS PAGE?
                        </div>
                        <div>YOU HAVE UNSAVED CHANGES.</div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={goBack}>
                        LEAVE
                    </Button>
                    <Button color="primary" onClick={closeModal}>
                        STAY
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

ModifyAdvertiser.propTypes = {
    has_data: PropTypes.bool.isRequired,
    advertiserId: PropTypes.string,
    exitUrl: PropTypes.string
};

export default withApollo(withStyles(styles)(ModifyAdvertiser));
