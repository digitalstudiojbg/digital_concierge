import React from "react";
// import PropTypes from "prop-types";
import CustomSaveButton from "../../../utils/CustomSaveButton";
import { ContainerDiv } from "../../../utils/Constants";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import { OutlinedInput, MenuItem, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { FieldContainerDiv, FieldLabel, NormalButton } from "./commonStyle";
import { Query, Mutation } from "react-apollo";
import { getDepartmentListByClient } from "../../../data/query/department";
import Loading from "../../loading/Loading";
import { getUserDetail } from "../../../data/query/user";
import { UPDATE_USER, CREATE_USER, CREATE_DEPARTMENT, CREATE_ROLE } from "../../../data/mutation";
import { getUsersByClient } from "../../../data/query";
import { withSnackbar } from 'notistack';
import CreateDepartmentDialog from "./CreateDepartmentDialog";
import CreateRoleDialog from "./CreateRoleDialog";

const CreateEditUserHOC = props => {
    const { match } = props;
    const { params } = match || {};
    const { user_id, client_id } = params || {};
    return (
        <Query query={getDepartmentListByClient} variables={{ id: client_id }}>
            {({
                loading: loadingDepartmentList,
                error: errorDepartmentList,
                data: { departmentsByClient }
            }) => {
                if (loadingDepartmentList) return <Loading data />;
                if (errorDepartmentList)
                    return (
                        <React.Fragment>
                            Error! {errorDepartmentList.message}
                        </React.Fragment>
                    );
                return (
                    <Mutation mutation={CREATE_DEPARTMENT} refetchQueries={[ { query: getDepartmentListByClient, variables: { id: client_id } } ]}>
                        {(createDepartment, { loading: loadingCreateDepartment, error: errorCreateDepartment }) => (
                            <Mutation mutation={CREATE_ROLE} refetchQueries={[ { query: getDepartmentListByClient, variables: { id: client_id } } ]}>
                                {(createRole, { loading: loadingCreateRole, error: errorCreateRole }) => {
                                    // console.log("USER ID is ", user_id);
                                    if (user_id === "new") {
                                        //Create a new user
                                        return (
                                            <Mutation
                                                mutation={CREATE_USER}
                                                refetchQueries={[
                                                    {
                                                        query: getUsersByClient,
                                                        variables: { id: client_id }
                                                    }
                                                ]}
                                            >
                                                {(
                                                    action,
                                                    {
                                                        loading: loadingMutation,
                                                        error: errorMutation
                                                    }
                                                ) => {
                                                    if (loadingMutation)
                                                        return <Loading loadingData />;
                                                    if (errorMutation)
                                                        return (
                                                            <React.Fragment>
                                                                Error! {errorMutation.message}
                                                            </React.Fragment>
                                                        );
                                                    return (
                                                        <CreateEditUser
                                                            {...props}
                                                            action={action}
                                                            data={null}
                                                            hasData={false}
                                                            departmentList={departmentsByClient}
                                                            createDepartment={createDepartment}
                                                            loadingCreateDepartment={loadingCreateDepartment}
                                                            errorCreateDepartment={errorCreateDepartment}
                                                            createRole={createRole}
                                                            loadingCreateRole={loadingCreateRole}
                                                            errorCreateRole={errorCreateRole}
                                                        />
                                                    );
                                                }}
                                            </Mutation>
                                        );
                                    } else {
                                        //Modify existing user
                                        return (
                                            <Query
                                                query={getUserDetail}
                                                variables={{ id: user_id }}
                                            >
                                                {({
                                                    loading: loadingUser,
                                                    error: errorUser,
                                                    data: { user }
                                                }) => {
                                                    if (loadingUser) return <Loading loadingData />;
                                                    if (errorUser)
                                                        return (
                                                            <React.Fragment>
                                                                Error! {errorUser.message}
                                                            </React.Fragment>
                                                        );
                                                    return (
                                                        <Mutation
                                                            mutation={UPDATE_USER}
                                                            refetchQueries={[
                                                                {
                                                                    query: getUsersByClient,
                                                                    variables: { id: client_id }
                                                                }
                                                            ]}
                                                        >
                                                            {(
                                                                action,
                                                                {
                                                                    loading: loadingMutation,
                                                                    error: errorMutation
                                                                }
                                                            ) => {
                                                                if (loadingMutation)
                                                                    return <Loading loadingData />;
                                                                if (errorMutation)
                                                                    return (
                                                                        <React.Fragment>
                                                                            Error!{" "}
                                                                            {errorMutation.message}
                                                                        </React.Fragment>
                                                                    );
                                                                return (
                                                                    <CreateEditUser
                                                                        {...props}
                                                                        action={action}
                                                                        data={user}
                                                                        hasData={true}
                                                                        departmentList={
                                                                            departmentsByClient
                                                                        }
                                                                        createDepartment={createDepartment}
                                                                        loadingCreateDepartment={loadingCreateDepartment}
                                                                        errorCreateDepartment={errorCreateDepartment}
                                                                        createRole={createRole}
                                                                        loadingCreateRole={loadingCreateRole}
                                                                        errorCreateRole={errorCreateRole}
                                                                    />
                                                                );
                                                            }}
                                                        </Mutation>
                                                    );
                                                }}
                                            </Query>
                                        );
                                    }                  
                                }}
                            </Mutation>
                        )}
                    </Mutation>
                );
            }}
        </Query>
    );
};

const ContainerDivModified = styled(ContainerDiv)`
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`;

const FormContainerDiv = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
`;

const SectionDiv = styled.div`
    width: ${props => props.width};
    height: ${props => (Boolean(props.height) ? props.height : "100%")};
    display: flex;
    flex-direction: column;
    padding: 0 4%;
    border-right: ${props => (props.withBorder ? "1px solid #DDDDDD" : "none")};
`;

const SECTION_ONE_FIELDS = [
    {
        name: "name",
        label: "USER",
        required: true,
        type: "text"
    },
    {
        name: "email",
        label: "EMAIL",
        required: true,
        type: "text"
    }
];
// const SECTION_TWO_FIELDS = (departmentList, roleList) => [
//     {
//         name: "departmentId",
//         label: "DEPARTMENT",
//         type: "select",
//         required: true,
//         optionList: departmentList
//     },
//     {
//         name: "roleId",
//         label: "ROLE",
//         type: "select",
//         required: true,
//         optionList: roleList
//     }
// ];
const SECTION_THREE_FIELDS = [
    {
        name: "password",
        label: "PASSWORD",
        required: false,
        type: "password"
    },
    {
        name: "confirm_password",
        label: "CONFIRM PASSWORD",
        required: false,
        type: "password"
    }
];

const styles = () => ({
    textInput: {
        padding: "12px 10px",
        backgroundColor: "white"
    }
});

class CreateEditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            which: "",
            otherSubmitData: null,
            password: false,
            confirm_password: false
        }
        this.openDepartmentDialog = this.openDepartmentDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    openDepartmentDialog = () => {
        const { match } = this.props;
        const { params } = match || {};
        const { client_id } = params || {};
        this.setState({
            openDialog: true,
            which: "DEPARTMENT",
            otherSubmitData: { clientId: client_id }
        });
    }

    openRoleDialog = values => _event => {
        const { match } = this.props;
        const { params } = match || {};
        const { client_id } = params || {};
        if (Boolean(values) && Boolean(values.departmentId)) {
            this.setState({
                openDialog: true,
                which: "ROLE",
                otherSubmitData: { clientId: client_id, departmentId: values.departmentId, isStandardRole: false }
            });
        }
    }

    closeDialog = () => this.setState({ openDialog: false, which: "", otherSubmitData: null });
    changeVisibility = name => _event => this.setState({ [name]: !this.state[name] });

    //https://stackoverflow.com/a/41031849
    renderTextField = (name, label, required, type) => (
        <FieldContainerDiv style={{ width: "100%" }}>
            <FieldLabel>{label}</FieldLabel>
            <Field
                name={name}
                required={required}
                type={type === "password" && this.state[name] ? "text" : type === "password" ? "password" : "text"}
                component={TextField}
                variant="outlined"
                fullWidth={true}
                inputProps={{
                    style: {
                        padding: "12px 10px",
                        backgroundColor: "white"
                    }
                }}
                    { ...( type === "password" && { 
                        InputProps: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.changeVisibility(name)}
                                    >   {this.state[name] ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        } 
                    } ) }
            />
        </FieldContainerDiv>
    );

    generateInitialValues = () => {
        const { hasData, data } = this.props;
        return hasData && Boolean(data)
            ? {
                  id: Boolean(data.id) ? data.id : null,
                  name: Boolean(data.name) ? data.name : "",
                  email: Boolean(data.email) ? data.email : "",
                  departmentId:
                      Array.isArray(data.roles) &&
                      data.roles.length > 0 &&
                      Boolean(data.roles[0]) &&
                      Boolean(data.roles[0].department) &&
                      Boolean(data.roles[0].department.id)
                          ? data.roles[0].department.id
                          : null,
                  roleId:
                      Array.isArray(data.roles) &&
                      data.roles.length > 0 &&
                      Boolean(data.roles[0]) &&
                      Boolean(data.roles[0].id)
                          ? data.roles[0].id
                          : null,
                  active: data.active ? 1 : 0,
                  password: "",
                  confirm_password: ""
              }
            : {
                  id: null,
                  name: "",
                  email: "",
                  departmentId: null,
                  roleId: null,
                  active: 1,
                  password: "",
                  confirm_password: ""
              };
    };

    renderSelectField = (nameValue, label, optionList, withButton, buttonLabel, onButtonClick, loading, errorMessage) => {
        // console.log(optionList);

        if (loading) {
            return (
                <Loading loadingData />
            );
        } else {
            if (withButton && errorMessage.length > 0) {
                const { enqueueSnackbar } = this.props;
                enqueueSnackbar(errorMessage, { 
                    variant: 'error',
                });
            }
            return (
                <React.Fragment>
                    <FieldLabel
                        style={{
                            color: "#5c5c5c",
                            fontsize: "10px",
                            marginBottom: "5px"
                        }}
                    >
                        {label}
                    </FieldLabel>
                    <Field
                        style={{
                            height: 43,
                            backgroundColor: "white",
                            marginBottom: 10,
                        }}
                        name={nameValue}
                        component={Select}
                        disabled={optionList.length < 1}
                        fullWidth={true}
                        input={<OutlinedInput />}
                    >
                        {/* <MenuItem value="null" disabled>
                            {label}
                        </MenuItem> */}
                        {optionList.map(({ id, name }, index) => (
                            <MenuItem
                                key={`ITEM-${name}-${id}-${index}`}
                                value={id}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Field>
                    {withButton && (
                        <NormalButton onClick={onButtonClick} type="button">
                            {buttonLabel}
                        </NormalButton>
                    )}
                </React.Fragment>
            );
        }
    };

    renderField(fieldData) {
        const { type, name, label, required, optionList } = fieldData;
        if (type === "text" || type === "password") {
            return this.renderTextField(name, label, required, type);
        } else if (type === "select") {
            return this.renderSelectField(name, label, optionList);
        } else {
            return <React.Fragment />;
        }
    }
    renderHeaderSection() {
        const { hasData } = this.props;
        const headerText = hasData ? "MODIFY USER" : "CREATE USER";
        return (
            <div style={{ width: "100%", height: 100, display: "flex" }}>
                <div style={{ width: "90%" }}>{headerText}</div>
                <div
                    style={{
                        width: "10%",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <CustomSaveButton
                        options={[
                            {
                                label: "SAVE & EXIT",
                                action: () => alert("SAVE & EXIT")
                            },
                            {
                                label: "SAVE & KEEP EDITING",
                                action: () => alert("SAVE & KEEP EDITING")
                            }
                        ]}
                    />
                </div>
            </div>
        );
    }
    renderFormSection(values) {
        return (
            <FormContainerDiv>
                <SectionDiv width="33%" withBorder>
                    {this.renderSectionOne()}
                </SectionDiv>
                <SectionDiv width="33%" withBorder>
                    {/* SECTION TWO */}
                    {this.renderSectionTwo(values)}
                </SectionDiv>
                <SectionDiv width="33%">{this.renderSectionThree()}</SectionDiv>
            </FormContainerDiv>
        );
    }
    renderSectionOne() {
        return (
            <React.Fragment>
                {SECTION_ONE_FIELDS.map((fieldData, index) => (
                    <React.Fragment key={`SECTION-ONE-${index}`}>
                        {this.renderField(fieldData)}
                    </React.Fragment>
                ))}
            </React.Fragment>
        );
    }
    renderSectionTwo(values) {
        const { departmentList, loadingCreateDepartment, loadingCreateRole, errorCreateDepartment, errorCreateRole } = this.props;
        // console.log("Department list ", departmentList);
        const departmentData = Boolean(values.departmentId)
            ? departmentList.find(({ id }) => id === values.departmentId)
            : { roles: [] };
        // console.log("Department data ", departmentData);
        const roleList =
            Boolean(departmentData) && Array.isArray(departmentData.roles)
                ? departmentData.roles
                : [];
        // console.log("Role list ", roleList);
        // const SECTION_TWO_FIELD_LIST = SECTION_TWO_FIELDS(
        //     departmentList,
        //     roleList
        // );
        // console.log("FIELDS ", SECTION_TWO_FIELD_LIST);

        return (
            <React.Fragment>
                {/* {SECTION_TWO_FIELD_LIST.map((fieldData, index) => (
                    <React.Fragment key={`SECTION-TWO-${index}`}>
                        {this.render(fieldData)}
                    </React.Fragment>
                ))} */}
                {this.renderSelectField(
                    "departmentId",
                    "DEPARTMENT",
                    departmentList,
                    true,
                    "CREATE DEPARTMENT",
                    this.openDepartmentDialog,
                    loadingCreateDepartment,
                    Boolean(errorCreateDepartment) && Boolean(errorCreateDepartment.message) ? errorCreateDepartment.message : ""
                )}
                {this.renderSelectField(
                    "roleId",
                    "ROLE",
                    roleList,
                    true,
                    "CREATE ROLE",
                    this.openRoleDialog(values),
                    loadingCreateRole,
                    Boolean(errorCreateRole) && Boolean(errorCreateRole.message) ? errorCreateRole.message : "")}
            </React.Fragment>
        );
    }
    renderSectionThree = () => (
        <React.Fragment>
            {SECTION_THREE_FIELDS.map((fieldData, index) => (
                <React.Fragment key={`SECTION-THREE-${index}`}>
                    {this.renderField(fieldData)}
                </React.Fragment>
            ))}
            {this.renderSelectField("active", "STATUS", [{id: 1, name: "ACTIVE"}, { id: 0, name: "INACTIVE" }], false)}
        </React.Fragment>
    );
    render() {
        const { openDialog, which, otherSubmitData } = this.state;
        const initialValues = this.generateInitialValues();
        // console.log("Initial values ", initialValues);
        const { createDepartment, createRole } = this.props;
        const submitAction = which === "DEPARTMENT" ? createDepartment : which === "ROLE" ? createRole : () => {};
        const SelectedDialog = which === "ROLE" ? CreateRoleDialog : CreateDepartmentDialog;
        return (
            <ContainerDivModified>
                <Formik initialValues={initialValues}>
                    {({ values }) => (
                        <Form>
                            {this.renderHeaderSection()}
                            {this.renderFormSection(values)}
                        </Form>
                    )}
                </Formik>
                <SelectedDialog
                    open={openDialog}
                    submitAction={submitAction}
                    cancelAction={this.closeDialog}
                    which={which}
                    otherSubmitData={otherSubmitData}
                />
            </ContainerDivModified>
        );
    }
}

// CreateEditUser.propTypes = {
//     options: PropTypes.arrayOf(
//         PropTypes.shape({
//             label: PropTypes.string.isRequired,
//             action: PropTypes.func.isRequired
//         })
//     ).isRequired
// };

export default withSnackbar(withStyles(styles)(CreateEditUserHOC));
