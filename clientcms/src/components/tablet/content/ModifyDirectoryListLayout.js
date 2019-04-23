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

const SubtitleDiv = styled.div`
    font-size: 1.5em;
    font-weight: 700;
    padding-bottom: 20px;
`;

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
        <div
            style={{
                width: "100%",
                height: "100%",
                paddingTop: 20
            }}
        >
            <SubtitleDiv>DETAILS</SubtitleDiv>
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
                            label="DIRECTORY LIST NAME"
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
                <div style={{ flexBasis: "40%" }}>
                    <div style={{ width: "80%" }}>
                        <div
                            style={{
                                fontSize: "1em",
                                color: "rgb(137,137,137)"
                            }}
                        >
                            SORT BY
                        </div>
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
                                            selectedValue={values.parent_id}
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
            </div>
            <div style={{ width: "80%", height: "50%" }}>
                <SubtitleDiv>LAYOUT</SubtitleDiv>
                <LayoutPicker
                    values={values}
                    setFieldValue={setFieldValue}
                    layoutType="list"
                    withTemplate={false}
                    layoutListDirection="horizontal"
                />
            </div>
        </div>
    );
};

export default withRouter(ModifyDirectoryListLayout);
