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

const SubtitleDiv = styled.div`
    font-size: 1.5em;
    font-weight: 700;
    padding-bottom: 20px;
`;

export const ModifyDirectoryListLayout = ({ values, match, setFieldValue }) => {
    const { params } = match || {};
    const { system_id = "" } = params;

    const updateSelectedDirectory = selected_directory => {
        setFieldValue("parent_id", selected_directory, false);
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                paddingTop: 20
            }}
        >
            <div style={{ flexBasis: "40%", marginRight: "5%" }}>
                <SubtitleDiv>LIST DETAILS</SubtitleDiv>
                <Field
                    name="name"
                    label="DIRECTORY LIST NAME"
                    required={true}
                    type="text"
                    component={TextField}
                    variant="outlined"
                    fullWidth={true}
                />

                <Field name="parent_id">
                    {() => (
                        <div style={{ marginTop: 20, height: "70%" }}>
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
                                    if (
                                        !Boolean(values.parent_id) &&
                                        modifiedData.length > 0
                                    ) {
                                        return (
                                            <TreeviewSelector
                                                data={modifiedData}
                                                updateSelectedDirectory={
                                                    updateSelectedDirectory
                                                }
                                                selectAmount="single"
                                            />
                                        );
                                    } else if (modifiedData.length > 0) {
                                        return (
                                            <TreeviewSelector
                                                data={modifiedData}
                                                updateSelectedDirectory={
                                                    updateSelectedDirectory
                                                }
                                                selectAmount="single"
                                                selectedValue={values.parent_id}
                                            />
                                        );
                                    } else {
                                        return <React.Fragment />;
                                    }
                                }}
                            </Query>
                        </div>
                    )}
                </Field>
            </div>
            <div style={{ flexBasis: "40%" }}>
                <SubtitleDiv>LAYOUT</SubtitleDiv>
                <LayoutPicker values={values} setFieldValue={setFieldValue} />
            </div>
        </div>
    );
};

export default withRouter(ModifyDirectoryListLayout);
