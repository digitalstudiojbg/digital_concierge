import React from "react";
import styled from "styled-components";

export const CancelButtonContainerDiv = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 4% 8%;
`;
export const TopButtonsContainer = styled.div`
    width: 12%;
    display: flex;
    flex-direction: column;
`;
export const MainSectionContainer = styled.div`
    width: 100%;
    height: 100%;

    padding: 3%;
`;

export const ContainerDivTab = styled.div`
    width: 100%;
    overflow-y: auto;
    height: 80vh;
`;
export const SubSectionTop = styled.div`
    display: flex;
`;
export const ContentContainerDiv = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const PageHeader = styled.h2`
    fontsize: 30px;
    padding-bottom: 2%;
`;

export const TitleDiv = styled.div`
    font-size: 30px;
    color: black;
    display: flex;
    align-items: center;
    margin-bottom: 100px;
`;

export const HighlightSpan = styled.span`
    font-size: 60px;
    font-weight: 700;
    padding-left: 10px;
`;

export const StartSetupButtonContainerDiv = styled.div`
    width: 30%;
`;

//---------------

export const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    // height: 60vh;
`;

export const FirstSectionContainerDiv = styled.div`
    flex: 1;
    padding-right: 20px;
`;

export const SecondSectionContainerDiv = styled.div`
    flex: 2;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const SecondSectionInnerContainer = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
`;

export const SecondSectionInnerInnerContainer = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
`;

export const SectionTitleDiv = styled.div`
    color: rgb(38, 153, 251);
    font-size: 1.4em;
    font-weight: 600;
    padding-bottom: 20px;
`;

export const FieldLabel = styled.div`
    font-size: 10px;
    margin-bottom: 2px;
    color: #5c5c5c;
    text-transform: uppercase;
`;

export const FormHelperError = styled.p`
    margin-top: 8px;
    font-size: 0.75rem;
    line-height: 1em;
    color: #f44336;
`;
