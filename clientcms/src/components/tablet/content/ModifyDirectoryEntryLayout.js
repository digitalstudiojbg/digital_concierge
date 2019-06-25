import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import LayoutPicker from "../../../utils/LayoutPicker";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import styled from "styled-components";
import { getDirectoryListBySystem } from "../../../data/query";
import Loading from "../../loading/Loading";
import { modifyDirectoryListData } from "../../../utils/Constants";
import TreeviewSelector from "../../../utils/TreeviewSelector";
import { SectionHeader, ContainerDiv } from "../../home/WelcomeStyleSet";

const ContainerDivModified = styled(ContainerDiv)`
    flex-direction: column;
`;

const ModifyDirectoryEntryLayout = ({ values, match, setFieldValue }) => {
    const { params } = match || {};
    const { system_id = "" } = params;

    const updateSelectedDirectory = selected_directories => {
        if (
            Array.isArray(selected_directories) &&
            selected_directories.length > 0
        ) {
            setFieldValue("parent_ids", [...selected_directories], false);
        }
    };

    return (
        <ContainerDivModified>
            <SectionHeader>DETAILS</SectionHeader>
            <div
                style={{
                    width: "80%",
                    height: "8%",
                    display: "flex",
                    paddingBottom: 10,
                    marginBottom: 20
                }}
            >
                <div style={{ flexBasis: "30%" }}>
                    <div style={{ width: "80%" }}>
                        <Field
                            name="name"
                            label="DIRECTORY ENTRY NAME"
                            required={true}
                            type="text"
                            component={TextField}
                            variant="outlined"
                            fullWidth={true}
                        />
                    </div>
                </div>
                <div style={{ flexBasis: "10%" }}>
                    <div style={{ width: "80%" }}>
                        <Field
                            inputProps={{ min: "0", step: "1" }}
                            name="order"
                            label="SORT ORDER"
                            required={false}
                            type="number"
                            component={TextField}
                            variant="outlined"
                            fullWidth={true}
                        />
                    </div>
                </div>
            </div>
            <div style={{ width: "80%", height: "40%" }}>
                <Field name="parent_id">
                    {() => (
                        <Query
                            query={getDirectoryListBySystem}
                            variables={{
                                id: system_id
                            }}
                        >
                            {({ loading, error, data }) => {
                                if (loading) return <Loading loadingData />;
                                if (error) return `Error! ${error.message}`;
                                const modifiedData = modifyDirectoryListData(
                                    data.directoryLists_by_system,
                                    true
                                );
                                if (modifiedData.length > 0) {
                                    return (
                                        <TreeviewSelector
                                            data={modifiedData}
                                            updateSelectedDirectory={
                                                updateSelectedDirectory
                                            }
                                            selectAmount="multiple"
                                            selectedValues={values.parent_ids}
                                            directoryType="entry"
                                        />
                                    );
                                } else {
                                    return <React.Fragment />;
                                }
                            }}
                        </Query>
                    )}
                </Field>
            </div>
            <div style={{ width: "80%", height: "50%" }}>
                <SectionHeader>LAYOUT</SectionHeader>
                <LayoutPicker
                    values={values}
                    setFieldValue={setFieldValue}
                    layoutType="entry"
                    withTemplate={true}
                    templateType="entry"
                    layoutListDirection="horizontal"
                />
            </div>
        </ContainerDivModified>
    );
};

export default withRouter(ModifyDirectoryEntryLayout);
