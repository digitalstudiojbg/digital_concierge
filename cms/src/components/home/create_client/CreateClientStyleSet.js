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
    padding: 0 4%;
    // border-right: 1px solid #DDDDDD;
`;

export const ClientFieldContainerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const ClientFieldDiv = styled.div`
    padding: 0;
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
    color: #5c5c5c;
`;

export const SubFieldContainerDiv = styled.div`
    width: 100%;
    flex-basis: ${props => props.flexBasis};
    margin-right: ${props => props.marginRight};
    padding-top: 10px;
`;

export const SectionHeader = styled.h4`
    text-align: left;
    color: #2699fb;
    font-size: 20px;
    padding: 0px;
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
       background-color: #EBEBF2;
    }
`;

export const FiledContainer = styled.div`
    //  padding-bottom: 20px;
`;

export const ContinueButton = styled.button`
    type: submit;
    width: 25%;
    padding: 15px 5px;
    color: white;
    background: #2699fb;
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
    border: 1px solid #9d9d9d;
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
    marginleft: 0px;
    padding: 0px;
`;
export const AllPermissionContainerDiv = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    border: 1px solid #9d9d9d;
    padding: 3px;
    background-color: #f7f7f7;
`;
export const AllPermissionFooterContainerDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    color: #2699fb;
`;
export const PermissionFooterEntryDiv = styled.span`
    width: 45%;
    display: flex;
    margin-right: 5px;
    justify-content: center;
    // border: 1px solid #2699fb;
`;

//-------page4------

export const FeatureContainer = styled.div`
    display: flex;
    font-size: 14px;
    transition: all 0.3s ease-in-out;
    align-items: center;
    border-radius: 5px;
    width: 100%;
    // &:hover {
    //     background-color: lightgrey;
    // }
`;

export const SelectUnselectButton = styled.p`
    width: 50%;
    display: flex;
    color: #2699fb;
    padding: 10px 0 0 5px;
    font-size: 10px;
    cursor: pointer;
    &:hover {
        font-weight: bold;
    }
`;

export const EachClientSystemContainer = styled.div`
    width: 200px;
    height: 180px;
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    position: relative;
    // &:hover {
    //     background-color: lightgrey;
    // }
`;

export const EachClientSystemContainerSystemText = styled.p`
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 14px;
`;

export const EachClientSystemContainerDeviceTypeText = styled.p`
    margin-bottom: 5px;
    color: grey;
    font-size: 12px;
`;

//---page5- SetupClientThemeAndlayout.js

export const ThemeContainerDiv = styled.div`
    width: 60%;
    height: 100%;
    padding-bottom: 20px;
    border-right: 1px solid #dddddd;
`;

export const EntryThemeContainerDiv = styled.div`
    width: 80%;
    display: flex;
    padding-bottom: 10px;
`;

export const ColourThemeContainerDiv = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    padding: 10px;
    border: 2px solid #dddddd;
`;

export const EntryThemeDiv = styled.div`
    width: 45%;
    padding-right: 10px;
`;

export const LayoutContainerDiv = styled.div`
    width: 40%;
    height: 100%;
    padding-left: 5%;
`;

export const LayoutEntryContainerDiv = styled.div`
    width: 100%;
    margin-bottom: 10%;
`;

export const LayoutEntryDropdownDiv = styled.div`
    width: 60%;
    height: 120px;
    float: left;
    margin-bottom: 1%;
`;

export const LayoutEntryPreviewDiv = styled.div`
    align-items: center;
    border: 1px solid #dddddd;
    padding: 5px;
    width: 30%;
    height: 100px;
    float: right;
    margin-top: 20px;
`;

export const LayoutEntryPreviewImage = styled.img`
    width: 90%;
    margin: 5%;
`;

export const ColourEntryContainerDiv = styled.div`
    width: 150px;
    height: 150px;
    padding-top: 5px;
    padding-bottom: 5px;
    border: 1px solid #dddddd;
    //  margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ColourEntryDiv = styled.div`
    width: 80px;
    height: 80px;
    border: 2px solid #DDDDDD;
    margin-bottom: 10px;
    /* background-color: ${props =>
        Boolean(props.color) ? props.colour : "white"}; */
`;

export const ColourTitleDiv = styled.div`
    width: 90%;
    border-bottom: 2px solid black;
    font-weight: 700;
`;

export const ButtonContainerDiv = styled.div`
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
`;

//-----page6

export const EachMediaSection = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0 0 0;
    padding: 5px;
    height: 240px;
    width: 19%;
    justify-content: space-between;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: #fff0f5;
    }
`;
export const PaginationSection = styled.li`
    display: inline;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: lightgrey;
    }
`;

export const PaginationSectionDot = styled.li`
    display: inline;
    padding: 10px;
`;

export const ImageLinkText = styled.a`
    cursor: pointer;
    color: blue;
    &:hover {
        font-weight: bold;
    }
`;

export const UploadDeleteButton = styled.label`
    border: 3px solid #2699fb;
    display: inline-block;
    width: 200px;
    text-align: center;
    cursor: pointer;
    padding: 7px 5px;
    font-size: 14px;
    color: #2699fb;
    border-radius: 5px;
    margin: 10px;
    &:hover {
        font-weight: bold;
    }
`;