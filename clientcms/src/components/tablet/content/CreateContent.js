import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { ContainerDiv, TABLET_CMS_CREATE_CONTENT_CATEGORY_URL, TABLET_CMS_CREATE_CONTENT_SUBCATEGORY_URL, TABLET_CMS_CREATE_CONTENT_DIRECTORY_URL } from '../../../utils/Constants';
import ForwardIcon from "@material-ui/icons/ArrowForwardIos";

const CreateContainerDiv = styled.div`
    color: rgb(37,40,94);
    font-size: 1.9em;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 50%;
    border-top: ${props => Boolean(props.hasBorderTop) ? "1px solid rgb(218,218,218)" : "none"};
    border-bottom: 1px solid rgb(218,218,218);
    display: flex;
    align-items: center;
`;

const TextContainer = styled.div`
    width: 97%;
`;
const ForwardIconContainer = styled.div`
    width: 3%;
`;

export const CreateContent = (props) => (
    <ContainerDiv>
        <div style={{fontSize: "2.7em"}}>CREATE</div>
        <div style={{fontSize: "1.2em", marginBottom: 40}}>FOLLOW THESE EASY STEPS TO CALCULATE CATEGORIES, SUB-CATEGORIES, AND DIRECTORIES</div>
        <Link to={TABLET_CMS_CREATE_CONTENT_CATEGORY_URL} style={{textDecoration: "none"}}>
            <CreateContainerDiv hasBorderTop>
                <TextContainer>CATEGORY</TextContainer>
                <ForwardIconContainer><ForwardIcon /></ForwardIconContainer>
            </CreateContainerDiv>
        </Link>
        <Link to={TABLET_CMS_CREATE_CONTENT_SUBCATEGORY_URL} style={{textDecoration: "none"}}>
            <CreateContainerDiv>
                <TextContainer>SUB-CATEGORY</TextContainer>
                <ForwardIconContainer><ForwardIcon /></ForwardIconContainer>
            </CreateContainerDiv>
        </Link>
        <Link to={TABLET_CMS_CREATE_CONTENT_DIRECTORY_URL} style={{textDecoration: "none"}}>
            <CreateContainerDiv>
                <TextContainer>DIRECTORY</TextContainer>
                <ForwardIconContainer><ForwardIcon /></ForwardIconContainer>
            </CreateContainerDiv>
        </Link>
        <Link to={TABLET_CMS_CREATE_CONTENT_DIRECTORY_URL} style={{textDecoration: "none"}}>{/*TODO: CHANGE URL FOR CREATE GALLERY PAGE*/}
            <CreateContainerDiv>
                <TextContainer>GALLERY PAGE</TextContainer>
                <ForwardIconContainer><ForwardIcon /></ForwardIconContainer>
            </CreateContainerDiv>
        </Link>
    </ContainerDiv>
)

export default CreateContent