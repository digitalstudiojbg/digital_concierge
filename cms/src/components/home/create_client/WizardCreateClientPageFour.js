import React from "react";
import { getCurrentUserQuery as query } from "../../../data/query";
import { withApollo, compose, graphql } from "react-apollo";
import {
    getSystemTypes,
    getDeviceTypes,
    getFeaturesByCategories
} from "../../../data/query";
import Loading from "../../loading/Loading";
import { Formik, Form, Field } from "formik";
import {
    TextField,
    fieldToTextField,
    Select,
    RadioGroup,
    Checkbox
} from "formik-material-ui";
import styled from "styled-components";
import {
    FormControlLabel,
    Radio,
    Button,
    InputLabel,
    MenuItem
} from "@material-ui/core";

const FiledContainer = styled.div`
    padding-bottom: 20px;
`;

const PermissionContainer = styled.div`
    display: flex;
    font-size: 14px;
    transition: all 0.3s ease-in-out;
    align-items: center;
    border-radius: 5px;
    &:hover {
        background-color: lightgrey;
    }
`;

const SelectUnselectButton = styled.p`
    color: blue;
    cursor: pointer;
    margin-bottom: 0;
    &:hover {
        font-weight: bold;
    }
`;

const renderSelectField = ({ name: nameValue, label, optionList }) => {
    return (
        <React.Fragment>
            <InputLabel>{label}</InputLabel>
            <Field
                name={nameValue}
                component={Select}
                disabled={optionList.length < 1}
                fullWidth={true}
            >
                <MenuItem value="null" disabled>
                    {label}
                </MenuItem>
                {optionList.map(({ id, name }, index) => (
                    <MenuItem key={`ITEM-${name}-${id}-${index}`} value={id}>
                        {name}
                    </MenuItem>
                ))}
            </Field>
        </React.Fragment>
    );
};

