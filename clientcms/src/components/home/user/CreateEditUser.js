import React from "react";
// import PropTypes from "prop-types";
import CustomSaveButton from "../../../utils/CustomSaveButton";
import { ContainerDiv } from "../../../utils/Constants";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import {
    OutlinedInput,
    MenuItem,
    InputAdornment,
    IconButton,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import {
    Visibility,
    VisibilityOff,
    Launch as LaunchIcon
} from "@material-ui/icons";
import {
    FieldContainerDiv,
    FieldLabel,
    RolePermissionContainerDiv,
    EachRolePermissionContainerDiv,
    EachRoleContainerDiv,
    AllPermissionContainerDiv
} from "./commonStyle";
import { Query, Mutation } from "react-apollo";
import { getDepartmentListByClient } from "../../../data/query/department";
import Loading from "../../loading/Loading";
import { getUserDetail } from "../../../data/query/user";
import { UPDATE_USER, CREATE_USER } from "../../../data/mutation";
import {
    getUsersByClient,
    getPermissionCategoryList
} from "../../../data/query";
import { withSnackbar } from "notistack";
import RolePermissionsDialog from "./RolePermissionsDialog";

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
                    <Query query={getPermissionCategoryList}>
                        {({
                            loading: loadingPermissionList,
                            error: errorPermissionList,
                            data: { permissionCategories }
                        }) => {
                            if (loadingPermissionList)
                                return <Loading loadingData />;
                            if (errorPermissionList)
                                return (
                                    <React.Fragment>
                                        Error! {errorPermissionList.message}
                                    </React.Fragment>
                                );
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
                                                        Error!{" "}
                                                        {errorMutation.message}
                                                    </React.Fragment>
                                                );
                                            return (
                                                <CreateEditUser
                                                    {...props}
                                                    action={action}
                                                    data={null}
                                                    hasData={false}
                                                    departmentList={
                                                        departmentsByClient
                                                    }
                                                    permissionCategoryList={
                                                        permissionCategories
                                                    }
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
                                            if (loadingUser)
                                                return <Loading loadingData />;
                                            if (errorUser)
                                                return (
                                                    <React.Fragment>
                                                        Error!{" "}
                                                        {errorUser.message}
                                                    </React.Fragment>
                                                );
                                            return (
                                                <Mutation
                                                    mutation={UPDATE_USER}
                                                    refetchQueries={[
                                                        {
                                                            query: getUsersByClient,
                                                            variables: {
                                                                id: client_id
                                                            }
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
                                                            return (
                                                                <Loading
                                                                    loadingData
                                                                />
                                                            );
                                                        if (errorMutation)
                                                            return (
                                                                <React.Fragment>
                                                                    Error!{" "}
                                                                    {
                                                                        errorMutation.message
                                                                    }
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
                                                                permissionCategoryList={
                                                                    permissionCategories
                                                                }
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
                    </Query>
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
    border-left: ${props =>
        props.withBorderLeft ? "1px solid #DDDDDD" : "none"};
    border-right: ${props =>
        props.withBorderRight ? "1px solid #DDDDDD" : "none"};
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
    },
    checkboxLabel: {
        fontSize: "10px"
    }
});

class CreateEditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            password: false,
            confirm_password: false,
            roleData: null
        };
        this.closeDialog = this.closeDialog.bind(this);
    }

    openDialog = roleData => _event => {
        this.setState({ openDialog: true, roleData });
    };

    closeDialog = () => this.setState({ openDialog: false });
    changeVisibility = name => _event =>
        this.setState({ [name]: !this.state[name] });

    //https://stackoverflow.com/a/41031849
    renderTextField = (name, label, required, type) => (
        <FieldContainerDiv style={{ width: "100%" }}>
            <FieldLabel>{label}</FieldLabel>
            <Field
                name={name}
                required={required}
                type={
                    type === "password" && this.state[name]
                        ? "text"
                        : type === "password"
                        ? "password"
                        : "text"
                }
                component={TextField}
                variant="outlined"
                fullWidth={true}
                inputProps={{
                    style: {
                        padding: "12px 10px",
                        backgroundColor: "white"
                    }
                }}
                {...type === "password" && {
                    InputProps: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.changeVisibility(name)}
                                >
                                    {" "}
                                    {this.state[name] ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
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

    renderSelectField = (nameValue, label, optionList) => {
        // console.log(optionList);

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
                        marginBottom: 10
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
            </React.Fragment>
        );
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
                <SectionDiv width="33%">{this.renderSectionOne()}</SectionDiv>
                <SectionDiv width="33%" withBorderLeft withBorderRight>
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
        const { departmentList } = this.props;
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
                    departmentList
                )}
                {this.renderSelectField("roleId", "ROLE", roleList)}
                {this.renderRolePermissionsSection(values)}
            </React.Fragment>
        );
    }

    renderRolePermissionsSection(values) {
        const {
            permissionCategoryList: permissionCategories,
            departmentList,
            classes
        } = this.props;

        let allPermissionsLength = 0;
        permissionCategories.forEach(category => {
            allPermissionsLength += category.permissions.length;
        });

        const departmentData =
            Boolean(values) && Boolean(values.departmentId)
                ? departmentList.find(({ id }) => id === values.departmentId)
                : { roles: [] };

        const roleList =
            Boolean(departmentData) && Array.isArray(departmentData.roles)
                ? departmentData.roles
                : [];

        const roleData =
            Boolean(values) &&
            Boolean(values.roleId) &&
            Array.isArray(roleList) &&
            roleList.length > 0
                ? roleList.find(({ id }) => id === values.roleId)
                : { permissions: [] };

        const permissionIds =
            Boolean(roleData) && Array.isArray(roleData.permissions)
                ? roleData.permissions.map(({ id }) => id)
                : [];

        return (
            <React.Fragment>
                <FieldLabel>DEFAULT ROLE PERMISSIONS</FieldLabel>
                <RolePermissionContainerDiv>
                    <div
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
                                height: "100%"
                            }}
                        >
                            <IconButton
                                style={{
                                    margin: "0px",
                                    padding: "0px"
                                }}
                                aria-label="Expand"
                                onClick={this.openDialog(roleData)}
                                disabled={permissionIds.length === 0}
                            >
                                <LaunchIcon fontSize="large" />
                            </IconButton>
                        </div>
                        <div
                            style={{
                                width: "60%",
                                height: "100%",
                                paddingLeft: "5%",
                                paddingTop: "2%"
                                // padding: 5
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        style={{
                                            color: "#2699FB",
                                            padding: "0"
                                        }}
                                        checked={
                                            permissionIds.length ===
                                            allPermissionsLength
                                        }
                                    />
                                }
                                label="All Permissions"
                            />
                        </div>
                    </div>

                    {permissionCategories.map(
                        (
                            { id: categoryId, name: categoryName, permissions },
                            categoryIndex
                        ) => (
                            <EachRolePermissionContainerDiv
                                key={`CATEGORY-${categoryId}-${categoryIndex}`}
                            >
                                <EachRoleContainerDiv
                                    style={{ fontSize: "10px" }}
                                >
                                    {categoryName}
                                </EachRoleContainerDiv>
                                <AllPermissionContainerDiv>
                                    {permissions.map(
                                        (
                                            {
                                                id: permissionId,
                                                name: permissionName
                                            },
                                            permissionIndex
                                        ) => (
                                            <FormControlLabel
                                                style={{
                                                    padding: "0",
                                                    margin: "0",
                                                    fontSize: "5px"
                                                }}
                                                classes={{
                                                    label: classes.checkboxLabel
                                                }}
                                                key={`PERMISSION-${permissionId}-${permissionIndex}`}
                                                control={
                                                    <Checkbox
                                                        style={{
                                                            padding: "3px 0",
                                                            color: "#2699FB",
                                                            Label: {
                                                                fontSize: "10px"
                                                            }
                                                        }}
                                                        id={permissionId}
                                                        checked={permissionIds.includes(
                                                            permissionId
                                                        )}
                                                    />
                                                }
                                                label={permissionName}
                                            />
                                        )
                                    )}
                                </AllPermissionContainerDiv>
                            </EachRolePermissionContainerDiv>
                        )
                    )}
                </RolePermissionContainerDiv>
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
            {this.renderSelectField(
                "active",
                "STATUS",
                [{ id: 1, name: "ACTIVE" }, { id: 0, name: "INACTIVE" }],
                false
            )}
        </React.Fragment>
    );

    render() {
        const { openDialog, roleData } = this.state;
        const initialValues = this.generateInitialValues();
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
                <RolePermissionsDialog
                    open={openDialog}
                    cancelAction={this.closeDialog}
                    roleData={roleData}
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
