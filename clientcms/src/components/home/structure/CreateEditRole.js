import React, { useState } from "react";
import styled from "styled-components";
import { Query, Mutation } from "react-apollo";
import { getDepartmentListByClient } from "../../../data/query/department";
import {
    getRoleList,
    getRoleDetail,
    getPermissionCategoryList
} from "../../../data/query";
import { withSnackbar } from "notistack";
import { Formik, Form, Field } from "formik";
import {
    ContainerDiv,
    WELCOME_URL,
    ROLE_EDIT_URL
} from "../../../utils/Constants";
import {
    FieldContainerDiv,
    FieldLabel,
    EachRolePermissionContainerDiv,
    EachRoleContainerDiv,
    AllPermissionContainerDiv
} from "../user/commonStyle";
import { TextField, Select } from "formik-material-ui";
import {
    OutlinedInput,
    MenuItem,
    FormControlLabel,
    Checkbox,
    IconButton,
    Button
} from "@material-ui/core";
import { Launch as LaunchIcon } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { Set } from "immutable";
import Loading from "../../loading/Loading";
import RolePermissionsDialog from "./RolePermissionsDialog";
import CustomSaveButton from "../../../utils/CustomSaveButton";
import ConfirmExitDialog from "../user/ConfirmExitDialog";
import { CREATE_ROLE, EDIT_ROLE } from "../../../data/mutation";
import { createRoleSchema, modifyRoleSchema } from "./validationSchema";

const ContainerDivModified = styled(ContainerDiv)`
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`;

const FormContainerDiv = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
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

const RolePermissionContainerDiv = styled.div`
    width: 100%;
    height: 500px;
    overflow-y: scroll;
    border: ${props => (props.error ? "1px solid red" : "1px solid #9d9d9d")};
    background-color: white;
`;

const styles = () => ({
    checkboxLabel: {
        fontSize: "10px"
    },
    buttonCancel: {
        backgroundColor: "#595959",
        color: "white",
        fontFamily: "Source Sans Pro, sans-serif",
        marginBottom: "2%"
    }
});

