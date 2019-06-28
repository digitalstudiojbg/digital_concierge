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

export const PageHeader = styled.h2`
    fontsize: 30px;
    padding-bottom: 2%;
`;
export const SubSectionTop = styled.div`
    display: flex;
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
    // width: ${props => (props.width ? props.width : "25%")};
   
    type: submit;
    width: 15%;
    position: fixed;
    bottom: 0;
    padding: 20px 5px;
    color: white;
    background: #2699fb;
    border: 20px solid #313131;
    border-radius: 5px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
`;

export const AddressContainerDiv = styled.div`
    // margin-right: ${props => props.marginRight};
    // padding: 2%;
`;
export const ContactFirstRow = styled.div`
   // padding-right: ${props => props.paddingRight};
    flex-basis: 49%;
    padding-right:2%;
`;

export const AddressSectionTitleDiv = styled.div`
    font-size: 14px;
    font-weight: 700;
    padding-bottom: 10px;
`;

export const HeaderContainerDiv = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
`;

export const HeaderTitleDiv = styled.div`
    width: 90%;
    padding-top: 20px;
    padding-bottom: 20px;
`;

export const HeaderButtonDiv = styled.div`
    width: 10%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const ContentContainer = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
`;

export const ContainerDivModified = styled(ContainerDiv)`
    padding-left: 20px;
    padding-right: 20px;
`;

export const SectionDivModified = styled(SectionDiv)`
    border-left: ${props =>
        props.withBorderLeft ? "1px solid #DDDDDD" : "none"};
    border-right: ${props =>
        props.withBorderRight ? "1px solid #DDDDDD" : "none"};
    padding-left: ${props => props.paddingLeft};
`;
