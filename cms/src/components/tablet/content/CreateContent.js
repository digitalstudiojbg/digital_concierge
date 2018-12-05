import styled from 'styled-components';
import React from 'react';
import { ContainerDiv, TABLET_CMS_CREATE_CONTENT_CATEGORY_URL, TABLET_CMS_CREATE_CONTENT_SUBCATEGORY_URL, TABLET_CMS_CREATE_CONTENT_DIRECTORY_URL } from '../../../utils/Constants';
import ForwardIcon from "@material-ui/icons/ArrowForwardIos";

const CreateContainerDiv = styled.a`
    color: rgb(37,40,94);
    font-size: 1.7vw;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 50%;
    border-top: ${props => Boolean(props.hasBorderTop) ? "1px solid rgb(218,218,218)" : "none"};
    border-bottom: 1px solid rgb(218,218,218);
    display: flex;
    align-items: center;
    text-decoration: none;
`;

const TextContainer = styled.div`
    width: 97%;
`;
const ForwardIconContainer = styled.div`
    width: 3%;
`;

export const CreateContent = (props) => (
    <ContainerDiv>
        <div style={{fontSize: "2.5vw"}}>CREATE</div>
        <div style={{fontSize: "1vw", marginBottom: 40}}>FOLLOW THESE EASY STEPS TO CALCULATE CATEGORIES, SUB-CATEGORIES, AND DIRECTORIES</div>
        <CreateContainerDiv hasBorderTop href={TABLET_CMS_CREATE_CONTENT_CATEGORY_URL}>
            <TextContainer>CATEGORY</TextContainer>
            <ForwardIconContainer><ForwardIcon /></ForwardIconContainer>
        </CreateContainerDiv>
        <CreateContainerDiv href={TABLET_CMS_CREATE_CONTENT_SUBCATEGORY_URL}>
            <TextContainer>SUB-CATEGORY</TextContainer>
            <ForwardIconContainer><ForwardIcon /></ForwardIconContainer>
        </CreateContainerDiv>
        <CreateContainerDiv href={TABLET_CMS_CREATE_CONTENT_DIRECTORY_URL}>
            <TextContainer>DIRECTORY</TextContainer>
            <ForwardIconContainer><ForwardIcon /></ForwardIconContainer>
        </CreateContainerDiv>
        <CreateContainerDiv>
            <TextContainer>GALLERY PAGE</TextContainer>
            <ForwardIconContainer><ForwardIcon /></ForwardIconContainer>
        </CreateContainerDiv>
    </ContainerDiv>
)

export default CreateContent