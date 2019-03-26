import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import ModifyDirectoryListLayout from "./ModifyDirectoryListLayout";
import ModifyDirectoryListContent from "./ModifyDirectoryListContent";
import PropTypes from "prop-types";
import {
    ContainerDiv,
    SYSTEM_CMS_CONTENT_URL,
    // HEX_COLOUR_REGEX,
    DECIMAL_RADIX
} from "../../../utils/Constants";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Formik, Form } from "formik";
import { Mutation } from "react-apollo";
import {
    EDIT_DIRECTORY_LIST,
    CREATE_DIRECTORY_LIST
} from "../../../data/mutation";
import { getDirectoryListBySystem } from "../../../data/query";
import * as Yup from "yup";
import { List } from "immutable";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitleHelper from "../../../utils/DialogTitleHelper";

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
        border: "2px solid rgb(33,143,250)",
        fontWeight: 600
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

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required."),
    layout_id: Yup.string().required("Required."),
    parent_id: Yup.string("Required."),
    images: Yup.mixed().required("Required.")
    // colours: Yup.array()
    //     .of(
    //         Yup.object().shape({
    //             hex: Yup.string()
    //                 .matches(HEX_COLOUR_REGEX)
    //                 .required("Please select the correct colour format"),
    //             alpha: Yup.number()
    //                 .min(0)
    //                 .max(100)
    //                 .required("Please select the correct alpha format")
    //         })
    //     )
    //     .required("Required.")
});

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

const SlideUpTransition = props => {
    return <Slide direction="up" {...props} />;
};

