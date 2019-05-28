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
    border: ${props => (props.noBorder ? "none" : "1px solid #9D9D9D")};
    border-radius: 5px;
    //  background-color: white;
    margin-right: ${props => (Boolean(props.isLastSection) ? "0px" : "10px")};
`;

export const SubSectionDiv = styled.div`
    margin-top: 10px;
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
    padding: 10px 0;
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
    marginbottom: 10px;
`;

export const SectionHeader = styled.h4`
    text-align: left;
    color: #2699fb;
    font-size: 20px;
    padding: 0px;
    width: 100%;
`;

//---WelcomeTheme

export const ThemeContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    padding: 3%;
    //  border-right: 1px solid black;
`;

export const EntryThemeContainerDiv = styled.div`
    //  display: flex;
    padding-bottom: 10px;
`;

export const SubSectionTheme = styled.div`
    width: 100%;
`;

export const ColourThemeContainerDiv = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    padding: 10px;
    border: 2px solid #9d9d9d;
`;

export const EntryThemeDiv = styled.div`
    width: 100%;
    padding-right: 10px;
    flex: left;
`;

export const LayoutContainerDiv = styled.div`
    //  height: 100%;
    padding-left: 10px;
`;

export const LayoutEntryContainerDiv = styled.div`
    height: 120px;
    margin-bottom: 10px;
    display: flex;
    flex: left;
`;

export const LayoutEntryDropdownDiv = styled.div`
    width: 45%;
    height: 100%;
    margin-right: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const LayoutEntryPreviewDiv = styled.div`
    flex: 1;
    display: flex;
    //  align-items: center;
    //  border: 1px solid #9d9d9d;
    //  margin: 5;
`;

export const LayoutEntryPreviewImage = styled.img`
    // width: 30%;
    height: 120px;
    margin: 1%;
    flex: left;
    border: 1px solid #9d9d9d;
    padding: 5px;
`;

export const ColourEntryContainerDiv = styled.div`
    width: 150px;
    height: 150px;
    padding-top: 5px;
    padding-bottom: 5px;
    border: 1px solid #9d9d9d;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ColourEntryDiv = styled.div`
    width: 80px;
    height: 80px;
    border: 2px solid #9D9D9D;
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
    // height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const NUMBER_OF_COLOURS_PER_SYSTEM = 5;

export const FONT_OPTIONS = [
    {
        text: "Source Sans Pro Black",
        value: "Source Sans Pro Black"
    },
    {
        text: "Source Sans Pro Bold",
        value: "Source Sans Pro Bold"
    },
    {
        text: "Source Sans Pro Regular",
        value: "Source Sans Pro Regular"
    },
    {
        text: "Source Sans Pro Light",
        value: "Source Sans Pro Light"
    },
    {
        text: "Times New Roman",
        value: "Times New Roman"
    },
    {
        text: "Comic Sans MS",
        value: "Comic Sans MS"
    }
];

//--- WelcomeUserCreate

export const FiledContainer = styled.div`
    padding-bottom: 20px;
`;

export const BrowseButton = styled.label`
    border: 3px solid rgb(64, 84, 178);
    display: inline-block;
    width: 100%;
    text-align: center;
    cursor: pointer;
    padding: 5px;
    font-size: 1.3em;
    color: rgb(64, 84, 178);
    border-radius: 5px;
    &:hover {
        font-weight: bold;
    }
`;

export const SelectAndUnselectAll = styled.div`
    width: 50%;
    cursor: pointer;
    &:hover {
        font-weight: bold;
    }
`;

export const SubContainerDiv = styled.div`
    width: 33%;
    padding: 20px;
`;

//----------

export const SidebarContainer = styled.div``;

export const SidebarItem = styled.div`
    display: flex;
    align-items: center;
    padding-left: ${props => props.paddingLeft};
    height: 60px;
    transition: all 0.3s linear;
    width:100%;

  background-color: ${({ selectedItem, expectedItem }) =>
      selectedItem === expectedItem && "rgb(43,43,43)"}; 
    

    color: ${({ selectedItem, expectedItem }) =>
        selectedItem === expectedItem && "rgb(234,234,234)"};

    &:hover {
        background-color: white;
        color: black;
    }

    background-image: ${({ selectedItem, expectedItem }) =>
        selectedItem === expectedItem &&
        "linear-gradient(to bottom,rgb(43,43,43) 0%, rgb(43,43,43) 100%),linear-gradient(to bottom, rgb(0,0,0) 0%, rgb(0,0,0) 100%)"};
 

    background-clip: ${({ selectedItem, expectedItem }) =>
        selectedItem === expectedItem && " content-box , padding-box"};
   
 /* justify-content: ${props => (props.center ? "center" : "stretch")}; */
`;

export const SidebarLabel = styled.div`
    font-size: 18px;
    /* font-weight: 700; */
    padding-left: 10px;
    padding-top: 0x;
    padding-bottom: 0px;
`;

export const ClientAvatarDiv = styled.div`
    height: 80%;
    padding: 10%;
    background-image: url(${props => props.imageUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: white;
`;
