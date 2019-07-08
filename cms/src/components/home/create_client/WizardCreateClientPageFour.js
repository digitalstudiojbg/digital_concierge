import React from "react";
// import { getCurrentUserQuery as query } from "../../../data/query";
import { Mutation, withApollo, compose, graphql } from "react-apollo";
import {
    getSystemTypes,
    getDeviceTypes,
    getFeaturesByCategories,
    systemsByClientQuery,
    getNewCreatedClientId
} from "../../../data/query";
import {
    CREATE_SYSTEM,
    EDIT_SYSTEM,
    DELETE_SYSTEM
} from "../../../data/mutation";
import Loading from "../../loading/Loading";
import { Formik, Form, Field } from "formik";
import {
    TextField,
    // fieldToTextField,
    Select,
    RadioGroup
} from "formik-material-ui";
import styled from "styled-components";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import IconButton from "@material-ui/core/IconButton";
import { Set } from "immutable";
import validationSchema from "./four/PageFourValidationSchema";
import { withStyles } from "@material-ui/core/styles";
import {
    FiledContainer,
    FeatureContainer,
    SelectUnselectButton,
    EachClientSystemContainer,
    EachClientSystemContainerSystemText,
    EachClientSystemContainerDeviceTypeText,
    SectionHeader,
    SubFieldContainerDiv,
    FieldContainerDiv,
    FieldLabel,
    ContinueButton,
    SectionDiv,
    // NormalButton,
    ContinueButtonContainer
} from "./CreateClientStyleSet";
import { isEmpty } from "lodash";

