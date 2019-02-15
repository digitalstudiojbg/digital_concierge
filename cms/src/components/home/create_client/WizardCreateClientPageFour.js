import React from "react";
import { getCurrentUserQuery as query } from "../../../data/query";
import { withApollo, compose, graphql } from "react-apollo";
import {
    getSystemTypes,
    getDeviceTypes,
    getFeaturesByCategories
} from "../../../data/query";
import { CREATE_SYSTEM } from "../../../data/mutation";
import Loading from "../../loading/Loading";
import { Formik, Form, Field } from "formik";
import {
    TextField,
    fieldToTextField,
    Select,
    RadioGroup
} from "formik-material-ui";
import styled from "styled-components";
import {
    FormControlLabel,
    Radio,
    Button,
    InputLabel,
    MenuItem,
    Checkbox
} from "@material-ui/core";
import { Set } from "immutable";

const FiledContainer = styled.div`
    padding-bottom: 20px;
`;

const FeatureContainer = styled.div`
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
    constructor(props) {
        super(props);
        this.state = {
            selected_checkboxes: Set()
        };
    }

    handleFeatures(id) {
        const { selected_checkboxes } = this.state;

        if (selected_checkboxes.includes(id)) {
            //Remove from selected checkboxes
            this.setState({
                selected_checkboxes: selected_checkboxes.delete(id)
            });
        } else {
            //Add to selected checkboxes
            this.setState({
                selected_checkboxes: selected_checkboxes.add(id)
            });
        }
    }

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
                <h1>All Client System</h1>
            </div>
        );
    }

    getAllFeatureId() {
        const {
            getFeaturesByCategories: { featureCategories = {} } = {}
        } = this.props;

        let output = [];

        featureCategories.length > 0 &&
            featureCategories.map(eachCategory => {
                eachCategory.features.map(({ id }) => {
                    output.push(id);
                });
            });
        return output;
    }

    renderFeatureSection() {
        const {
            getFeaturesByCategories: { featureCategories = {} } = {}
        } = this.props;
        const { selected_checkboxes } = this.state;
        return (
            <div
                style={{
                    width: "33%",
                    padding: "20px 20px 20px 0"
                }}
            >
                <h1>Features</h1>
                <div
                    style={{
                        display: "flex",
                        fontSize: "14px"
                    }}
                >
                    <div style={{ width: "30%" }} />
                    <div style={{ width: "70%", paddingLeft: "10px" }}>
                        <FormControlLabel
                            name="all_features"
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={
                                        selected_checkboxes.size ===
                                            this.getAllFeatureId().length &&
                                        selected_checkboxes.size !== 0
                                    }
                                    onChange={() => {
                                        if (
                                            selected_checkboxes.size !==
                                            this.getAllFeatureId().length
                                        ) {
                                            this.setState({
                                                selected_checkboxes: selected_checkboxes.union(
                                                    this.getAllFeatureId()
                                                )
                                            });
                                        } else {
                                            this.setState({
                                                selected_checkboxes: Set()
                                            });
                                        }
                                    }}
                                />
                            }
                            label="ALL FEATURES"
                        />
                    </div>
                </div>
                {featureCategories.length > 0 &&
                    featureCategories.map(eachCategory => {
                        let featureIdPerCategory = [];

                        eachCategory.features.length > 0 &&
                            eachCategory.features.map(({ id }) => {
                                featureIdPerCategory.push(id);
                            });

                        return (
                            <FeatureContainer>
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
                                            ({ id, name }) => {
                                                return (
                                                    <li>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    color="primary"
                                                                    checked={selected_checkboxes.includes(
                                                                        id
                                                                    )}
                                                                    onChange={this.handleFeatures.bind(
                                                                        this,
                                                                        id
                                                                    )}
                                                                />
                                                            }
                                                            label={name}
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
                                            <SelectUnselectButton
                                                onClick={() => {
                                                    this.setState({
                                                        selected_checkboxes: selected_checkboxes.union(
                                                            featureIdPerCategory
                                                        )
                                                    });
                                                }}
                                            >
                                                Select All
                                            </SelectUnselectButton>
                                            <SelectUnselectButton
                                                onClick={() => {
                                                    this.setState({
                                                        selected_checkboxes: selected_checkboxes.subtract(
                                                            featureIdPerCategory
                                                        )
                                                    });
                                                }}
                                            >
                                                Unselect All
                                            </SelectUnselectButton>
                                        </div>
                                    </ul>
                                </div>
                            </FeatureContainer>
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

        return (
            <Formik
                initialValues={{}}
                onSubmit={async (
                    {
                        name,
                        aif_boolean: aif,
                        device_type: deviceTypeId,
                        numberOfDevices,
                        system_type: systemTypeId
                    },
                    { setSubmitting }
                ) => {
                    console.log(name);
                    console.log(aif);
                    console.log(deviceTypeId);
                    console.log(numberOfDevices);
                    console.log(systemTypeId);

                    const { selected_checkboxes } = this.state;

                    this.props.createSystem({
                        variables: {
                            input: {
                                name,
                                aif: aif === "yes" ? true : false,
                                deviceTypeId: parseInt(deviceTypeId),
                                numberOfDevices: parseInt(numberOfDevices),
                                systemTypeId: parseInt(systemTypeId),
                                clientId: 1,
                                featureIds: selected_checkboxes
                                    .toJS()
                                    .map(item => parseInt(item))
                            }
                        }
                    });
                }}
                render={({ errors, values, isSubmitting }) => {
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
    graphql(getFeaturesByCategories, { name: "getFeaturesByCategories" }),
    graphql(CREATE_SYSTEM(), { name: "createSystem" })
)(WizardCreateClientPageFour);