const CreateEditRoleHOC = props => {
    const [createdRoleId, setCreatedRoleId] = useState(null);
    return (
        <Query query={getPermissionCategoryList}>
            {({
                loading: loadingPermission,
                error: errorPermission,
                data: { permissionCategories }
            }) => (
                <Query
                    query={getDepartmentListByClient}
                    variables={{ id: props.match.params.client_id }}
                >
                    {({
                        loading: loadingDepartment,
                        error: errorDepartment,
                        data: { departmentsByClient: departmentList }
                    }) => {
                        return (
                            <Query
                                query={getRoleList}
                                variables={{
                                    clientId: props.match.params.client_id
                                }}
                            >
                                {({
                                    loading: loadingRoleList,
                                    error: errorRoleList,
                                    data: { rolesByClientId: roleList }
                                }) => {
                                    if (props.match.params.role_id === "new") {
                                        const initialValues = {
                                            id: null,
                                            name: "",
                                            departmentId: null,
                                            copyRoleId: null,
                                            permissionIds: Set()
                                        };
                                        return (
                                            <Mutation
                                                mutation={CREATE_ROLE}
                                                refetchQueries={[
                                                    {
                                                        query: getRoleList,
                                                        variables: {
                                                            clientId:
                                                                props.match
                                                                    .params
                                                                    .client_id
                                                        }
                                                    },
                                                    {
                                                        query: getDepartmentListByClient,
                                                        variables: {
                                                            id:
                                                                props.match
                                                                    .params
                                                                    .client_id
                                                        }
                                                    }
                                                ]}
                                            >
                                                {(
                                                    createRoleAction,
                                                    {
                                                        loading: loadingMutation,
                                                        error: errorMutation
                                                    }
                                                ) => {
                                                    const handleSubmit = (
                                                        values,
                                                        { setSubmitting }
                                                    ) => {
                                                        setSubmitting(true);
                                                        const {
                                                            name,
                                                            departmentId,
                                                            permissionIds: permissionsImmutable
                                                        } = values;
                                                        const permissionIds = permissionsImmutable.toJS();
                                                        const toSubmit = {
                                                            name,
                                                            isStandardRole: false,
                                                            departmentId,
                                                            permissionIds,
                                                            clientId:
                                                                props.match
                                                                    .params
                                                                    .client_id
                                                        };
                                                        console.log(
                                                            "To submit ",
                                                            toSubmit
                                                        );
                                                        createRoleAction({
                                                            variables: {
                                                                input: {
                                                                    ...toSubmit
                                                                }
                                                            }
                                                        }).then(({ data }) => {
                                                            console.log(
                                                                "Created role data ",
                                                                data
                                                            );
                                                            const {
                                                                createRole
                                                            } = data || {};
                                                            const {
                                                                id: createdRoleId = null
                                                            } =
                                                                createRole ||
                                                                {};
                                                            setCreatedRoleId(
                                                                createdRoleId
                                                            );
                                                            setSubmitting(
                                                                false
                                                            );
                                                        });
                                                    };
                                                    return (
                                                        <Formik
                                                            initialValues={
                                                                initialValues
                                                            }
                                                            onSubmit={
                                                                handleSubmit
                                                            }
                                                            validationSchema={
                                                                createRoleSchema
                                                            }
                                                        >
                                                            {formikProps => (
                                                                <ContainerDivModified>
                                                                    <Form>
                                                                        <CreateEditRole
                                                                            {...props}
                                                                            hasData={
                                                                                false
                                                                            }
                                                                            loadingDepartment={
                                                                                loadingDepartment
                                                                            }
                                                                            errorDepartment={
                                                                                errorDepartment
                                                                            }
                                                                            departmentList={
                                                                                departmentList
                                                                            }
                                                                            loadingRole={
                                                                                loadingRoleList
                                                                            }
                                                                            errorRoleList={
                                                                                errorRoleList
                                                                            }
                                                                            roleList={
                                                                                roleList
                                                                            }
                                                                            loadingPermission={
                                                                                loadingPermission
                                                                            }
                                                                            errorPermission={
                                                                                errorPermission
                                                                            }
                                                                            permissionList={
                                                                                permissionCategories
                                                                            }
                                                                            formikProps={
                                                                                formikProps
                                                                            }
                                                                            createdRoleId={
                                                                                createdRoleId
                                                                            }
                                                                            loadingMutation={
                                                                                loadingMutation
                                                                            }
                                                                            errorMutation={
                                                                                errorMutation
                                                                            }
                                                                        />
                                                                    </Form>
                                                                </ContainerDivModified>
                                                            )}
                                                        </Formik>
                                                    );
                                                }}
                                            </Mutation>
                                        );
                                    } else {
                                        return (
                                            <Query
                                                query={getRoleDetail}
                                                variables={{
                                                    id:
                                                        props.match.params
                                                            .role_id
                                                }}
                                            >
                                                {({
                                                    loading: loadingRoleDetail,
                                                    error: errorRoleDetail,
                                                    data
                                                }) => {
                                                    if (loadingRoleDetail) {
                                                        return (
                                                            <Loading
                                                                loadingData
                                                            />
                                                        );
                                                    }
                                                    const { role } = data || {};
                                                    const {
                                                        id = null,
                                                        name = "",
                                                        department = {},
                                                        permissions = []
                                                    } = role || {};
                                                    const initialValues = {
                                                        id,
                                                        name,
                                                        departmentId: Boolean(
                                                            department.id
                                                        )
                                                            ? department.id
                                                            : null,
                                                        copyRoleId: null,
                                                        permissionIds: Set(
                                                            permissions.map(
                                                                ({ id }) => id
                                                            )
                                                        )
                                                    };
                                                    return (
                                                        <Mutation
                                                            mutation={EDIT_ROLE}
                                                            refetchQueries={[
                                                                {
                                                                    query: getRoleList,
                                                                    variables: {
                                                                        clientId:
                                                                            props
                                                                                .match
                                                                                .params
                                                                                .client_id
                                                                    }
                                                                },
                                                                {
                                                                    query: getRoleDetail,
                                                                    variables: {
                                                                        id:
                                                                            props
                                                                                .match
                                                                                .params
                                                                                .role_id
                                                                    }
                                                                },
                                                                {
                                                                    query: getDepartmentListByClient,
                                                                    variables: {
                                                                        id:
                                                                            props
                                                                                .match
                                                                                .params
                                                                                .client_id
                                                                    }
                                                                }
                                                            ]}
                                                        >
                                                            {(
                                                                editRoleAction,
                                                                {
                                                                    loading: loadingMutation,
                                                                    error: errorMutation
                                                                }
                                                            ) => {
                                                                const handleSubmit = (
                                                                    values,
                                                                    {
                                                                        setSubmitting
                                                                    }
                                                                ) => {
                                                                    setSubmitting(
                                                                        true
                                                                    );
                                                                    const {
                                                                        id,
                                                                        name,
                                                                        departmentId,
                                                                        permissionIds: permissionsImmutable
                                                                    } = values;
                                                                    const permissionIds = permissionsImmutable.toJS();
                                                                    const toSubmit = {
                                                                        id,
                                                                        name,
                                                                        departmentId,
                                                                        permissionIds
                                                                    };
                                                                    console.log(
                                                                        "To submit ",
                                                                        toSubmit
                                                                    );
                                                                    editRoleAction(
                                                                        {
                                                                            variables: {
                                                                                input: {
                                                                                    ...toSubmit
                                                                                }
                                                                            }
                                                                        }
                                                                    ).then(
                                                                        ({
                                                                            data
                                                                        }) => {
                                                                            console.log(
                                                                                "Updated role data ",
                                                                                data
                                                                            );
                                                                            setSubmitting(
                                                                                false
                                                                            );
                                                                        }
                                                                    );
                                                                };
                                                                return (
                                                                    <Formik
                                                                        enableReinitialize
                                                                        initialValues={
                                                                            initialValues
                                                                        }
                                                                        onSubmit={
                                                                            handleSubmit
                                                                        }
                                                                        validationSchema={
                                                                            modifyRoleSchema
                                                                        }
                                                                    >
                                                                        {formikProps => (
                                                                            <ContainerDivModified>
                                                                                <Form>
                                                                                    <CreateEditRole
                                                                                        {...props}
                                                                                        hasData={
                                                                                            true
                                                                                        }
                                                                                        data={
                                                                                            role
                                                                                        }
                                                                                        loadingDepartment={
                                                                                            loadingDepartment
                                                                                        }
                                                                                        errorDepartment={
                                                                                            errorDepartment
                                                                                        }
                                                                                        departmentList={
                                                                                            departmentList
                                                                                        }
                                                                                        loadingRole={
                                                                                            loadingRoleList
                                                                                        }
                                                                                        errorRoleList={
                                                                                            errorRoleList
                                                                                        }
                                                                                        roleList={
                                                                                            roleList
                                                                                        }
                                                                                        errorRoleDetail={
                                                                                            errorRoleDetail
                                                                                        }
                                                                                        loadingPermission={
                                                                                            loadingPermission
                                                                                        }
                                                                                        errorPermission={
                                                                                            errorPermission
                                                                                        }
                                                                                        permissionList={
                                                                                            permissionCategories
                                                                                        }
                                                                                        formikProps={
                                                                                            formikProps
                                                                                        }
                                                                                        createdRoleId={
                                                                                            createdRoleId
                                                                                        }
                                                                                        loadingMutation={
                                                                                            loadingMutation
                                                                                        }
                                                                                        errorMutation={
                                                                                            errorMutation
                                                                                        }
                                                                                    />
                                                                                </Form>
                                                                            </ContainerDivModified>
                                                                        )}
                                                                    </Formik>
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
            )}
        </Query>
    );
};

class CreateEditRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openRolePermissions: false,
            openRoleWarning: false,
            openRoleConfirmExit: false,
            exit: true
        };
        this.openRolePermissionsDialog = this.openRolePermissionsDialog.bind(
            this
        );
        this.closeRolePermissionsDialog = this.closeRolePermissionsDialog.bind(
            this
        );
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateAway = this.navigateAway.bind(this);
        this.cancelNavigate = this.cancelNavigate.bind(this);
    }
    componentDidUpdate(prevProps) {
        const {
            errorDepartment,
            errorRoleList,
            errorRoleDetail,
            errorPermission,
            errorMutation,
            enqueueSnackbar,
            formikProps: {
                isSubmitting,
                setFieldValue,
                values: { copyRoleId }
            },
            roleList,
            hasData,
            createdRoleId,
            history,
            match
        } = this.props;
        const { exit } = this.state;
        const {
            errorDepartment: prevErrorDepartment,
            errorRoleList: prevErrorRoleList,
            errorRoleDetail: prevErrorRoleDetail,
            errorPermission: prevErrorPermission,
            errorMutation: prevErrorMutation,
            formikProps: {
                isSubmitting: prevIsSubmitting,
                values: { copyRoleId: prevCopyRoleId }
            },
            createdRoleId: prevCreatedRoleId
        } = prevProps;
        if (!Boolean(prevErrorDepartment) && Boolean(errorDepartment)) {
            Boolean(errorDepartment.message) &&
                enqueueSnackbar(errorDepartment.message, {
                    variant: "error"
                });
        }
        if (!Boolean(prevErrorRoleList) && Boolean(errorRoleList)) {
            Boolean(errorRoleList.message) &&
                enqueueSnackbar(errorRoleList.message, {
                    variant: "error"
                });
        }
        if (!Boolean(prevErrorRoleDetail) && Boolean(errorRoleDetail)) {
            Boolean(errorRoleDetail.message) &&
                enqueueSnackbar(errorRoleDetail.message, {
                    variant: "error"
                });
        }
        if (!Boolean(prevErrorPermission) && Boolean(errorPermission)) {
            Boolean(errorPermission.message) &&
                enqueueSnackbar(errorPermission.message, {
                    variant: "error"
                });
        }
        if (!Boolean(prevErrorMutation) && Boolean(errorMutation)) {
            Boolean(errorMutation.message) &&
                enqueueSnackbar(errorMutation.message, {
                    variant: "error"
                });
        }
        if (prevCopyRoleId !== copyRoleId) {
            const roleData = roleList.find(({ id }) => id === copyRoleId);
            if (
                Boolean(roleData) &&
                Array.isArray(roleData.permissions) &&
                roleData.permissions.length > 0
            ) {
                //Change permissions based on copy from existing role
                setFieldValue(
                    "permissionIds",
                    Set(roleData.permissions.map(({ id }) => id))
                );
            }
        }
        if (prevIsSubmitting && !isSubmitting) {
            //Submission process completed
            if (!exit && !hasData) {
                //Successfully created a new role, but want to still keep on editing, hence we have to navigate to the edit page of the new role
                const { params } = match || {};
                const { client_id = null } = params || {};
                if (client_id && createdRoleId) {
                    history.push(
                        ROLE_EDIT_URL.replace(":client_id", client_id).replace(
                            ":role_id",
                            createdRoleId
                        )
                    );
                }
            } else if (exit) {
                this.navigateAway();
            }
        }
        if (!prevCreatedRoleId && createdRoleId) {
            //Successfully created a new role, but want to still keep on editing, hence we have to navigate to the edit page of the new role
            const { params } = match || {};
            const { client_id = null } = params || {};
            if (client_id && createdRoleId) {
                history.push(
                    ROLE_EDIT_URL.replace(":client_id", client_id).replace(
                        ":role_id",
                        createdRoleId
                    )
                );
            }
        }
    }
    handleClickCancel = () => {
        const {
            formikProps: { dirty }
        } = this.props;
        if (dirty) {
            this.setState({ openRoleConfirmExit: true });
        } else {
            this.navigateAway();
        }
    };
    navigateAway = () => {
        const { history, match } = this.props || {};
        const { params } = match || {};
        const { client_id = null } = params || {};
        if (client_id) {
            history.push(`${WELCOME_URL}/${client_id}/users`);
        }
    };
    cancelNavigate = () => {
        this.setState({ openRoleConfirmExit: false });
    };
    openRolePermissionsDialog = () =>
        this.setState({ openRolePermissions: true });
    closeRolePermissionsDialog = () =>
        this.setState({ openRolePermissions: false });
    renderSelectField = (nameValue, label, optionList) => (
        <React.Fragment>
            <FieldLabel>{label}</FieldLabel>
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
                input={
                    <OutlinedInput
                        error={
                            Boolean(this.props.formikProps.errors) &&
                            Object.keys(this.props.formikProps.errors).length >
                                0 &&
                            this.props.formikProps.errors[nameValue]
                        }
                    />
                }
            >
                {optionList.map(({ id, name }, index) => (
                    <MenuItem key={`ITEM-${name}-${id}-${index}`} value={id}>
                        {name}
                    </MenuItem>
                ))}
            </Field>
        </React.Fragment>
    );
    renderPermissionsSection = () => {
        const {
            formikProps: { values, setFieldValue, errors },
            loadingPermission,
            permissionList: permissionCategories,
            classes
        } = this.props;
        if (loadingPermission) {
            return <Loading loadingData />;
        } else if (
            !Array.isArray(permissionCategories) ||
            permissionCategories.length === 0
        ) {
            return (
                <React.Fragment>
                    Wrong Permission Categories Format
                </React.Fragment>
            );
        } else {
            const { permissionIds } = values;
            let allPermissionsLength = 0;
            permissionCategories.forEach(category => {
                allPermissionsLength += category.permissions.length;
            });
            const permissionsList = [].concat.apply(
                [],
                permissionCategories.map(({ permissions }) => {
                    let output = [];
                    permissions.forEach(({ id }) => {
                        output = [...output, id];
                    });
                    return output;
                })
            );
            // console.log("Selected all: ", permission)

            return (
                <RolePermissionContainerDiv
                    error={Boolean(errors) && Boolean(errors.permissionIds)}
                >
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
                                onClick={this.openRolePermissionsDialog}
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
                                            permissionIds.size ===
                                            allPermissionsLength
                                        }
                                        onChange={() => {
                                            //https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
                                            if (
                                                permissionIds.size ===
                                                permissionsList.length
                                            ) {
                                                setFieldValue(
                                                    "permissionIds",
                                                    Set([])
                                                );
                                            } else {
                                                setFieldValue(
                                                    "permissionIds",
                                                    Set(permissionIds).union(
                                                        permissionsList
                                                    )
                                                );
                                            }
                                        }}
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
                                                        onChange={event => {
                                                            if (
                                                                permissionIds.includes(
                                                                    event.target
                                                                        .id
                                                                )
                                                            ) {
                                                                //Remove from selected checkboxes
                                                                setFieldValue(
                                                                    "permissionIds",
                                                                    Set(
                                                                        permissionIds
                                                                    ).delete(
                                                                        event
                                                                            .target
                                                                            .id
                                                                    )
                                                                );
                                                            } else {
                                                                //Add to selected checkboxes
                                                                setFieldValue(
                                                                    "permissionIds",
                                                                    permissionIds.add(
                                                                        event
                                                                            .target
                                                                            .id
                                                                    )
                                                                );
                                                            }
                                                        }}
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
            );
        }
    };
    render() {
        const {
            hasData,
            classes,
            departmentList = [],
            roleList = [],
            loadingDepartment,
            loadingRoleList,
            permissionList,
            formikProps: {
                setFieldValue,
                values,
                errors,
                isSubmitting,
                submitForm
            }
        } = this.props;
        const { openRolePermissions, openRoleConfirmExit } = this.state;
        const headerText = hasData ? "MODIFY ROLE" : "CREATE ROLE";
        return (
            <React.Fragment>
                <div style={{ width: "100%", height: 100, display: "flex" }}>
                    <div
                        style={{
                            width: "85%",
                            fontSize: "2.3em",
                            fontWeight: 600,
                            color: "black"
                        }}
                    >
                        {headerText}
                    </div>
                    <div
                        style={{
                            width: "15%",
                            display: "flex",
                            flexDirection: "column",
                            paddingRight: 10
                        }}
                    >
                        <Button
                            variant="outlined"
                            className={classes.buttonCancel}
                            disabled={isSubmitting}
                            onClick={this.handleClickCancel}
                        >
                            CANCEL
                        </Button>
                        <CustomSaveButton
                            disabled={isSubmitting}
                            options={[
                                {
                                    label: "SAVE & EXIT",
                                    action: () => {
                                        if (
                                            Boolean(errors) &&
                                            Object.keys(errors).length === 0
                                        ) {
                                            submitForm();
                                        }
                                    }
                                },
                                {
                                    label: "SAVE & KEEP EDITING",
                                    action: () => {
                                        if (
                                            Boolean(errors) &&
                                            Object.keys(errors).length === 0
                                        ) {
                                            this.setState({ exit: false }, () =>
                                                submitForm()
                                            );
                                        }
                                    }
                                }
                            ]}
                        />
                    </div>
                </div>
                <FormContainerDiv>
                    <SectionDiv width="33%">
                        <FieldContainerDiv>
                            <FieldLabel>ROLE NAME</FieldLabel>
                            <Field
                                name="name"
                                required
                                type="text"
                                component={TextField}
                                variant="outlined"
                                fullWidth
                                inputProps={{
                                    style: {
                                        padding: "12px 10px",
                                        backgroundColor: "white"
                                    }
                                }}
                            />
                        </FieldContainerDiv>
                        <FieldContainerDiv>
                            {loadingDepartment ? (
                                <Loading loadingData />
                            ) : (
                                this.renderSelectField(
                                    "departmentId",
                                    "LINKED TO DEPARTMENT",
                                    departmentList
                                )
                            )}
                        </FieldContainerDiv>
                    </SectionDiv>
                    <SectionDiv width="33%" withBorderLeft withBorderRight>
                        <FieldContainerDiv>
                            {loadingRoleList ? (
                                <Loading loadingData />
                            ) : (
                                this.renderSelectField(
                                    "copyRoleId",
                                    "COPY FROM EXISTING ROLE",
                                    roleList
                                )
                            )}
                        </FieldContainerDiv>
                        {this.renderPermissionsSection()}
                    </SectionDiv>
                </FormContainerDiv>
                {openRolePermissions && (
                    <RolePermissionsDialog
                        handleClose={this.closeRolePermissionsDialog}
                        setFieldValue={setFieldValue}
                        permissionsCategories={permissionList}
                        roleName={values.name}
                        permissionIds={values.permissionIds}
                        errors={errors}
                    />
                )}
                {openRoleConfirmExit && (
                    <ConfirmExitDialog
                        open={openRoleConfirmExit}
                        cancelAction={this.cancelNavigate}
                        acceptAction={this.navigateAway}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default withSnackbar(withStyles(styles)(CreateEditRoleHOC));
