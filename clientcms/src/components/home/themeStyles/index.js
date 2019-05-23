import styled from "styled-components";

export const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 50px;
`;

export const ThemeContainerDiv = styled.div`
    width: 70%;
    height: 100%;
    padding-bottom: 20px;
    border-right: 1px solid black;
`;

export const EntryThemeContainerDiv = styled.div`
    width: 50%;
    display: flex;
    padding-bottom: 10px;
`;

export const ColourThemeContainerDiv = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    padding: 10px;
    border: 2px solid black;
`;

export const EntryThemeDiv = styled.div`
    width: 45%;
    padding-right: 10px;
`;

export const LayoutContainerDiv = styled.div`
    width: 30%;
    height: 100%;
    padding-left: 10px;
`;

export const LayoutEntryContainerDiv = styled.div`
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    display: flex;
`;

export const LayoutEntryDropdownDiv = styled.div`
    width: 70%;
    height: 100%;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const LayoutEntryPreviewDiv = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    border: 1px solid black;
    margin: 5;
`;

export const LayoutEntryPreviewImage = styled.img`
    width: 100%;
`;

export const ColourEntryContainerDiv = styled.div`
    width: 150px;
    height: 150px;
    padding-top: 5px;
    padding-bottom: 5px;
    border: 1px solid black;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ColourEntryDiv = styled.div`
    width: 80px;
    height: 80px;
    border: 2px solid black;
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
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
`;
export const FieldLabel = styled.div`
    color: #5c5c5c;
    fontsize: 10px;
    marginbottom: 5px;
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
