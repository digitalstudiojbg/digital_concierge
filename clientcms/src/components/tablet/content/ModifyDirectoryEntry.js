import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import ModifyDirectoryEntryLayout from "./ModifyDirectoryEntryLayout";
import ModifyDirectoryEntryContent from "./ModifyDirectoryEntryContent";
import PropTypes from "prop-types";
import {
    ContainerDiv,
    SYSTEM_CMS_CONTENT_URL,
    DECIMAL_RADIX,
    SYSTEM_MODIFY_DIRECTORY_ENTRY_URL
} from "../../../utils/Constants";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Formik, Form } from "formik";
import { Mutation, withApollo } from "react-apollo";
import {
    EDIT_DIRECTORY_LIST,
    CREATE_DIRECTORY_LIST
} from "../../../data/mutation";
import {
    getDirectoryListBySystem,
    getSystemThemeAndPalettes
} from "../../../data/query";
import * as Yup from "yup";
import { List } from "immutable";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitleHelper from "../../../utils/DialogTitleHelper";
import { sanitize } from "dompurify";

export const ContainerDivTab = styled.div`
    width: 100%;
    overflow-y: auto;
    height: 80vh;
`;
const TabContainer = props => {
    return <ContainerDiv>{props.children}</ContainerDiv>;
};

const styles = () => ({
    buttonSaveExit: {
        width: 150,
        position: "absolute",
        top: 100,
        right: 20,
        backgroundColor: "rgb(33,143,250)",
        color: "white",
        fontFamily: "Source Sans Pro, sans-serif"
    },
    buttonCancel: {
        position: "absolute",
        top: 140,
        right: 180,
        backgroundColor: "white",
        color: "rgb(33,143,250)",
        border: "2px solid rgb(33,143,250)",
        fontWeight: 600,
        fontFamily: "Source Sans Pro, sans-serif"
    },
    buttonSaveKeep: {
        width: 150,
        position: "absolute",
        top: 140,
        right: 20,
        backgroundColor: "rgb(33,143,250)",
        color: "white",
        fontFamily: "Source Sans Pro, sans-serif"
    }
});

const lightGreyHeader = "rgb(247,247,247)";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required."),
    layout_id: Yup.string().required("Required."),
    parent_ids: Yup.array()
        .of(Yup.string())
        .required("Required"),
    template_id: Yup.string().required("Required."),
    images: Yup.mixed().required("Required.")
});

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

const SlideUpTransition = props => {
    return <Slide direction="up" {...props} />;
};

const ModifyDirectoryEntry = props => {
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

    const {
        system: {
            theme: {
                defaultDirEntryLayout: {
                    id: layout_id,
                    layout_family: { id: layout_family_id }
                }
            }
        }
    } = props.client.readQuery({
        query: getSystemThemeAndPalettes,
        variables: { id: system_id }
    });

    const directoryEntry = has_data ? props.location.state.data : null;
    const initialValues =
        has_data && directoryEntry
            ? {
                  id: directoryEntry.id,
                  name: directoryEntry.name,
                  title: sanitize(directoryEntry.title),
                  title_plaintext: directoryEntry.title_plaintext,
                  description: Boolean(directoryEntry.description)
                      ? sanitize(directoryEntry.description)
                      : "",
                  layout_family_id: directoryEntry.layout.layout_family.id,
                  layout_id: directoryEntry.layout.id,
                  order: directoryEntry.order,
                  parent_ids: directoryEntry.parent_ids,
                  images:
                      directoryEntry.media &&
                      Array.isArray(directoryEntry.media) &&
                      directoryEntry.media.length > 0
                          ? [{ ...directoryEntry.media[0], uploaded: true }]
                          : [],
                  colours: [...directoryEntry.colours],
                  initial_colours: [...directoryEntry.colours]
              }
            : {
                  id: null,
                  name: "",
                  title: "",
                  title_plaintext: "",
                  description: "",
                  order: 0,
                  layout_family_id: Boolean(layout_family_id)
                      ? layout_family_id
                      : "",
                  layout_id: Boolean(layout_id) ? layout_id : "",
                  parent_ids: has_parent_id
                      ? [props.location.state.data.parent_id]
                      : "",
                  images: [],
                  colours: [],
                  initial_colours: []
              };

    //Modify data of the directory to remove unnecessary key values item
    //For example child_directory & directory_entries
    const modifyDataBeingSendToEditPage = (values, directory) => {
        if (directory.id && directory.media) {
            const {
                name,
                title: titleUnSanitized,
                title_plaintext,
                description: descriptionUnSanitized,
                layout_family_id,
                layout_id,
                order,
                parent_ids,
                colours
            } = values;

            const { id, media } = directory;

            return {
                id,
                name,
                title: sanitize(titleUnSanitized),
                title_plaintext,
                description: sanitize(descriptionUnSanitized),
                layout: {
                    id: layout_id,
                    layout_family: {
                        id: layout_family_id
                    }
                },
                order,
                parent_ids,
                active: true,
                media,
                colours: colours.toJS()
            };
        } else {
            return null;
        }
    };

    const actionAfterSubmission = (values, data) => {
        const { history, match } = props;
        if (toExit) {
            history.push(
                SYSTEM_CMS_CONTENT_URL.replace(
                    ":system_id",
                    parseInt(match.params.system_id)
                )
            );
        } else if (!has_data) {
            //FROM CREATE PAGE NAVIGATE TO MODIFY PAGE AS WELL AS SET UPDATED DATA IN LOCATION

            history.push({
                pathname: SYSTEM_MODIFY_DIRECTORY_ENTRY_URL.replace(
                    ":system_id",
                    system_id
                ),
                state: { data: modifyDataBeingSendToEditPage(values, data) }
            });
        }
    };

    return (
        <div
            style={{
                width: "100%",
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
                                title: initialTitle,
                                title_plaintext,
                                order,
                                description: initialDescription,
                                layout_id: layout_idString,
                                colours: coloursImmutable,
                                images,
                                parent_ids
                            } = values;
                            const { match } = props;

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
                                layout_id,
                                system_id: parseInt(match.params.system_id),
                                parent_ids: parent_ids.map(id =>
                                    parseInt(id, DECIMAL_RADIX)
                                ),
                                colours,
                                title: sanitize(initialTitle),
                                title_plaintext,
                                order,
                                description: sanitize(initialDescription)
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

                                /*
                                action({
                                    variables: { input: { ...toSubmit } }
                                }).then(({ data }) => {
                                    console.log(data);
                                    actionAfterSubmission(
                                        values,
                                        data.createDirectoryList //TODO: CHANGE THIS
                                    );
                                }); */
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

                                /*
                                action({
                                    variables: { input: { ...toSubmit } }
                                }).then(({ data }) => {
                                    console.log(data);
                                    actionAfterSubmission(
                                        values,
                                        data.editDirectoryList //TODO: CHANGE THIS
                                    );
                                }); */
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
                                        ENTRY
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
                                                <ModifyDirectoryEntryLayout
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
                                                <ModifyDirectoryEntryContent
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

export default withApollo(withStyles(styles)(ModifyDirectoryEntry));
