import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {
    SYSTEM_CMS_CONTENT_URL,
    DECIMAL_RADIX,
    SYSTEM_MODIFY_START_URL
} from "../../../utils/Constants";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Formik, Form } from "formik";
import { Mutation, withApollo } from "react-apollo";
import { CREATE_START, EDIT_START } from "../../../data/mutation";
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
import ModifyStartContent from "./ModifyStartContent";
import {
    MainSectionContainer,
    PageHeader,
    ContainerDiv,
    ContainerDivTab,
    TopButtonsContiner,
    // BlueButtons,
    SubSectionTop,
    MainSubSections
} from "../../home/WelcomeStyleSet";

import TabletMockUp from "../../../images/TabletImageTest.jpg";

const TabContainer = props => {
    return <ContainerDiv>{props.children}</ContainerDiv>;
};

const styles = () => ({
    blueButtons: {
        backgroundColor: "rgb(33, 143, 250)",
        borderRadius: "5px",
        color: "white",
        margin: "2%",
        padding: "5% 0"
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

    const actionAfterSubmission = (
        values,
        data,
        setFieldValue,
        setSubmitting
    ) => {
        // const { history, match } = props;

        console.log("Data received: ", data);
        cleanUp(values);

        if (!Boolean(values.id)) {
            //Set ID if values.id is undefined
            setFieldValue("id", data.id);
        }

        //Update header images
        if (Boolean(data.header) && !isEmpty(data.header)) {
            setFieldValue("headers", [{ ...data.header, uploaded: true }]);
        }

        //Update logo images
        if (Boolean(data.logo) && !isEmpty(data.logo)) {
            setFieldValue("logos", [{ ...data.logo, uploaded: true }]);
        }

        if (toExit) {
            setTab(0);
        }

        //Set Submitting to false
        setSubmitting(false);

        // history.push(
        //     SYSTEM_MODIFY_START_URL.replace(
        //         ":system_id",
        //         parseInt(match.params.system_id)
        //     )
        // );

        console.log("Data received: ", data);
    };

    return (
        <div
            style={{
                width: "100%",
                backgroundColor: lightGreyHeader
            }}
        >
            <Mutation
                mutation={has_data ? EDIT_START : CREATE_START}
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
                                button_text,
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
                                button_text: sanitize(button_text),

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
                                    Boolean(data) && Boolean(data.createStart)
                                        ? data.createStart
                                        : Boolean(data) &&
                                          Boolean(data.editStart)
                                        ? data.editStart
                                        : null,
                                    setFieldValue,
                                    setSubmitting
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
                                    <MainSectionContainer>
                                        <SubSectionTop>
                                            <PageHeader
                                                style={{ width: "75%" }}
                                            >
                                                System Content: start
                                            </PageHeader>
                                            {/* <div
                                        style={{
                                            height: 60,
                                            fontSize: "2em",
                                            fontWeight: 700,
                                            paddingTop: 20,
                                            paddingBottom: 20
                                        }}
                                    > */}
                                            <TopButtonsContiner>
                                                <Button
                                                    type="submit"
                                                    variant="outlined"
                                                    className={
                                                        classes.blueButtons
                                                    }
                                                >
                                                    SAVE & EXIT
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    onClick={saveAndKeepEditing}
                                                    className={
                                                        classes.blueButtons
                                                    }
                                                >
                                                    SAVE & KEEP EDITING
                                                </Button>
                                            </TopButtonsContiner>
                                        </SubSectionTop>
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

                                        <ContainerDivTab
                                            style={{
                                                display: "flex"
                                                // marginTop: "2%"
                                            }}
                                        >
                                            {tab === 0 && (
                                                <TabContainer>
                                                    <containerDiv
                                                        style={{
                                                            height: "100%",
                                                            width: "60%",
                                                            backgroundColor:
                                                                "white",
                                                            marginLeft: "20%"
                                                        }}
                                                    >
                                                        <MainSubSections
                                                            style={{
                                                                width: "100%",

                                                                height: "100%",
                                                                backgroundImage: `url('${TabletMockUp}')`,

                                                                backgroundPosition:
                                                                    "center",
                                                                backgroundSize:
                                                                    "cover",
                                                                backgroundColor:
                                                                    "white"
                                                            }}
                                                        />
                                                    </containerDiv>
                                                </TabContainer>
                                            )}
                                            {tab === 1 && (
                                                <TabContainer>
                                                    <ModifyStartLayout
                                                        values={values}
                                                        errors={errors}
                                                        isSubmitting={
                                                            isSubmitting
                                                        }
                                                        setFieldValue={
                                                            setFieldValue
                                                        }
                                                    />
                                                </TabContainer>
                                            )}
                                            {tab === 2 && (
                                                <TabContainer>
                                                    <ModifyStartContent
                                                        values={values}
                                                        errors={errors}
                                                        isSubmitting={
                                                            isSubmitting
                                                        }
                                                        setFieldValue={
                                                            setFieldValue
                                                        }
                                                    />
                                                </TabContainer>
                                            )}
                                        </ContainerDivTab>
                                    </MainSectionContainer>
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
