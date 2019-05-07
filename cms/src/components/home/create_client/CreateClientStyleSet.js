import React from "react";
import styled from "styled-components";


export const ContainerDiv = styled.div`
width: 100%;
height: 100%;
display: flex;
`;

export const SectionDiv = styled.div`
width: ${props => props.width};
height: ${props => (Boolean(props.height) ? props.height : "100%")};
display: flex;
flex-direction: column;
padding:0 4%;
border-right: 1px solid #DDDDDD; 
`;

export const ClientFieldContainerDiv = styled.div`
width: 100%;
display: flex;
flex-wrap: wrap;
justify-content: center;
`;

export const ClientFieldDiv = styled.div`
padding :0;
`;

export const FieldContainerDiv = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;

export const FieldDiv = styled.div`
width: 100%;
padding: 0px;

`;
export const FieldLabel = styled.label`
font-size: 10px;
color:#5C5C5C;
`;

export const SubFieldContainerDiv = styled.div`
width : 100%;
flex-basis: ${props => props.flexBasis};
margin-right: ${props => props.marginRight};
padding-top: 10px;
`;

export const SectionHeader = styled.h4`
text-align: left;
color: #2699FB;
`;

export const BrowseButton = styled.label`
    border: 3px solid #2699FB;
    display: inline-block;
    width: 40%;
    margin-left:60%;
    text-align: center;
    cursor: pointer;
    padding: 10px 5px;
    font-size: 14px
    color: #2699FB;
    border-radius: 5px;
    variant: outlined;
    component: span;
    &:hover {
        font-weight: bold;
    }
`;

export const FiledContainer = styled.div`
  //  padding-bottom: 20px;
`;

export const ContinueButton = styled.button`
type: submit;
width:  25%;
padding: 15px 5px;
color: white;
background: #2699FB;
border: 20px solid #313131;
`;


