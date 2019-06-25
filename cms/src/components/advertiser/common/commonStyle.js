import styled from "styled-components";

export const ContainerDiv = styled.div`
    width: 100%;
    display: flex;
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
export const SectionHeader = styled.h4`
    text-align: left;
    color: #2699fb;
    font-size: 20px;
    padding: 0px;
`;
export const FieldLabel = styled.div`
    font-size: 10px;
    margin-bottom: 2px;
    color: #5c5c5c;
    text-transform: uppercase;
`;
export const FieldContainerDiv = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    margin-bottom: 5px;
`;

export const MainSections = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`;

export const SubSectionDiv = styled.div`
    margin: 5px 0;

    // display: flex;
`;

export const SectionContactTitleDiv = styled(SectionHeader)`
    width: 100%;
    display: flex;
    align-items: center;
`;

export const FieldDivEqual = styled.div`
    flex: 1;
    padding-right: ${props => props.paddingRight};
`;

export const FieldDiv = styled.div`
    flex-basis: ${props => props.flexBasis};
    margin-right: ${props => props.marginRight};
`;

export const ContactEntryContainerDiv = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
    padding-right: 10px;
    padding-left: 10px;
`;

export const AddressContainerDiv = styled.div`
    flex-basis: 100%;
    margin-right: ${props => props.marginRight};
    padding: 2%;
    // border: 1px solid #707070;
`;

export const AddressSectionTitleDiv = styled.div`
    color: #2699fb;
    font-size: 1.4em;
    font-weight: 600;
    padding-bottom: 10px;
`;
