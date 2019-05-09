import React, { useState, lazy, Suspense } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Stepper, Step, StepLabel } from "@material-ui/core";

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
`;

const HeaderContainerDiv = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
`;

const HeaderTitleDiv = styled.div`
    width: 90%;
    font-size: 2em;
    font-weight: 700;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
`;

const HeaderButtonDiv = styled.div`
    width: 10%;
    height: 60px;
    display: flex;
    align-items: center;
`;

const ContentContainer = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
`;

const ModifyAdvertiser = ({ has_data, advertiserId, goBack, exitUrl }) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () =>
        setActiveStep(Math.min(activeStep + 1, array_components.length - 1));

    // const handlePrev = () => setActiveStep(Math.max(activeStep - 1, 0));

    const SelectedComponent = array_components[activeStep].component;
    return (
        <ContainerDiv>
            <HeaderContainerDiv>
                <HeaderTitleDiv>Just Brilliant Guides</HeaderTitleDiv>
                <HeaderButtonDiv>
                    <Button variant="outlined">Cancel</Button>
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
                    <SelectedComponent next={handleNext} />
                </Suspense>
            </ContentContainer>
        </ContainerDiv>
    );
};

ModifyAdvertiser.propTypes = {
    has_data: PropTypes.bool.isRequired,
    advertiserId: PropTypes.string,
    goBack: PropTypes.func,
    exitUrl: PropTypes.string
};

export default ModifyAdvertiser;
