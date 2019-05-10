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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import LaunchIcon from "@material-ui/icons/Launch";
import IconButton from "@material-ui/core/IconButton";

import { Set } from "immutable";
import validationSchema from "./four/PageFourValidationSchema";
import {withStyles} from '@material-ui/core/styles';


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
    NormalButton 

    } from "./CreateClientStyleSet";
    

    const styles = theme => ({
        mylabel: {
          fontSize: '10px',
          color: '#5C5C5C'
        },
        inputPdding:{
            padding: '0px'
        }
      });

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
                    <OutlinedInput />
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
                    width: "20%",
                  //  marginright:"10%",
                    padding: "20px 20px 20px 0"
                }}
            >
                <SectionHeader>Add System</SectionHeader>
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
                                    optionList: systemTypes,
                             
                            })}
                    </SubFieldContainerDiv>
                </FiledContainer>
                <FiledContainer>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            display:"inline-block",
                            marginTop:"7px"
                        }}
                    >
                        <p style={{ fontSize: "12px", fontFamily: "Roboto" , display:"inline-block", marginRight:"20px"}}>
                            AIF
                        </p>
                        <Field
                            name="aif_boolean"
                            label="AIF"
                            required={true}
                           // color="primary"
                            component={RadioGroup}
                            variant="outlined"
                            style={{display:"inline-block"}}
                        >
                            <FormControlLabel
                                value="yes"
                                control={<Radio color="Black"/>}
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
            next
        } = this.props;

        return (
            <div
                style={{
                    width: "37%",
                    padding: "20px",
                    borderLeft:"1px solid #DDDDDD",
                }}
            >
                <SectionHeader>All Client System</SectionHeader>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        overflow: "auto",
                        height: "70vh",
                        
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
                <div
                    style={{
                        width: "100%",
                        paddingBottom: "20px",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop:"20%"
                    }}
                >
                    <ContinueButton
                        style={{width:"60%"}}
                        variant="contained"
                        color="primary"
                        disabled={systemsByClient.length <= 0}
                        onClick={() => {
                            next && next();
                        }}
                    >
                        CONFIRM & CONTINUE
                    </ContinueButton>
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

    renderFeatureSection(isSubmitting, errors) {
        const {
            getFeaturesByCategories: { featureCategories = {} } = {}
        } = this.props;
        const { selected_checkboxes } = this.state;
        const { classes } = this.props;
        return (
            
            <div
                style={{
                    width: "30%",
                    padding: "20px",
                    marginRight:"2%",
                    marginLeft:"8%",
                    marginTop:"3%"
                }}
            >
                <FieldLabel >FEATURES REQUIRED</FieldLabel >
                <FieldContainerDiv
                 style={{
                    border:"1px solid #9D9D9D",
                    overflowY:"scroll",
                    height:"430px"
                }}
                >
                <div
                    style={{
                        display: "flex",
                        fontSize: "10px",
                        padding:"10px",
                        width:"100%",
                    }}
                >
                    <div style={{ width: "40%" }} >
                    
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
                                    style={{color:"#2699FB", padding:"0"}}
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
                                <div style={{ width: "40%" , paddingLeft:"10px", height:"5%", marginBottom:"50%"}}>
                                    <FieldLabel >
                                        {eachCategory.name}
                                    </FieldLabel >
                                </div>
                                <div
                                    style={{
                                        width: "60%",
                                        border:"1px solid #9D9D9D",
                                        padding:"2% 0 0 5%",
                                        // paddingBottom:"0",
                                        // paddingLeft:"5%",
                                        // paddingTop:"2%",
                                     
                                        marginBottom:"5%",
                                      marginRight:"5%",
                                        backgroundColor:"#F7F7F7"
                                    }}
                                >
                                    <ul style={{ listStyleType: "none" }}>
                                        {eachCategory.features.map(
                                            ({ id, name }, index) => {
                                                return (
                                                    <li key={index}>
                                                        <FormControlLabel
                                                             classes={{
                                                                  label: classes.mylabel
                                                              }}
                                                            control={
                                                                <Checkbox
                                                                    style={{color:"#2699FB", padding:"0"}}
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
                </FieldContainerDiv> 
                <div
                    style={{
                        width: "100%",
                        paddingTop: "20px",
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <NormalButton 
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={
                            isSubmitting ||
                            Object.keys(errors).length > 0 ||
                            this.state.selected_checkboxes.toJS().length === 0
                        }
                    >
                        ADD SYSTEM
                    </NormalButton >
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
            next,
            client
        } = this.props;
        const { getCurrentUser: user } = client.readQuery({ query });

      // let new_create_client_id =1 ;
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
            deviceTypes.length < 0 &&
            featureCategories.length < 0 &&
            systemsByClient.length < 0
        )
            return <Loading />;

        return (
            <Mutation
                mutation={CREATE_SYSTEM()}
                refetchQueries={[
                    {
                        query: systemsByClientQuery,
                        variables: { id: new_create_client_id }
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
                                { setSubmitting, resetForm }
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
                                    resetForm({});
                                    setSubmitting(false);
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
            }
        }),
        name: "systemsByClient"
    })
)(WizardCreateClientPageFour);

