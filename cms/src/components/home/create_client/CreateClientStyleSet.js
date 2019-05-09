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
// border-right: 1px solid #DDDDDD; 
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
export const NormalButton = styled.button`
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


//----page3----

export const SectionDivContainer = styled.div`
    width: 50%;
    height: 100%;
    padding: 10px;
`;

export const DepartmentSectionDiv = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
`;

export const RoleSectionDiv = styled.div`
    width: 100%;
    height: 60%;
    display: flex;
`;

export const RolePermissionContainerDiv = styled.div`
    width: 100%;
    height: 500px;
    overflow-y: scroll;
    border: 1px solid black;
`;

export const EachRolePermissionContainerDiv = styled.div`
    width: 100%;
    //height: 50%;
    display: flex;
    padding: 10px;
`;
export const EachRoleContainerDiv = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: left;
    marginLeft: 0px;
    padding:0px;
`;
export const AllPermissionContainerDiv = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    border: 1px solid #9D9D9D;
    padding: 3px;
    background-color: #F7F7F7;
`;
export const AllPermissionFooterContainerDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    color: blue;
`;
export const PermissionFooterEntryDiv = styled.span`
    width: 45%;
    display: flex;
    margin-right: 5px;
    justify-content: center;
    border: 1px solid blue;
`;
