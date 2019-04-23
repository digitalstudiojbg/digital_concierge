import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {
    ContainerDiv,
    SYSTEM_CMS_CONTENT_URL,
    DECIMAL_RADIX
} from "../../../utils/Constants";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Formik, Form } from "formik";
import { Mutation, withApollo } from "react-apollo";
import {
    EDIT_DIRECTORY_ENTRY,
    CREATE_DIRECTORY_ENTRY
} from "../../../data/mutation";
import * as Yup from "yup";
import { List } from "immutable";
import { sanitize } from "dompurify";
import {
    getSystemStart,
    getSystemDetail,
    getSystemThemeAndPalettes
} from "../../../data/query/system";
import { isEmpty } from "lodash";
import ModifyStartLayout from "./ModifyStartLayout";

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

const ModifyStart = props => {
    const [tab, setTab] = useState(0);
    const [toExit, setToExit] = useState(true);

    const handleChange = (_event, value) => {
        setTab(value);
    };

    const system_id = props.match.params.system_id;

    const { classes } = props;

    const { system } = props.client.readQuery({
        query: getSystemStart,
        variables: { id: system_id }
    });

    const {
        system: {
            theme: {
                defaultStartLayout: {
                    id: layout_id,
                    layout_family: { id: layout_family_id }
                }
            }
        }
    } = props.client.readQuery({
        query: getSystemThemeAndPalettes,
        variables: { id: system_id }
    });

    //Used to determine whether this is going to be a create or edit page
    const has_data =
        Boolean(system) && Boolean(system.start) && !isEmpty(system.start);

    const start = has_data ? system.start : null;

    const initialValues = has_data
        ? {
              id: start.id,
              description: sanitize(start.description),
              button_text: sanitize(start.button_text),
              headers:
                  start.header && !isEmpty(start.header)
                      ? [{ ...start.header, uploaded: true }]
                      : [],
              logos:
                  start.logo && !isEmpty(start.logo)
                      ? [{ ...start.logo, uploaded: true }]
                      : [],
              layout_family_id: start.layout.layout_family.id,
              layout_id: start.layout && start.layout.id ? start.layout.id : "",
              colours: [...start.colours],
              initial_colours: [...start.colours]
          }
        : {
              id: null,
              description: "",
              button_text: "",
              headers: [],
              logos: [],
              layout_family_id,
              layout_id,
              colours: [],
              initial_colours: []
          };

    const cleanUp = values => {
        //Do clean up for generated preview images to prevent memory leak
        values.headers.forEach(image => {
            if (!Boolean(image.uploaded) && Boolean(image.preview)) {
                // Make sure to revoke the preview data uris to avoid memory leaks
                URL.revokeObjectURL(image.preview);
            }
        });
        values.logos.forEach(image => {
            if (!Boolean(image.uploaded) && Boolean(image.preview)) {
                // Make sure to revoke the preview data uris to avoid memory leaks
                URL.revokeObjectURL(image.preview);
            }
        });
    };

    const actionAfterSubmission = (values, data) => {
        const { history, match } = props;
        if (toExit) {
            cleanUp(values);
            history.push(
                //TODO: CHANGE THIS
                SYSTEM_CMS_CONTENT_URL.replace(
                    ":system_id",
                    parseInt(match.params.system_id)
                )
            );
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
                    has_data ? EDIT_DIRECTORY_ENTRY : CREATE_DIRECTORY_ENTRY //TODO: CHANGE THIS!
                }
                refetchQueries={[
                    {
                        query: getSystemDetail,
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

                            //TODO: CHANGE THIS!
                            /*
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
                                parent_ids,
                                template_id
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
                                template_id: parseInt(
                                    template_id,
                                    DECIMAL_RADIX
                                ),
                                system_id: parseInt(
                                    match.params.system_id,
                                    DECIMAL_RADIX
                                ),
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
                                    console.log(
                                        "CREATE WITH EXISTING IMAGE FROM LIBRARY"
                                    );
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
                                }).then(({ data }) => {
                                    console.log(data);
                                    actionAfterSubmission(
                                        values,
                                        data.createDirectoryEntry
                                    );
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
                                }).then(({ data }) => {
                                    console.log(data);
                                    actionAfterSubmission(
                                        values,
                                        data.editDirectoryEntry
                                    );
                                });
                            } */
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
                                        SYSTEM CONTENT: START
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
                                    <ContainerDivTab>
                                        {tab === 0 && (
                                            <TabContainer>PREVIEW</TabContainer>
                                        )}
                                        {tab === 1 && (
                                            <TabContainer>
                                                <ModifyStartLayout
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
                                                {/*TODO: CHANGE THIS*/}
                                                <React.Fragment />
                                            </TabContainer>
                                        )}
                                    </ContainerDivTab>
                                </Form>
                            );
                        }}
                    </Formik>
                )}
            </Mutation>
        </div>
    );
};

export default withApollo(withStyles(styles)(ModifyStart));
