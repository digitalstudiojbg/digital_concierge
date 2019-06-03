import React, { useState, lazy, Suspense } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Stepper, Step, StepLabel } from "@material-ui/core";
import { isEmpty } from "lodash";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitleHelper from "../../../utils/DialogTitleHelper";
import { SlideUpTransition } from "../../../utils/Constants";

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

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
`;

const HeaderContainerDiv = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
`;

const HeaderTitleDiv = styled.div`
    width: 90%;
    /* font-size: 2em; */
    padding-top: 20px;
    padding-bottom: 20px;
    /* display: flex; */
`;

const HeaderButtonDiv = styled.div`
    width: 10%;
    height: 70px;
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
    const { goToNext, push, exitUrl, has_data } = props;

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

    const closeModal = () => setShowModal(false);

    const SelectedComponent = array_components[activeStep].component;
    return (
        <React.Fragment>
            <ContainerDiv>
                <HeaderContainerDiv>
                    <HeaderTitleDiv>
                        <div style={{ fontSize: "2em", fontWeight: 700 }}>
                            Just Brilliant Guides
                        </div>
                        <div style={{ fontSize: "1.5em", paddingTop: 10 }}>
                            {has_data
                                ? "Edit Advertiser"
                                : "Add new Advertiser"}
                        </div>
                    </HeaderTitleDiv>
                    <HeaderButtonDiv>
                        <Button
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
                            Cancel
                        </Button>
                    </HeaderButtonDiv>
                </HeaderContainerDiv>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {array_components.map(({ title }, index) => {
                        const props = {};
                        const labelProps = {};
                        return (
                            <Step key={`${index} -${title}`} {...props}>
                                <StepLabel {...labelProps}>{title}</StepLabel>
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
            </ContainerDiv>
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

export default ModifyAdvertiser;
