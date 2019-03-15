import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import ModifyDirectoryListLayout from "./ModifyDirectoryListLayout";
import ModifyDirectoryListContent from "./ModifyDirectoryListContent";
import PropTypes from "prop-types";
import { ContainerDiv, SYSTEM_CMS_CONTENT_URL } from "../../../utils/Constants";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Formik, Form } from "formik";
import { Mutation, withApollo } from "react-apollo";
import {
    EDIT_DIRECTORY_LIST,
    CREATE_DIRECTORY_LIST
} from "../../../data/mutation";
import { getDirectoryListBySystem } from "../../../data/query";

export const ContainerDivTab = styled.div`
    width: 100%;
    overflow-y: auto;
    height: 80vh;
`;
const TabContainer = props => {
    return (
        // <Typography component="div" style={{ height: "100%" }}>
        //     {props.children}
        // </Typography>
        // <div style={{ width: "100%", height: "100%" }}>{props.children}</div>
        <ContainerDiv>{props.children}</ContainerDiv>
    );
};

const styles = () => ({
    buttonSaveExit: {
        width: 150,
        position: "absolute",
        top: 100,
        right: 20,
        backgroundColor: "rgb(33,143,250)",
        color: "white"
    },
    buttonCancel: {
        position: "absolute",
        top: 140,
        right: 180,
        backgroundColor: "white",
        color: "rgb(33,143,250)",
        borderColor: "rgb(33,143,250)"
    },
    buttonSaveKeep: {
        width: 150,
        position: "absolute",
        top: 140,
        right: 20,
        backgroundColor: "rgb(33,143,250)",
        color: "white"
    }
});

const lightGreyHeader = "rgb(247,247,247)";

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