const styles = () => ({
    mylabel: {
        fontSize: "10px",
        color: "#5C5C5C"
    },
    inputPdding: {
        padding: "0px"
    },
    myInput: {
        padding: "12px 10px",
        backgroundColor: "white"
    },
    iconButton: {
        borderRadius: 5,
        backgroundColor: "white",
        border: "1px solid rgba(112, 112, 112, 1)",
        height: "50%",
        padding: 5,
        margin: "2% 2% 0 0"
    }
});
//inputProps={{ className: this.props.classes.myInput }}
const renderSelectField = ({ name: nameValue, label, optionList }) => {
    return (
        <React.Fragment>
            <InputLabel>{label}</InputLabel>
            <Field
                name={nameValue}
                component={Select}
                disabled={optionList.length < 1}
                fullWidth={true}
                input={
                    <OutlinedInput
                        style={{ height: 43, backgroundColor: "white" }}
                    />
                }
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

const DeleteButtonContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
`;

class WizardCreateClientPageFour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_checkboxes: Set(),
            selected_system: null
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

    setSelectedSystem = selected_system => _event =>
        this.setState({
            selected_system,
            ...(!isEmpty(selected_system.features) && {
                selected_checkboxes: Set(
                    selected_system.features.map(({ id }) => id)
                )
            })
        });

    deleteSystem = (action, id) => _event => {
        action({ variables: { id } }).then(() =>
            console.log("Delete system " + id + " successfully done!")
        );
    };

    renderAddSystemSection() {
        const {
            getSystemTypes: { systemTypes = {} } = {},
            getDeviceTypes: { deviceTypes = {} } = {}
        } = this.props;
        const { selected_system } = this.state;
        return (
            <div
                style={{
                    width: "20%",
                    //  marginright:"10%",
                    padding: "1% 1% 1% 0",
                    marginLeft: "4%"
                }}
            >
                <SectionHeader>
                    {isEmpty(selected_system) ? "ADD SYSTEM" : "EDIT SYSTEM"}
                </SectionHeader>
                <FiledContainer>
                    <SubFieldContainerDiv>
                        <FieldLabel>SYSTEM NAME</FieldLabel>
                        <Field
                            name="name"
                            //   label="SYSTEM NAME"
                            required={true}
                            type="text"
                            component={TextField}
                            variant="outlined"
                            fullWidth={true}
                            inputProps={{
                                className: this.props.classes.myInput
                            }}
                        />
                    </SubFieldContainerDiv>
                </FiledContainer>
                <FiledContainer>
                    <SubFieldContainerDiv>
                        <FieldLabel>SYSTEM TYPE</FieldLabel>
                        {systemTypes.length > 0 &&
                            renderSelectField({
                                name: "system_type",
                                // label: "SYSTEM TYPE",
                                optionList: systemTypes
                            })}
                    </SubFieldContainerDiv>
                </FiledContainer>
                <FiledContainer>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            display: "inline-block",
                            marginTop: "7px"
                        }}
                    >
                        <p
                            style={{
                                fontSize: "12px",
                                fontFamily: "Roboto",
                                display: "inline-block",
                                marginRight: "20px"
                            }}
                        >
                            AIF
                        </p>
                        <Field
                            name="aif_boolean"
                            label="AIF"
                            required={true}
                            // color="primary"
                            component={RadioGroup}
                            variant="outlined"
                            style={{ display: "inline-block" }}
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio color="Black" />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<Radio color="Black" />}
                                label="No"
                            />
                        </Field>
                    </div>
                </FiledContainer>

                <FiledContainer>
                    <SubFieldContainerDiv>
                        <FieldLabel>DEVICE TYPE</FieldLabel>
                        {deviceTypes.length > 0 &&
                            renderSelectField({
                                name: "device_type",
                                //   label: "DEVICE TYPE",
                                optionList: deviceTypes
                            })}
                    </SubFieldContainerDiv>
                </FiledContainer>
                <FiledContainer>
                    <SubFieldContainerDiv>
                        <FieldLabel>NUMBER OF DEVICES</FieldLabel>
                        <Field
                            name="numberOfDevices"
                            //   label="NUMBER OF DEVICES"
                            required={true}
                            type="text"
                            component={TextField}
                            variant="outlined"
                            fullWidth={true}
                            inputProps={{
                                className: this.props.classes.myInput
                            }}
                        />
                    </SubFieldContainerDiv>
                </FiledContainer>
            </div>
        );
    }

    renderListOfSystem() {
        const {
            systemsByClient: { systemsByClient = {} } = {},
            client,
            next,
            classes
        } = this.props;

        // let new_create_client_id = 1;
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

        return (
            <Mutation
                mutation={DELETE_SYSTEM}
                refetchQueries={[
                    {
                        query: systemsByClientQuery,
                        variables: { id: new_create_client_id }
                    }
                ]}
            >
                {(deleteSystem, { loading }) => {
                    if (loading) return <Loading loadingData />;
                    return (
                        <div
                            style={{
                                width: "37%",
                                padding: "1% 4%",
                                borderLeft: "1px solid #DDDDDD",
                                marginRight: "4%"
                            }}
                        >
                            <SectionHeader>
                                {isEmpty(systemsByClient)
                                    ? "ALL CLIENT SYSTEM"
                                    : "ALL CLIENT SYSTEMS"}
                            </SectionHeader>
                            <FiledContainer>
                                <FieldLabel>SYSTEM CREATED</FieldLabel>
                                <FiledContainer
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        flex: "1",
                                        justifyContent: "left",
                                        height: "430px",
                                        width: "100%",
                                        margin: "1% 0",
                                        overflow: "auto",
                                        padding: "1%",
                                        border: "1px solid #9D9D9D",
                                        borderRadius: "5px",
                                        backgroundColor: "white"
                                    }}
                                >
                                    {systemsByClient.length > 0 &&
                                        systemsByClient.map((system, index) => {
                                            const {
                                                id,
                                                name,
                                                system_type,
                                                device_type
                                            } = system;
                                            return (
                                                <EachClientSystemContainer
                                                    key={`${id}-${index}`}
                                                    onClick={this.setSelectedSystem(
                                                        system
                                                    )}
                                                >
                                                    <DeleteButtonContainer>
                                                        <IconButton
                                                            className={
                                                                classes.iconButton
                                                            }
                                                            onClick={this.deleteSystem(
                                                                deleteSystem,
                                                                id
                                                            )}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </DeleteButtonContainer>
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
                                        })}
                                </FiledContainer>
                            </FiledContainer>

                            <SectionDiv
                                style={{
                                    width: "100%",
                                    height: "100px",
                                    border: "0px",
                                    padding: "0px"
                                }}
                            >
                                <ContinueButtonContainer
                                // style={{
                                //     // flex: 1,
                                //     display: "flex",
                                //     flexDirection: "column",
                                //     justifyContent: "flex-end",
                                //     alignItems: "flex-end"
                                //     //   margin: "6% 3% 0 0"
                                // }}
                                >
                                    <ContinueButton
                                        variant="contained"
                                        color="primary"
                                        disabled={systemsByClient.length <= 0}
                                        onClick={() => {
                                            next && next();
                                        }}
                                    >
                                        CONFIRM & CONTINUE
                                    </ContinueButton>
                                </ContinueButtonContainer>
                            </SectionDiv>
                        </div>
                    );
                }}
            </Mutation>
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

    renderFeatureSection(isSubmitting, errors) {
        const {
            getFeaturesByCategories: { featureCategories = {} } = {}
        } = this.props;
        const { selected_checkboxes, selected_system } = this.state;
        const { classes } = this.props;
        return (
            <div
                style={{
                    width: "30%",
                    padding: 0,
                    marginRight: "2%",
                    // marginLeft: "8%",
                    marginTop: "4%"
                }}
            >
                <FieldLabel>FEATURES REQUIRED</FieldLabel>
                <FieldContainerDiv
                    style={{
                        border: "1px solid #9D9D9D",
                        borderRadius: "5px",
                        overflowY: "scroll",
                        height: "430px",
                        backgroundColor: "white"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            fontSize: "10px",
                            padding: "10px",
                            width: "100%"
                        }}
                    >
                        <div style={{ width: "40%" }}>
                            {/* <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                    //   paddingTop:"0",
                                        padding: 10
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "40%",
                                            height: "100%",
                                        
                                        }}
                                    >
                                        <IconButton
                                            style={{ margin:"0px", padding:"0px" }}
                                            aria-label="Expand"
                                            onClick={this.handleOpenRoleModal}
                                        >
                                            <LaunchIcon fontSize="large"   />
                                        </IconButton>
                           </div> */}
                        </div>
                        <div style={{ width: "60%", paddingLeft: "13px" }}>
                            <FormControlLabel
                                classes={{
                                    label: classes.mylabel
                                }}
                                name="all_features"
                                control={
                                    <Checkbox
                                        style={{
                                            color: "#2699FB",
                                            padding: "0"
                                        }}
                                        //  color="primary"
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
                                    <div
                                        style={{
                                            width: "40%",
                                            paddingLeft: "10px",
                                            height: "5%",
                                            marginBottom: "40%"
                                        }}
                                    >
                                        <FieldLabel>
                                            {eachCategory.name}
                                        </FieldLabel>
                                    </div>
                                    <div
                                        style={{
                                            width: "60%",
                                            border: "1px solid #9D9D9D",
                                            padding: "2% 0 0 5%",
                                            // paddingBottom:"0",
                                            // paddingLeft:"5%",
                                            // paddingTop:"2%",

                                            marginBottom: "5%",
                                            marginRight: "4%",
                                            backgroundColor: "#F7F7F7"
                                        }}
                                    >
                                        <ul style={{ listStyleType: "none" }}>
                                            {eachCategory.features.map(
                                                ({ id, name }, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <FormControlLabel
                                                                classes={{
                                                                    label:
                                                                        classes.mylabel
                                                                }}
                                                                control={
                                                                    <Checkbox
                                                                        style={{
                                                                            color:
                                                                                "#2699FB",
                                                                            padding:
                                                                                "0"
                                                                        }}
                                                                        // color="primary"
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
                                                    justifyContent:
                                                        "space-around"
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
                </FieldContainerDiv>
                <div
                    style={{
                        width: "100%",
                        paddingTop: "20px",
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <Button
                        style={{
                            border: "3px solid #2699FB",
                            width: "40%",
                            fontSize: "14px",
                            color: "#2699FB",
                            backgroundColor: "white",
                            hover: {
                                backgroundColor: "#EBEBF2"
                            }
                        }}
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={
                            isSubmitting ||
                            Object.keys(errors).length > 0 ||
                            this.state.selected_checkboxes.toJS().length === 0
                        }
                    >
                        {isEmpty(selected_system)
                            ? "ADD SYSTEM"
                            : "EDIT SYSTEM"}
                    </Button>
                </div>
            </div>
        );
    }

    render() {
        const {
            getSystemTypes: { systemTypes = {} } = {},
            getDeviceTypes: { deviceTypes = {} } = {},
            getFeaturesByCategories: { featureCategories = {} } = {},
            systemsByClient: { systemsByClient = {} } = {},
            // next,
            client
        } = this.props;
        // const { getCurrentUser: user } = client.readQuery({ query });
        const { selected_system } = this.state;
        const has_data = !isEmpty(selected_system);
        // let new_create_client_id = 1;
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

        const initialValues = isEmpty(selected_system)
            ? {
                  name: "",
                  device_type: null,
                  numberOfDevices: "",
                  system_type: null,
                  aif_boolean: "yes"
              }
            : {
                  id: selected_system.id,
                  name: selected_system.name,
                  aif_boolean: selected_system.aif ? "yes" : "no",
                  device_type:
                      isEmpty(selected_system.device_type) &&
                      !Boolean(selected_system.device_type.id)
                          ? null
                          : selected_system.device_type.id,
                  numberOfDevices: selected_system.numberOfDevices,
                  system_type:
                      isEmpty(selected_system.system_type) &&
                      !Boolean(selected_system.system_type.id)
                          ? null
                          : selected_system.system_type.id
              };

        if (
            systemTypes.length < 0 &&
            deviceTypes.length < 0 &&
            featureCategories.length < 0 &&
            systemsByClient.length < 0
        )
            return <Loading />;

        return (
            <Mutation
                mutation={!has_data ? CREATE_SYSTEM : EDIT_SYSTEM}
                refetchQueries={[
                    {
                        query: systemsByClientQuery,
                        variables: { id: new_create_client_id }
                    }
                ]}
            >
                {(action, { loading, error }) => {
                    return (
                        <Formik
                            enableReinitialize={true}
                            validationSchema={validationSchema}
                            initialValues={initialValues}
                            onSubmit={async (
                                {
                                    id,
                                    name,
                                    aif_boolean: aif,
                                    device_type: deviceTypeId,
                                    numberOfDevices,
                                    system_type: systemTypeId
                                },
                                { setSubmitting, resetForm }
                            ) => {
                                const { selected_checkboxes } = this.state;

                                action({
                                    variables: {
                                        input: {
                                            ...(has_data && { id }),
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
                                            ...(!has_data && {
                                                clientId: new_create_client_id
                                            }),
                                            featureIds: selected_checkboxes
                                                .toJS()
                                                .map(item => parseInt(item))
                                        }
                                    }
                                }).then(() => {
                                    console.log(
                                        `${
                                            has_data ? "EDIT" : "CREATE"
                                        } SYSTEM SUCCEED`
                                    );
                                    setSubmitting(false);
                                    this.setState(
                                        {
                                            selected_system: null,
                                            selected_checkboxes: Set()
                                        },
                                        () => {
                                            resetForm();
                                        }
                                    );
                                });
                            }}
                            render={({ errors, isSubmitting }) => {
                                return (
                                    <Form>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            {this.renderAddSystemSection()}

                                            {this.renderFeatureSection(
                                                isSubmitting,
                                                errors
                                            )}

                                            {this.renderListOfSystem()}
                                        </div>
                                        {/* <div
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
                                                ADD SYSTEM
                                            </Button>
                                        </div> */}
                                        {/* <div
                                            style={{
                                                paddingBottom: "20px"
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={
                                                    systemsByClient.length <= 0
                                                }
                                                onClick={() => {
                                                    next && next();
                                                }}
                                            >
                                                CONFIRM & CONTINUE
                                            </Button>
                                        </div> */}
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
    withStyles(styles),
    graphql(getDeviceTypes, { name: "getDeviceTypes" }),
    graphql(getSystemTypes, { name: "getSystemTypes" }),
    graphql(getFeaturesByCategories, { name: "getFeaturesByCategories" }),
    graphql(systemsByClientQuery, {
        options: ownProps => ({
            variables: {
                id: ownProps.client.readQuery({
                    query: getNewCreatedClientId
                }).new_create_client_id
                // id: 1
            }
        }),
        name: "systemsByClient"
    })
)(WizardCreateClientPageFour);
