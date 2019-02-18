import React from "react";
import { getCurrentUserQuery as query } from "../../../data/query";
import { Mutation, withApollo, compose, graphql } from "react-apollo";
import {
    getSystemTypes,
    getDeviceTypes,
    getFeaturesByCategories,
    systemsByClientQuery,
    getNewCreatedClientId
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
import validationSchema from "./four/PageFourValidationSchema";
import { log } from "util";

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

const EachClientSystemContainer = styled.div`
    width: 200px;
    height: 180px;
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    position: relative;
    &:hover {
        background-color: lightgrey;
    }
`;

const EachClientSystemContainerSystemText = styled.p`
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 14px;
`;

const EachClientSystemContainerDeviceTypeText = styled.p`
    margin-bottom: 5px;
    color: grey;
    font-size: 12px;
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
        const {
            systemsByClient: { systemsByClient = {} } = {},
            client
        } = this.props;

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
                        flexWrap: "wrap",
                        justifyContent: "center",
                        overflow: "auto",
                        height: "60vh"
                    }}
                >
                    {systemsByClient.length > 0 &&
                        systemsByClient.map(
                            ({ name, system_type, device_type }) => {
                                return (
                                    <EachClientSystemContainer>
                                        <img
                                            style={{
                                                display: "block",
                                                margin: "auto"
                                            }}
                                            src={
                                                system_type.name.includes(
                                                    "TABLET"
                                                )
                                                    ? "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_assets/tabletIcon.png"
                                                    : "https://s3-ap-southeast-2.amazonaws.com/digitalconcierge/cms_assets/touchscreenIcon.png"
                                            }
                                            height=" 80"
                                        />
                                        <EachClientSystemContainerSystemText>
                                            {system_type.name}
                                        </EachClientSystemContainerSystemText>
                                        <hr />
                                        <EachClientSystemContainerSystemText>
                                            {name}
                                        </EachClientSystemContainerSystemText>
                                        <EachClientSystemContainerDeviceTypeText>
                                            {device_type.name}
                                        </EachClientSystemContainerDeviceTypeText>
                                    </EachClientSystemContainer>
                                );
                            }
                        )}
                </div>
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
                    featureCategories.map((eachCategory, index) => {
                        let featureIdPerCategory = [];

                        eachCategory.features.length > 0 &&
                            eachCategory.features.map(({ id }) => {
                                featureIdPerCategory.push(id);
                            });

                        return (
                            <FeatureContainer key={index}>
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
                                            ({ id, name }, index) => {
                                                return (
                                                    <li key={index}>
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
            systemsByClient: { systemsByClient = {} } = {},
            next,
            client
        } = this.props;
        const { getCurrentUser: user } = client.readQuery({ query });

        let new_create_client_id;
        try {
            new_create_client_id = client.readQuery({
                query: getNewCreatedClientId
            }).new_create_client_id;
        } catch {
            return (
                <React.Fragment>
                    <h1>Can't Find ClientId From Step 1</h1>
                    <Loading />
                </React.Fragment>
            );
        }

        if (
            systemTypes.length < 0 &&
            deviceTypes < 0 &&
            featureCategories < 0 &&
            systemsByClient < 0
        )
            return <Loading />;

        return (
            <Mutation
                mutation={CREATE_SYSTEM()}
                refetchQueries={[
                    {
                        query: systemsByClientQuery,
                        variables: { id: 1 }
                    }
                ]}
            >
                {(createSystem, { loading, error }) => {
                    return (
                        <Formik
                            validationSchema={validationSchema}
                            initialValues={{ aif_boolean: "yes" }}
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
                                const { selected_checkboxes } = this.state;

                                createSystem({
                                    variables: {
                                        input: {
                                            name,
                                            aif: aif === "yes" ? true : false,
                                            deviceTypeId: parseInt(
                                                deviceTypeId
                                            ),
                                            numberOfDevices: parseInt(
                                                numberOfDevices
                                            ),
                                            systemTypeId: parseInt(
                                                systemTypeId
                                            ),
                                            clientId: new_create_client_id,
                                            featureIds: selected_checkboxes
                                                .toJS()
                                                .map(item => parseInt(item))
                                        }
                                    }
                                }).then(() => {
                                    console.log("CREATE SYSTEM SUCCEED");
                                    next && next();
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
                                                disabled={
                                                    isSubmitting ||
                                                    Object.keys(errors).length >
                                                        0 ||
                                                    this.state.selected_checkboxes.toJS()
                                                        .length === 0
                                                }
                                            >
                                                CONFIRM & CONTINUE
                                            </Button>
                                        </div>
                                    </Form>
                                );
                            }}
                        />
                    );
                }}
            </Mutation>
        );
    }
}

export default compose(
    withApollo,
    graphql(getDeviceTypes, { name: "getDeviceTypes" }),
    graphql(getSystemTypes, { name: "getSystemTypes" }),
    graphql(getFeaturesByCategories, { name: "getFeaturesByCategories" }),
    graphql(systemsByClientQuery, {
        options: ownProps => ({
            variables: { id: 1 }
        }),
        name: "systemsByClient"
    })
)(WizardCreateClientPageFour);