const ModifyDirectoryList = props => {
    const [tab, setTab] = useState(0);
    const [toExit, setToExit] = useState(true);

    const has_data =
        props.location && props.location.state && props.location.state.data;

    const handleChange = (_event, value) => {
        setTab(value);
    };

    const system_id = props.match.params.system_id;

    const { classes } = props;

    const saveAndKeepEditing = submitForm => {
        setToExit(false);
        submitForm && submitForm();
    };

    const directoryList = has_data ? props.location.state.data : null;
    const initialValues =
        has_data && directoryList
            ? {
                  id: directoryList.id,
                  name: directoryList.name,
                  layout_family_id: directoryList.layout.layout_family.id,
                  layout_id: directoryList.layout.id,
                  parent_id: Boolean(directoryList.parent_id)
                      ? directoryList.parent_id
                      : null,
                  images:
                      directoryList.media &&
                      Array.isArray(directoryList.media) &&
                      directoryList.media.length > 0
                          ? [{ ...directoryList.media[0], uploaded: true }]
                          : [],
                  colours: []
              }
            : {
                  id: null,
                  name: "",
                  layout_family_id: null,
                  layout_id: null,
                  parent_id: null,
                  images: [],
                  colours: []
              };

    return (
        <div
            style={{
                width: "100%",
                // height: "100%",
                // height: "calc(100vh-80px)",
                // overflowY: "auto",
                backgroundColor: lightGreyHeader
            }}
        >
            <Mutation
                mutation={
                    has_data ? EDIT_DIRECTORY_LIST() : CREATE_DIRECTORY_LIST()
                }
                refetchQueries={[
                    {
                        query: getDirectoryListBySystem,
                        variables: { id: system_id }
                    }
                ]}
            >
                {/* {(action, { loading, error }) => ( */}
                {action => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(true);
                            console.log(values);
                            alert(values.name);

                            const {
                                images,
                                parent_id: selected_directory
                            } = values;
                            const { match, history } = props;

                            if (images && images.length === 1 && !has_data) {
                                console.log("CREATE WITH IMAGE");

                                action({
                                    variables: {
                                        name: values.name,
                                        is_root: selected_directory
                                            ? true
                                            : false,
                                        layout_id: 1,
                                        system_id: parseInt(
                                            match.params.system_id
                                        ),
                                        parent_id: parseInt(selected_directory),
                                        image: images[0]
                                    }
                                });
                            } else if (
                                images &&
                                images.length === 1 &&
                                has_data
                            ) {
                                console.log("UPDATE WITH IMAGE");
                                console.log(images[0]);
                                //If user upload another image
                                if (!images[0].uploaded) {
                                    action({
                                        variables: {
                                            id: parseInt(
                                                this.props.location.state.data
                                                    .id
                                            ),
                                            name: values.name,
                                            is_root: selected_directory
                                                ? true
                                                : false,
                                            layout_id: 1,
                                            system_id: parseInt(
                                                match.params.system_id
                                            ),
                                            parent_id: parseInt(
                                                selected_directory
                                            ),
                                            image: images[0]
                                        }
                                    });
                                } else {
                                    action({
                                        variables: {
                                            id: parseInt(
                                                this.props.location.state.data
                                                    .id
                                            ),
                                            name: values.name,
                                            is_root: selected_directory
                                                ? true
                                                : false,
                                            layout_id: 1,
                                            system_id: parseInt(
                                                match.params.system_id
                                            ),
                                            parent_id: parseInt(
                                                selected_directory
                                            )
                                        }
                                    });
                                }
                            } else {
                                action({
                                    variables: {
                                        name: values.name,
                                        is_root: selected_directory
                                            ? true
                                            : false,
                                        layout_id: 1,
                                        system_id: parseInt(
                                            match.params.system_id
                                        ),
                                        parent_id: parseInt(selected_directory)
                                    }
                                });
                            }
                            if (toExit) {
                                history.push(
                                    SYSTEM_CMS_CONTENT_URL.replace(
                                        ":system_id",
                                        parseInt(match.params.system_id)
                                    )
                                );
                            }
                        }}
                    >
                        {({
                            isSubmitting,
                            errors,
                            values,
                            setFieldValue,
                            submitForm
                        }) => (
                            <Form>
                                <div
                                    style={{
                                        height: 60,
                                        fontSize: "2em",
                                        fontWeight: 700,
                                        paddingTop: 20,
                                        paddingBottom: 20
                                    }}
                                >
                                    SYSTEM CONTENT:{" "}
                                    {has_data ? "MODIFY" : "ADD"} DIRECTORY LIST
                                </div>
                                <Paper
                                    square
                                    style={{
                                        backgroundColor: lightGreyHeader,
                                        boxShadow: "none",
                                        borderBottom:
                                            "2px solid rgb(217,217,217)"
                                    }}
                                >
                                    <Tabs
                                        value={tab}
                                        // classes={{
                                        //     indicator: props.classes.indicator
                                        // }}
                                        TabIndicatorProps={{
                                            style: {
                                                backgroundColor:
                                                    "rgb(57,154,249)"
                                            }
                                        }}
                                        onChange={handleChange}
                                    >
                                        >
                                        <Tab label="PREVIEW" />
                                        <Tab label="LAYOUT" />
                                        <Tab label="CONTENT" />
                                    </Tabs>
                                </Paper>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    className={classes.buttonSaveExit}
                                >
                                    SAVE & EXIT
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() =>
                                        saveAndKeepEditing(submitForm)
                                    }
                                    className={classes.buttonSaveKeep}
                                >
                                    SAVE & KEEP EDITING
                                </Button>
                                <Button
                                    variant="outlined"
                                    className={classes.buttonCancel}
                                >
                                    CANCEL
                                </Button>
                                <ContainerDivTab>
                                    {tab === 0 && (
                                        <TabContainer>PREVIEW</TabContainer>
                                    )}
                                    {tab === 1 && (
                                        <TabContainer>
                                            <ModifyDirectoryListLayout
                                                values={values}
                                                errors={errors}
                                                isSubmitting={isSubmitting}
                                                setFieldValue={setFieldValue}
                                            />
                                        </TabContainer>
                                    )}
                                    {tab === 2 && (
                                        <TabContainer>
                                            <ModifyDirectoryListContent
                                                values={values}
                                                errors={errors}
                                                isSubmitting={isSubmitting}
                                                setFieldValue={setFieldValue}
                                            />
                                        </TabContainer>
                                    )}
                                </ContainerDivTab>
                            </Form>
                        )}
                    </Formik>
                )}
            </Mutation>
        </div>
    );
};

export default withApollo(withStyles(styles)(ModifyDirectoryList));
// export default ModifyDirectoryList;
