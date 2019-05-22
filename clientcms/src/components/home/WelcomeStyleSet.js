import React from "react";
import styled from "styled-components";

//---- WelcomeAccountClient

export const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

export const SectionDiv = styled.div`
    width: ${props => props.width};
    height: 80vh;
    padding: 2%;
    border: ${props => (props.noBorder ? "none" : "2px solid #9D9D9D")};
    border-radius: 5px;
    //  background-color: white;
    margin-right: ${props => (Boolean(props.isLastSection) ? "0px" : "10px")};
`;

export const TitleDiv = styled.h4`
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 20px;
    color: #2699fb;
`;

export const ClientContainerDiv = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: ${props => (Boolean(props.isLastItem) ? "0px" : "20px")};
`;

export const ClientFieldDiv = styled.div`
    flex-basis: ${props => props.flexBasis};
    margin-right: ${props => props.marginRight};
`;

export const FieldContainerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const FieldDiv = styled.div`
    width: 100%;
    padding: 10px;
`;

export const ContactEntryContainerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    //  border: 2px solid black;
    margin-bottom: ${props => (Boolean(props.isLastItem) ? "0px" : "20px")};
    padding: 10px;
`;

export const ContactEntryHeaderContainerDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

export const ContactEntryHeaderTitleDiv = styled.div`
    font-size: 1.5em;
    font-weight: 700;
    padding-right: 5px;
`;

export const FieldLabel = styled.div`
    color: #5c5c5c;
    fontsize: 10px;
    marginbottom: 5px;
`;
