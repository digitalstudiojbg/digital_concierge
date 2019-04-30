import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { ContainerDiv, DECIMAL_RADIX } from "../../../utils/Constants";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Formik, Form } from "formik";
import { Mutation, withApollo } from "react-apollo";
import { CREATE_HOME, EDIT_HOME } from "../../../data/mutation";
import * as Yup from "yup";
import { List } from "immutable";
import { sanitize } from "dompurify";
import {
    getSystemHome,
    getSystemDetail,
    getSystemThemeAndPalettes
} from "../../../data/query/system";
import { isEmpty } from "lodash";
import ModifyHomeLayout from "./ModifyHomeLayout";
import ModifyHomeContent from "./ModifyHomeContent";

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
    description: Yup.string(),
    layout_id: Yup.string().required("Required."),
    headers: Yup.mixed().required("Required."),
    logos: Yup.mixed().required("Required.")
});

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

const ModifyHome = props => {
    const [tab, setTab] = useState(0);
    const [toExit, setToExit] = useState(true);

    const handleChange = (_event, value) => {
        setTab(value);
    };

    const system_id = props.match.params.system_id;

    const { classes } = props;

    const { system } = props.client.readQuery({
        query: getSystemHome,
        variables: { id: system_id }
    });

    const {
        system: {
            theme: {
                defaultHomeLayout: {
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
        Boolean(system) && Boolean(system.home) && !isEmpty(system.home);

    const home = has_data ? system.home : null;

    const initialValues = has_data
        ? {
              id: home.id,
              description: sanitize(home.description),
              headers:
                  home.header && !isEmpty(home.header)
                      ? [{ ...home.header, uploaded: true }]
                      : [],
              logos:
                  home.logo && !isEmpty(home.logo)
                      ? [{ ...home.logo, uploaded: true }]
                      : [],
              layout_family_id: home.layout.layout_family.id,
              layout_id: home.layout && home.layout.id ? home.layout.id : "",
              colours: [...home.colours],
              initial_colours: [...home.colours]
          }
        : {
              id: null,
              description: "",
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

    const actionAfterSubmission = (values, data, setFieldValue) => {
        // const { history, match } = props;
        console.log("Data received: ", data);
        cleanUp(values);

        if (!Boolean(values.id)) {
            //Set ID if values.id is undefined
            setFieldValue("id", data.id);
        }

        if (toExit) {
            setTab(0);
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
                mutation={has_data ? EDIT_HOME : CREATE_HOME}
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
                        onSubmit={(
                            values,
                            { setSubmitting, setFieldValue }
                        ) => {
                            setSubmitting(true);
                            // console.log(values);

                            const {
                                id,
                                description,
                                headers,
                                logos,
                                layout_id: layoutId,
                                colours: coloursImmutable
                            } = values;

                            const colours = List.isList(coloursImmutable)
                                ? coloursImmutable.toJS()
                                : [...coloursImmutable];

                            //https://stackoverflow.com/a/47892178
                            const toSubmit = {
                                ...(Boolean(id) && {
                                    id: parseInt(id, DECIMAL_RADIX)
                                }),

                                description: sanitize(description),

                                //Header image has not been uploaded
                                ...(Array.isArray(headers) &&
                                    headers.length === 1 &&
                                    !headers[0].uploaded && {
                                        header: headers[0]
                                    }),

                                //Header image has been uploaded and image changed
                                ...(Array.isArray(headers) &&
                                    headers.length === 1 &&
                                    headers[0].uploaded &&
                                    headers[0].changed && {
                                        headerMediaId: parseInt(
                                            headers[0].id,
                                            DECIMAL_RADIX
                                        )
                                    }),

                                //Logo image has not been uploaded
                                ...(Array.isArray(logos) &&
                                    logos.length === 1 &&
                                    !logos[0].uploaded && {
                                        logo: logos[0]
                                    }),

                                //Logo image has been uploaded and image changed
                                ...(Array.isArray(logos) &&
                                    logos.length === 1 &&
                                    logos[0].uploaded &&
                                    logos[0].changed && {
                                        logoMediaId: parseInt(
                                            logos[0].id,
                                            DECIMAL_RADIX
                                        )
                                    }),
                                colours,
                                layoutId,
                                ...(!has_data && { systemId: system_id }),
                                clientId: system.client.id
                            };

                            console.log(toSubmit);

                            action({
                                variables: { input: { ...toSubmit } }
                            }).then(({ data }) => {
                                console.log(data);
                                actionAfterSubmission(
                                    values,
                                    Boolean(data) && Boolean(data.createHome)
                                        ? data.createHome
                                        : Boolean(data) &&
                                          Boolean(data.editHome)
                                        ? data.editHome
                                        : null,
                                    setFieldValue
                                );
                            });
                        }}
                    >
                        {({
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
                                        SYSTEM CONTENT: HOME
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
                                                <ModifyHomeLayout
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
                                                <ModifyHomeContent
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
                                </Form>
                            );
                        }}
                    </Formik>
                )}
            </Mutation>
        </div>
    );
};

export default withApollo(withStyles(styles)(ModifyHome));