class WizardCreateClientPageFour extends React.Component {
    renderAddSystemSection() {
        const {
            getSystemTypes: { systemTypes = {} } = {},
            getDeviceTypes: { deviceTypes = {} } = {}
        } = this.props;
        return (
            <div
                style={{
                    width: "33%",
                    padding: "20px 20px 20px 0"
                }}
            >
                <h1>Add System</h1>
                <FiledContainer>
                    <Field
                        name="name"
                        label="SYSTEM NAME"
                        required={true}
                        type="text"
                        component={TextField}
                        variant="outlined"
                        fullWidth={true}
                    />
                </FiledContainer>
                <FiledContainer>
                    {systemTypes.length > 0 &&
                        renderSelectField({
                            name: "system_type",
                            label: "SYSTEM TYPE",
                            optionList: systemTypes
                        })}
                </FiledContainer>
                <FiledContainer>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center"
                        }}
                    >
                        <p style={{ fontSize: "14px", fontFamily: "Roboto" }}>
                            AIF
                        </p>
                        <Field
                            name="aif_boolean"
                            label="AIF"
                            required={true}
                            color="primary"
                            component={RadioGroup}
                            variant="outlined"
                            fullWidth={true}
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio color="primary" />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio color="primary" />}
                                label="No"
                            />
                        </Field>
                    </div>
                </FiledContainer>

                <FiledContainer>
                    {deviceTypes.length > 0 &&
                        renderSelectField({
                            name: "device_type",
                            label: "DEVICE TYPE",
                            optionList: deviceTypes
                        })}
                </FiledContainer>
                <FiledContainer>
                    <Field
                        name="numberOfDevices"
                        label="NUMBER OF DEVICES"
                        required={true}
                        type="text"
                        component={TextField}
                        variant="outlined"
                        fullWidth={true}
                    />
                </FiledContainer>
            </div>
        );
    }

    renderListOfSystem() {
        return (
            <div
                style={{
                    width: "33%",
                    padding: "20px 20px 20px 0"
                }}
            >
                <h1>Feature</h1>
            </div>
        );
    }

    renderFeatureSection() {
        const {
            getFeaturesByCategories: { featureCategories = {} } = {}
        } = this.props;
        console.log(featureCategories);

        return (
            <div
                style={{
                    width: "33%",
                    padding: "20px 20px 20px 0"
                }}
            >
                <h1>All Client System</h1>
                <div
                    style={{
                        display: "flex",
                        fontSize: "14px"
                    }}
                >
                    <div style={{ width: "30%" }} />
                    <div style={{ width: "70%", paddingLeft: "10px" }}>
                        <FormControlLabel
                            control={
                                <Field
                                    id="all_features"
                                    name="all_features"
                                    label="ALL FEATURES"
                                    required={true}
                                    color="primary"
                                    component={Checkbox}
                                    variant="outlined"
                                    fullWidth={true}
                                />
                            }
                            label="ALL FEATURES"
                        />
                    </div>
                </div>

                {featureCategories.length > 0 &&
                    featureCategories.map(eachCategory => {
                        return (
                            <PermissionContainer>
                                <div style={{ width: "30%" }}>
                                    <p
                                        style={{
                                            /*textOverflow: "ellipsis",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            width: "100%"*/
                                            textAlign: "center"
                                        }}
                                    >
                                        {eachCategory.name}
                                    </p>
                                </div>
                                <div
                                    style={{
                                        width: "70%",
                                        paddingLeft: "10px"
                                    }}
                                >
                                    <ul style={{ listStyleType: "none" }}>
                                        {eachCategory.features.map(
                                            eachfeature => {
                                                return (
                                                    <li>
                                                        <FormControlLabel
                                                            control={
                                                                <Field
                                                                    id={
                                                                        eachfeature.name
                                                                    }
                                                                    name={
                                                                        eachfeature.name
                                                                    }
                                                                    label={
                                                                        eachfeature.name
                                                                    }
                                                                    required={
                                                                        true
                                                                    }
                                                                    color="primary"
                                                                    component={
                                                                        Checkbox
                                                                    }
                                                                    variant="outlined"
                                                                    fullWidth={
                                                                        true
                                                                    }
                                                                />
                                                            }
                                                            label={
                                                                eachfeature.name
                                                            }
                                                        />
                                                    </li>
                                                );
                                            }
                                        )}
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-around"
                                            }}
                                        >
                                            <SelectUnselectButton>
                                                Select All
                                            </SelectUnselectButton>
                                            <SelectUnselectButton>
                                                Unselect All
                                            </SelectUnselectButton>
                                        </div>
                                    </ul>
                                </div>
                            </PermissionContainer>
                        );
                    })}
            </div>
        );
    }

    render() {
        const {
            getSystemTypes: { systemTypes = {} } = {},
            getDeviceTypes: { deviceTypes = {} } = {},
            getFeaturesByCategories: { featureCategories = {} } = {},
            client
        } = this.props;
        const { getCurrentUser: user } = client.readQuery({ query });

        /* try {
            client.readQuery({
                query: getNewCreatedClientId
            });
        } catch {
            return (
                <React.Fragment>
                    <h1>Can't Find ClientId From Step 1</h1>
                    <Loading />
                </React.Fragment>
            );
        }*/

        if (systemTypes.length < 0 && deviceTypes < 0 && featureCategories < 0)
            return <Loading />;
        console.log(featureCategories);

        return (
            <Formik
                initialValues={{}}
                onSubmit={async (values, { setSubmitting }) => {
                    console.log("On-submit");
                    console.log(values);
                }}
                render={({ errors, values, isSubmitting }) => {
                    console.log(errors);
                    return (
                        <Form>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}
                            >
                                {this.renderAddSystemSection()}

                                {this.renderFeatureSection()}

                                {this.renderListOfSystem()}
                            </div>
                            <div
                                style={{
                                    paddingBottom: "20px"
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    CONFIRM & CONTINUE
                                </Button>
                            </div>
                        </Form>
                    );
                }}
            />
        );
    }
}

export default compose(
    withApollo,
    graphql(getDeviceTypes, { name: "getDeviceTypes" }),
    graphql(getSystemTypes, { name: "getSystemTypes" }),
    graphql(getFeaturesByCategories, { name: "getFeaturesByCategories" })
)(WizardCreateClientPageFour);