const ModifyDirectoryList = props => {
    const [tab, setTab] = useState(0);
    const [toExit, setToExit] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);

    const handleCancelButton = () => setOpenDialog(true);
    const closeDialog = () => setOpenDialog(false);

    //Used to determine whether this is going to be a create or edit page
    const has_data =
        props.location &&
        props.location.state &&
        props.location.state.data &&
        props.location.state.data.id;

    //Used to determine whether this is going to be a create with additional information about the parent_id
    const has_parent_id =
        props.location &&
        props.location.state &&
        props.location.state.data &&
        props.location.state.data.parent_id;

    const handleChange = (_event, value) => {
        setTab(value);
    };

    const system_id = props.match.params.system_id;

    const cancelEdit = () => {
        props.history.push(
            SYSTEM_CMS_CONTENT_URL.replace(":system_id", system_id)
        );
    };

    const { classes } = props;

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
                      : "",
                  images:
                      directoryList.media &&
                      Array.isArray(directoryList.media) &&
                      directoryList.media.length > 0
                          ? [{ ...directoryList.media[0], uploaded: true }]
                          : [],
                  colours: [...directoryList.colours],
                  initial_colours: [...directoryList.colours]
              }
            : {
                  id: null,
                  name: "",
                  layout_family_id: null,
                  layout_id: "",
                  parent_id: has_parent_id
                      ? props.location.state.data.parent_id
                      : "",
                  images: [],
                  colours: [],
                  initial_colours: []
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
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(true);
                            console.log(values);

                            const {
                                id,
                                name,
                                layout_id: layout_idString,
                                colours: coloursImmutable,
                                images,
                                parent_id
                            } = values;
                            const { match, history } = props;

                            const has_data = Boolean(id);
                            const layout_id = parseInt(
                                layout_idString,
                                DECIMAL_RADIX
                            );
                            const colours = List.isList(coloursImmutable)
                                ? coloursImmutable.toJS()
                                : [...coloursImmutable];

                            //https://stackoverflow.com/a/47892178
                            let toSubmit = {
                                ...(Boolean(id) && {
                                    id: parseInt(id, DECIMAL_RADIX)
                                }),
                                name,
                                is_root: !Boolean(parent_id),
                                layout_id,
                                system_id: parseInt(match.params.system_id),
                                ...(Boolean(parent_id) && {
                                    parent_id: parseInt(
                                        parent_id,
                                        DECIMAL_RADIX
                                    )
                                }),
                                colours
                            };

                            if (images && images.length === 1 && !has_data) {
                                if (!images[0].uploaded) {
                                    console.log("CREATE WITH UPLOAD IMAGE");
                                    toSubmit = {
                                        ...toSubmit,
                                        image: images[0]
                                    };
                                } else if (images[0].uploaded) {
                                    toSubmit = {
                                        ...toSubmit,
                                        media_id: parseInt(
                                            images[0].id,
                                            DECIMAL_RADIX
                                        )
                                    };
                                }

                                console.log(toSubmit);

                                action({
                                    variables: { input: { ...toSubmit } }
                                });
                            } else if (
                                images &&
                                images.length === 1 &&
                                has_data
                            ) {
                                console.log(images[0]);
                                if (!images[0].uploaded) {
                                    //If user upload another image
                                    console.log("UPDATE WITH NEW IMAGE");

                                    toSubmit = {
                                        ...toSubmit,
                                        image: images[0]
                                    };
                                } else if (
                                    images[0].uploaded &&
                                    images[0].changed
                                ) {
                                    console.log(
                                        "UPDATE WITH EXISTING IMAGE FROM LIBRARY"
                                    );

                                    toSubmit = {
                                        ...toSubmit,
                                        media_id: parseInt(
                                            images[0].id,
                                            DECIMAL_RADIX
                                        )
                                    };
                                } else {
                                    console.log(
                                        "UPDATE WITHOUT CHANGING IMAGE"
                                    );
                                }
                                console.log(toSubmit);

                                action({
                                    variables: { input: { ...toSubmit } }
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
                            dirty,
                            isSubmitting,
                            errors,
                            values,
                            setFieldValue,
                            submitForm
                        }) => {
                            const saveAndKeepEditing = () => {
                                setToExit(false);
                                submitForm();
                            };

                            return (
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
                                        {has_data ? "MODIFY" : "ADD"} DIRECTORY
                                        LIST
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
                                        onClick={saveAndKeepEditing}
                                        className={classes.buttonSaveKeep}
                                    >
                                        SAVE & KEEP EDITING
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        className={classes.buttonCancel}
                                        onClick={handleCancelButton}
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
                                                    setFieldValue={
                                                        setFieldValue
                                                    }
                                                />
                                            </TabContainer>
                                        )}
                                        {tab === 2 && (
                                            <TabContainer>
                                                <ModifyDirectoryListContent
                                                    values={values}
                                                    errors={errors}
                                                    isSubmitting={isSubmitting}
                                                    setFieldValue={
                                                        setFieldValue
                                                    }
                                                />
                                            </TabContainer>
                                        )}
                                    </ContainerDivTab>
                                    <Dialog
                                        open={openDialog}
                                        TransitionComponent={SlideUpTransition}
                                        keepMounted
                                        onClose={closeDialog}
                                    >
                                        <DialogTitleHelper
                                            onClose={closeDialog}
                                        >
                                            CONFIRM PAGE NAVIGATION
                                        </DialogTitleHelper>
                                        <DialogContent>
                                            <DialogContentText component="div">
                                                {dirty ? (
                                                    <React.Fragment>
                                                        <div
                                                            style={{
                                                                paddingTop: 10
                                                            }}
                                                        >
                                                            ARE YOU SURE YOU
                                                            WANT TO LEAVE THIS
                                                            PAGE?
                                                        </div>
                                                        <div>
                                                            YOU HAVE UNSAVED
                                                            CHANGES.
                                                        </div>
                                                    </React.Fragment>
                                                ) : (
                                                    <div
                                                        style={{
                                                            paddingTop: 10
                                                        }}
                                                    >
                                                        ARE YOU SURE YOU WANT TO
                                                        LEAVE THIS PAGE?
                                                    </div>
                                                )}
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button
                                                color="primary"
                                                onClick={cancelEdit}
                                            >
                                                LEAVE
                                            </Button>
                                            <Button
                                                color="primary"
                                                onClick={closeDialog}
                                            >
                                                STAY
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Form>
                            );
                        }}
                    </Formik>
                )}
            </Mutation>
        </div>
    );
};

export default withStyles(styles)(ModifyDirectoryList);
// export default ModifyDirectoryList;
