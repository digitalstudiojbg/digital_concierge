import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import LayoutPicker from "../../../utils/LayoutPicker";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import styled from "styled-components";
import { getDirectoryListBySystem } from "../../../data/query";
import Loading from "../../loading/Loading";
import {
    modifyDirectoryListData,
    SORT_BY_ORDER_BY_OPTIONS
} from "../../../utils/Constants";
import TreeviewSelector from "../../../utils/TreeviewSelector";
import { Dropdown } from "semantic-ui-react";
import {
    SectionHeader,
    MainSubSections,
    ContainerDiv,
    FieldLabel,
    SubContainerDiv,
    SubSectionDiv,
    FieldDiv
} from "../../home/WelcomeStyleSet";

// const SubtitleDiv = styled.div`
//     font-size: 1.5em;
//     font-weight: 700;
//     padding-bottom: 20px;
// `;

export const ModifyDirectoryListLayout = ({ values, match, setFieldValue }) => {
    const { params } = match || {};
    const { system_id = "" } = params;

    const updateSelectedDirectory = selected_directories => {
        if (
            Array.isArray(selected_directories) &&
            selected_directories.length > 0
        ) {
            setFieldValue("parent_id", selected_directories[0], false);
        }
    };

    const updateSortByDropdown = (event, { value }) =>
        setFieldValue("sortBy", value, false);

    return (
        <ContainerDiv
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%"
            }}
        >
            <SubContainerDiv
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%"
                }}
            >
                <MainSubSections style={{ width: "40%", marginRight: "10%" }}>
                    <SectionHeader style={{ color: "black" }}>
                        DETAILS
                    </SectionHeader>
                    <FieldDiv>
                        <FieldLabel>DIRECTORY LIST NAME</FieldLabel>
                        <Field
                            style={{ width: "70%", height: "38" }}
                            name="name"
                            // label="DIRECTORY LIST NAME"
                            required={true}
                            type="text"
                            component={TextField}
                            variant="outlined"
                            fullWidth={true}
                        />
                    </FieldDiv>
                    <FieldDiv>
                        <FieldLabel>CHILD ORGANISATION</FieldLabel>
                        <input />
                    </FieldDiv>
                </MainSubSections>
                <MainSubSections style={{ width: "45%" }}>
                    <SectionHeader style={{ color: "black" }}>
                        LAYOUT
                    </SectionHeader>
                    <div style={{ display: "flex" }}>
                        <SubSectionDiv
                            style={{ width: "45%", flexDirection: "column" }}
                        >
                            <FieldDiv>
                                <FieldLabel>LIST FAMILY</FieldLabel>
                                <input />
                            </FieldDiv>
                            <FieldDiv>
                                <FieldLabel>LIST FAMILY OPTION</FieldLabel>
                                <input />
                            </FieldDiv>
                        </SubSectionDiv>
                        <SubSectionDiv>
                            <div
                                style={{
                                    width: "280px",
                                    height: "180px",
                                    backgroundColor: "white"
                                }}
                            />
                        </SubSectionDiv>
                    </div>
                </MainSubSections>
            </SubContainerDiv>
            <SubContainerDiv style={{ width: "100%" }}>
                <SectionHeader style={{ color: "black" }}>
                    LOCATION
                </SectionHeader>
                <MainSubSections
                    style={{ display: "flex", flexDirection: "row" }}
                >
                    <SubSectionDiv
                        style={{
                            flexBasis: "25%",
                            // borderRight: "2px solid #9D9D9D",
                            //   marginRight: "5%",
                            padding: "10px 10px 50px 10px",
                            justifyContent: "left"
                        }}
                    >
                        <div>check box</div>
                        <FieldDiv style={{ paddingLeft: "0" }}>
                            <FieldLabel>SORT ORDER</FieldLabel>
                            <Dropdown
                                value={values.sortBy}
                                placeholder="Select Sort By"
                                fluid
                                selection
                                options={SORT_BY_ORDER_BY_OPTIONS.map(
                                    ({ text, value }) => ({ text, value })
                                )}
                                onChange={updateSortByDropdown}
                            />
                        </FieldDiv>
                    </SubSectionDiv>
                    <SubSectionDiv
                        style={{
                            flexBasis: "30%",
                            marginRight: "5%",
                            marginLeft: "50px"
                        }}
                    >
                        <FieldDiv>
                            <FieldLabel>SEARCH BY NAME</FieldLabel>
                            <input
                                style={{
                                    width: "70%",
                                    height: "38"
                                }}
                            />

                            <Field name="parent_id">
                                {() => (
                                    <Query
                                        query={getDirectoryListBySystem}
                                        variables={{
                                            id: system_id
                                        }}
                                    >
                                        {({ loading, error, data }) => {
                                            if (loading)
                                                return <Loading loadingData />;
                                            if (error)
                                                return `Error! ${
                                                    error.message
                                                }`;
                                            const modifiedData = modifyDirectoryListData(
                                                data.directoryLists_by_system,
                                                true
                                            );
                                            // if (
                                            //     !Boolean(values.parent_id) &&
                                            //     modifiedData.length > 0
                                            // ) {
                                            //     return (
                                            //         <TreeviewSelector
                                            //             data={modifiedData}
                                            //             updateSelectedDirectory={
                                            //                 updateSelectedDirectory
                                            //             }
                                            //             selectAmount="single"
                                            //         />
                                            //     );
                                            // } else
                                            if (modifiedData.length > 0) {
                                                return (
                                                    <TreeviewSelector
                                                        data={modifiedData}
                                                        updateSelectedDirectory={
                                                            updateSelectedDirectory
                                                        }
                                                        selectAmount="single"
                                                        selectedValue={
                                                            values.parent_id
                                                        }
                                                        directoryType="list"
                                                    />
                                                );
                                            } else {
                                                return <React.Fragment />;
                                            }
                                        }}
                                    </Query>
                                )}
                            </Field>
                        </FieldDiv>
                    </SubSectionDiv>
                    <SubSectionDiv
                        style={{
                            flexBasis: "40%"
                        }}
                    >
                        <FieldDiv>
                            <FieldLabel>
                                SELECT LOCATION BY EXPANDING AND COLLAPSING THE
                                LISTS BELOW
                            </FieldLabel>
                            <table
                                style={{
                                    width: "820px",
                                    height: "400px",
                                    border: "1px solid  #9D9D9D",
                                    backgroundColor: "white",
                                    marginTop: "10px"
                                }}
                            />
                        </FieldDiv>
                    </SubSectionDiv>
                </MainSubSections>
            </SubContainerDiv>
        </ContainerDiv>

        // <ContainerDiv
        //     style={{
        //         width: "100%",
        //         height: "100%",
        //         paddingTop: 20,
        //         display: "flex",
        //         flexDirection: "column"
        //     }}
        // >
        //     <MainSubSections
        //         style={{
        //             width: "80%",
        //             display: "flex",
        //             flexDirection: "column",
        //             paddingBottom: 10,
        //             marginBottom: 20
        //         }}
        //     >
        //         <SubContainerDiv style={{ width: "100%", display: "flex" }}>
        //             <div>
        //                 <SectionHeader>DETAILS</SectionHeader>
        //                 <div style={{ flexBasis: "50%" }}>
        //                     <div style={{ width: "80%" }}>
        //                         <FieldLabel>DIRECTORY LIST NAME</FieldLabel>
        //                         <Field
        //                             name="name"
        //                             // label="DIRECTORY LIST NAME"
        //                             required={true}
        //                             type="text"
        //                             component={TextField}
        //                             variant="outlined"
        //                             fullWidth={true}
        //                         />
        //                     </div>
        //                 </div>
        //                 <div style={{ flexBasis: "50%" }}>
        //                     <div style={{ width: "80%" }}>
        //                         <Field
        //                             inputProps={{ min: "0", step: "1" }}
        //                             name="order"
        //                             label="SORT ORDER"
        //                             required={false}
        //                             type="number"
        //                             component={TextField}
        //                             variant="outlined"
        //                             fullWidth={true}
        //                         />
        //                     </div>

        //                     <div style={{ width: "80%" }}>
        //                         <FieldLabel> SORT BY</FieldLabel>
        //                         <Dropdown
        //                             value={values.sortBy}
        //                             placeholder="Select Sort By"
        //                             fluid
        //                             selection
        //                             options={SORT_BY_ORDER_BY_OPTIONS.map(
        //                                 ({ text, value }) => ({ text, value })
        //                             )}
        //                             onChange={updateSortByDropdown}
        //                         />
        //                     </div>
        //                 </div>
        //             </div>
        //
        //             <Field name="parent_id">
        //                 {() => (
        //                     <Query
        //                         query={getDirectoryListBySystem}
        //                         variables={{
        //                             id: system_id
        //                         }}
        //                     >
        //                         {({ loading, error, data }) => {
        //                             if (loading) return <Loading loadingData />;
        //                             if (error) return `Error! ${error.message}`;
        //                             const modifiedData = modifyDirectoryListData(
        //                                 data.directoryLists_by_system,
        //                                 true
        //                             );
        //                             // if (
        //                             //     !Boolean(values.parent_id) &&
        //                             //     modifiedData.length > 0
        //                             // ) {
        //                             //     return (
        //                             //         <TreeviewSelector
        //                             //             data={modifiedData}
        //                             //             updateSelectedDirectory={
        //                             //                 updateSelectedDirectory
        //                             //             }
        //                             //             selectAmount="single"
        //                             //         />
        //                             //     );
        //                             // } else
        //                             if (modifiedData.length > 0) {
        //                                 return (
        //                                     <TreeviewSelector
        //                                         data={modifiedData}
        //                                         updateSelectedDirectory={
        //                                             updateSelectedDirectory
        //                                         }
        //                                         selectAmount="single"
        //                                         selectedValue={values.parent_id}
        //                                         directoryType="list"
        //                                     />
        //                                 );
        //                             } else {
        //                                 return <React.Fragment />;
        //                             }
        //                         }}
        //                     </Query>
        //                 )}
        //             </Field>
        //         </SubContainerDiv>
        //         <SubContainerDiv style={{ width: "100%" }}>
        //             <SectionHeader>LINKS FORM</SectionHeader>
        //             <SubSectionDiv
        //                 style={{
        //                     width: "40%",
        //                     height: "400px"
        //                 }}
        //             />
        //             <SubSectionDiv style={{ width: "60%" }}>
        //                 <FieldLabel>
        //                     SELECT LOCATION BY EXPANDING AND COLLAPSING THE
        //                     LISTS BELOW
        //                 </FieldLabel>
        //                 <table
        //                     style={{
        //                         width: "800px",
        //                         height: "350px",
        //                         backgroundColor: "white"
        //                     }}
        //                 />
        //             </SubSectionDiv>
        //         </SubContainerDiv>
        //     </MainSubSections>
        //     <MainSubSections style={{ width: "80%", height: "50%" }}>
        //         <SectionHeader>LAYOUT</SectionHeader>
        //         <LayoutPicker
        //             values={values}
        //             setFieldValue={setFieldValue}
        //             layoutType="list"
        //             withTemplate={false}
        //             layoutListDirection="horizontal"
        //         />
        //     </MainSubSections>
        // </ContainerDiv>
    );
};

export default withRouter(ModifyDirectoryListLayout);
