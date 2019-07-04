import styled from "styled-components";

export const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 3%;
`;

export const SectionDiv = styled.div`
    flex-basis: ${props => props.flexBasis};
    display: flex;
    flex-direction: ${props => props.flexDirection};
    padding-right: ${props => props.paddingRight};
`;

export const SectionTitleDiv = styled.div`
    color: rgb(38, 153, 251);
    font-size: 1.7em;
    font-weight: 600;
    padding-bottom: 20px;
`;

export const FormLabelDiv = styled.div`
    color: rgb(92, 92, 92);
    font-size: 0.8em;
`;

export const ContinueButton = styled.button`
    width: ${props => (props.width ? props.width : "25%")};
    padding: 20px 5px;
    color: white;
    background: #2699fb;
    border: 20px solid #313131;
`;

export const FieldContainerDiv = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: ${props =>
        Boolean(props.justifyContent) ? props.justifyContent : "flex-start"};
    margin-bottom: 20px;
`;

export const FieldDiv = styled.div`
    flex-basis: ${props => props.flexBasis};
    margin-right: ${props => props.marginRight};
`;
export const SectionHeader = styled.h4`
    text-align: left;
    color: #2699fb;
    font-size: 20px;
    padding: 0px;
`;
