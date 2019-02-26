import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Mutation, withApollo, compose, graphql, Query } from "react-apollo";
import {
    getDepartmentListByUser,
    getPermissionCategoryList
} from "../../data/query";
import {
    CREATE_DEPARTMENT,
    CREATE_ROLE,
    CREATE_USER
} from "../../data/mutation";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import Button from "@material-ui/core/Button";
import Loading from "../loading/Loading";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { isEmpty } from "lodash";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { ClipLoader } from "react-spinners";
import { Set } from "immutable";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import WelcomeUserCreateValidationSchema from "./WelcomeUserCreateValidationSchema";
import WelcomeUserUpdateValidationSchema from "./WelcomeUserUpdateValidationSchema";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { withRouter } from "react-router-dom";

const CREATE_USER_FIELD = [
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
    },
    {
        name: "first_phone_number",
        label: "FIRST PHONE NUMBER",
        required: false,
        type: "text"
    },
    {
        name: "second_phone_number",
        label: "SECOND PHONE NUMBER",
        required: false,
        type: "text"
    },
    {
        name: "position",
        label: "POSITION",
        required: false,
        type: "text"
    }
];

const PASSWORD_FIELD = [
    {
        name: "password",
        label: "PASSWORD",
        required: true,
        type: "password"
    },
    {
        name: "confirm_password",
        label: "CONFIRM PASSWORD",
        required: true,
        type: "password"
    }
];

const EDIT_PASSWORD_FIELD = [
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

const ContainerDiv = styled.div`
    width: 33%;
    padding: 20px;
`;

const FiledContainer = styled.div`
    padding-bottom: 20px;
`;

const BrowseButton = styled.label`
    border: 3px solid rgb(64, 84, 178);
    display: inline-block;
    width: 100%;
    text-align: center;
    cursor: pointer;
    padding: 5px;
    font-size: 1.3em;
    color: rgb(64, 84, 178);
    border-radius: 5px;
    &:hover {
        font-weight: bold;
    }
`;

const SelectAndUnselectAll = styled.div`
    width: 50%;
    cursor: pointer;
    &:hover {
        font-weight: bold;
    }
`;

const styles = theme => ({
    select: {
        width: "300px"
    },
    buttonFont: {
        fontSize: "1.2em"
    },
    checkbox: {
        paddingTop: "0px",
        paddingBottom: "0px"
    }
});

const Transition = props => {
    return <Slide direction="up" {...props} />;
};

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

const WelcomeUserCreate = props => {
    const {
        getDepartmentListByUser: { departmentsByUser = [] } = {},
        createUser,
        handleIsCreatePageState,
        match: { params: { client_id = {} } = {} } = {},
        is_edit = false,
        selected_user = null,
        updateUser,
        handleEditModal
    } = props;

    if (departmentsByUser.length < 0) {
        return <Loading />;
    }

    const [createNewDepartmentOpen, setCreateNewDepartmentOpen] = useState(
        false
    );

    const [createNewRoleOpen, setCreateNewRoleOpen] = useState(false);

    const [selectedDepartment, setSelectedDepartment] = useState();

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const renderCreateNewDepartmentModel = () => {
        const { classes } = props;

        return (
            <Dialog
                open={createNewDepartmentOpen}
                TransitionComponent={Transition}
                onClose={() => {
                    setCreateNewDepartmentOpen(false);
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    <h3>CREATE NEW DEPARTMENT</h3>
                </DialogTitle>
                <DialogContent>
                    <Mutation
                        mutation={CREATE_DEPARTMENT()}
                        refetchQueries={[
                            {
                                query: getDepartmentListByUser
                            }
                        ]}
                    >
                        {(addANewDepartment, { loading, error }) => {
                            if (loading) {
                                return (
                                    <ClipLoader
                                        sizeUnit={"px"}
                                        size={24}
                                        color={"rgba(0, 0, 0, 0.87)"}
                                        loading={loading}
                                    />
                                );
                            }
                            if (error) return `Error! ${error.message}`;
                            return (
                                <Formik
                                    onSubmit={(values, { setSubmitting }) => {
                                        alert(values.name);
                                        addANewDepartment({
                                            variables: {
                                                input: {
                                                    name: values.name,
                                                    clientId: parseInt(
                                                        client_id
                                                    )
                                                }
                                            }
                                        });
                                        setSubmitting(false);
                                        setCreateNewDepartmentOpen(false);
                                    }}
                                    initialValues={{ name: "" }}
                                    render={({
                                        errors,
                                        values,
                                        isSubmitting
                                    }) => (
                                        <div
                                            style={{
                                                width: "300px",
                                                paddingTop: "10px"
                                            }}
                                        >
                                            <Form>
                                                <FiledContainer>
                                                    <Field
                                                        name="name"
                                                        label="Department Name"
                                                        required={true}
                                                        type="text"
                                                        component={TextField}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                    />
                                                </FiledContainer>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-around"
                                                    }}
                                                >
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        disabled={
                                                            isSubmitting ||
                                                            Object.keys(errors)
                                                                .length > 0 ||
                                                            Boolean(
                                                                values.name
                                                                    .length < 1
                                                            )
                                                        }
                                                        className={
                                                            classes.buttonFont
                                                        }
                                                    >
                                                        SAVE
                                                    </Button>

                                                    <Button
                                                        onClick={() => {
                                                            setCreateNewDepartmentOpen(
                                                                false
                                                            );
                                                        }}
                                                        color="secondary"
                                                        className={
                                                            classes.buttonFont
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    )}
                                />
                            );
                        }}
                    </Mutation>
                </DialogContent>
            </Dialog>
        );
    };

    const renderCreateNewRoleModel = selectedDepartment => {
        const { classes } = props;

        const [selectedPermissions, setSelectedPermissions] = useState(Set());

        return (
            <Dialog
                open={createNewRoleOpen}
                TransitionComponent={Transition}
                onClose={() => {
                    setSelectedPermissions(Set());
                    setCreateNewRoleOpen(false);
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    <h3>CREATE NEW ROLE</h3>
                </DialogTitle>
                <DialogContent>
                    <Query query={getPermissionCategoryList}>
                        {({
                            loading,
                            error,
                            data: { permissionCategories }
                        }) => {
                            if (loading) return <Loading loadingData />;
                            if (error) return `Error! ${error.message}`;

                            let allPermissionsLength = 0;
                            permissionCategories.forEach(category => {
                                allPermissionsLength +=
                                    category.permissions.length;
                            });

                            return (
                                <Mutation
                                    mutation={CREATE_ROLE()}
                                    refetchQueries={[
                                        {
                                            query: getDepartmentListByUser
                                        }
                                    ]}
                                >
                                    {(addANewRole, { loading, error }) => {
                                        if (loading) {
                                            return (
                                                <ClipLoader
                                                    sizeUnit={"px"}
                                                    size={24}
                                                    color={
                                                        "rgba(0, 0, 0, 0.87)"
                                                    }
                                                    loading={loading}
                                                />
                                            );
                                        }
                                        if (error)
                                            return `Error! ${error.message}`;
                                        return (
                                            <Formik
                                                onSubmit={(
                                                    values,
                                                    { setSubmitting }
                                                ) => {
                                                    alert(values.name);
                                                    addANewRole({
                                                        variables: {
                                                            input: {
                                                                name:
                                                                    values.name,
                                                                isStandardRole: false,
                                                                departmentId: parseInt(
                                                                    selectedDepartment
                                                                ),
                                                                permissionIds: selectedPermissions
                                                                    .toJS()
                                                                    .map(item =>
                                                                        parseInt(
                                                                            item
                                                                        )
                                                                    ),
                                                                clientId: parseInt(
                                                                    client_id
                                                                )
                                                            }
                                                        }
                                                    });
                                                    setSubmitting(false);
                                                    setSelectedPermissions(
                                                        Set()
                                                    );
                                                    setCreateNewRoleOpen(false);
                                                }}
                                                initialValues={{ name: "" }}
                                                render={({
                                                    errors,
                                                    values,
                                                    isSubmitting
                                                }) => (
                                                    <div
                                                        style={{
                                                            paddingTop: "10px"
                                                        }}
                                                    >
                                                        <Form>
                                                            <FiledContainer>
                                                                <Field
                                                                    name="name"
                                                                    label="ROLE NAME"
                                                                    required={
                                                                        true
                                                                    }
                                                                    type="text"
                                                                    component={
                                                                        TextField
                                                                    }
                                                                    variant="outlined"
                                                                    fullWidth={
                                                                        true
                                                                    }
                                                                />
                                                            </FiledContainer>

                                                            <div>
                                                                <div
                                                                    style={{
                                                                        display:
                                                                            "flex"
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            width:
                                                                                "40%"
                                                                        }}
                                                                    />
                                                                    <div
                                                                        style={{
                                                                            width:
                                                                                "60%"
                                                                        }}
                                                                    >
                                                                        <FormControlLabel
                                                                            key={`select_all`}
                                                                            control={
                                                                                <Checkbox
                                                                                    color="primary"
                                                                                    checked={
                                                                                        selectedPermissions.size ===
                                                                                        allPermissionsLength
                                                                                    }
                                                                                    onChange={() => {
                                                                                        if (
                                                                                            selectedPermissions.size ===
                                                                                            allPermissionsLength
                                                                                        ) {
                                                                                            setSelectedPermissions(
                                                                                                Set()
                                                                                            );
                                                                                        } else {
                                                                                            const permissions = [].concat.apply(
                                                                                                [],
                                                                                                permissionCategories.map(
                                                                                                    ({
                                                                                                        permissions
                                                                                                    }) => {
                                                                                                        let output = [];
                                                                                                        permissions.forEach(
                                                                                                            ({
                                                                                                                id
                                                                                                            }) => {
                                                                                                                output = [
                                                                                                                    ...output,
                                                                                                                    id
                                                                                                                ];
                                                                                                            }
                                                                                                        );
                                                                                                        return output;
                                                                                                    }
                                                                                                )
                                                                                            );

                                                                                            setSelectedPermissions(
                                                                                                selectedPermissions.union(
                                                                                                    permissions
                                                                                                )
                                                                                            );
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            }
                                                                            label={
                                                                                "ALL PERMISSIONS"
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>

                                                                {permissionCategories.map(
                                                                    ({
                                                                        name,
                                                                        id,
                                                                        permissions
                                                                    }) => {
                                                                        return (
                                                                            <div
                                                                                style={{
                                                                                    display:
                                                                                        "flex",
                                                                                    marginTop:
                                                                                        "5px",
                                                                                    marginBottom:
                                                                                        "5px",
                                                                                    border:
                                                                                        "1px solid black",
                                                                                    alignItems:
                                                                                        "center"
                                                                                }}
                                                                            >
                                                                                <div
                                                                                    style={{
                                                                                        paddingLeft:
                                                                                            "10px",
                                                                                        width:
                                                                                            "40%"
                                                                                    }}
                                                                                >
                                                                                    <p>
                                                                                        {
                                                                                            name
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                                <div
                                                                                    style={{
                                                                                        paddingRight:
                                                                                            "10px",
                                                                                        width:
                                                                                            "60%",
                                                                                        display:
                                                                                            "flex",
                                                                                        flexDirection:
                                                                                            "column"
                                                                                    }}
                                                                                >
                                                                                    {permissions.map(
                                                                                        ({
                                                                                            name,
                                                                                            id
                                                                                        }) => {
                                                                                            return (
                                                                                                <React.Fragment>
                                                                                                    <FormControlLabel
                                                                                                        key={`PERMISSION-${name}-${id}`}
                                                                                                        control={
                                                                                                            <Checkbox
                                                                                                                color="primary"
                                                                                                                id={
                                                                                                                    id
                                                                                                                }
                                                                                                                checked={selectedPermissions.includes(
                                                                                                                    id
                                                                                                                )}
                                                                                                                onChange={() => {
                                                                                                                    if (
                                                                                                                        selectedPermissions.includes(
                                                                                                                            id
                                                                                                                        )
                                                                                                                    ) {
                                                                                                                        setSelectedPermissions(
                                                                                                                            selectedPermissions.delete(
                                                                                                                                id
                                                                                                                            )
                                                                                                                        );
                                                                                                                    } else {
                                                                                                                        setSelectedPermissions(
                                                                                                                            selectedPermissions.add(
                                                                                                                                id
                                                                                                                            )
                                                                                                                        );
                                                                                                                    }
                                                                                                                }}
                                                                                                            />
                                                                                                        }
                                                                                                        label={
                                                                                                            name
                                                                                                        }
                                                                                                    />
                                                                                                </React.Fragment>
                                                                                            );
                                                                                        }
                                                                                    )}
                                                                                    <div
                                                                                        style={{
                                                                                            display:
                                                                                                "flex",
                                                                                            justifyContent:
                                                                                                "space-between",
                                                                                            textAlign:
                                                                                                "center"
                                                                                        }}
                                                                                    >
                                                                                        <SelectAndUnselectAll
                                                                                            onClick={() => {
                                                                                                setSelectedPermissions(
                                                                                                    selectedPermissions.union(
                                                                                                        permissions.map(
                                                                                                            ({
                                                                                                                id
                                                                                                            }) =>
                                                                                                                id
                                                                                                        )
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            Select
                                                                                            All
                                                                                        </SelectAndUnselectAll>
                                                                                        <SelectAndUnselectAll
                                                                                            onClick={() => {
                                                                                                setSelectedPermissions(
                                                                                                    selectedPermissions.subtract(
                                                                                                        permissions.map(
                                                                                                            ({
                                                                                                                id
                                                                                                            }) =>
                                                                                                                id
                                                                                                        )
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            Unselect
                                                                                            All
                                                                                        </SelectAndUnselectAll>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }
                                                                )}
                                                            </div>

                                                            <div
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    justifyContent:
                                                                        "space-around"
                                                                }}
                                                            >
                                                                <Button
                                                                    type="submit"
                                                                    variant="contained"
                                                                    color="primary"
                                                                    disabled={
                                                                        isSubmitting ||
                                                                        Object.keys(
                                                                            errors
                                                                        )
                                                                            .length >
                                                                            0 ||
                                                                        Boolean(
                                                                            values
                                                                                .name
                                                                                .length <
                                                                                1
                                                                        )
                                                                    }
                                                                    className={
                                                                        classes.buttonFont
                                                                    }
                                                                >
                                                                    SAVE
                                                                </Button>

                                                                <Button
                                                                    onClick={() => {
                                                                        setSelectedPermissions(
                                                                            Set()
                                                                        );
                                                                        setCreateNewRoleOpen(
                                                                            false
                                                                        );
                                                                    }}
                                                                    color="secondary"
                                                                    className={
                                                                        classes.buttonFont
                                                                    }
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </Form>
                                                    </div>
                                                )}
                                            />
                                        );
                                    }}
                                </Mutation>
                            );
                        }}
                    </Query>
                </DialogContent>
            </Dialog>
        );
    };
    console.log(selected_user);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                padding: "30px"
            }}
        >
            <div>
                <p style={{ fontSize: "20px", padding: "0px 0px 10px 20px" }}>
                    {is_edit
                        ? `Edit User ${selected_user.user}`
                        : "Create a user account"}
                </p>
            </div>
            <Formik
                validate={values => {
                    let errors = {};
                    !isEmpty(values.department) &&
                        setSelectedDepartment(values.department);

                    if (is_edit) {
                        if (
                            !isEmpty(values.password) &&
                            isEmpty(values.confirm_password)
                        ) {
                            errors.confirm_password = "Please confirm password";
                        }
                        if (
                            isEmpty(values.password) &&
                            !isEmpty(values.confirm_password)
                        ) {
                            errors.confirm_password = "Please enter password";
                        }
                    }

                    return errors;
                }}
                validationSchema={
                    is_edit
                        ? WelcomeUserUpdateValidationSchema
                        : WelcomeUserCreateValidationSchema
                }
                onSubmit={async (
                    {
                        position,
                        email,
                        first_phone_number,
                        second_phone_number,
                        name,
                        password = null,
                        role: roleId
                    },
                    { setSubmitting }
                ) => {
                    console.log(client_id);
                    if (!is_edit) {
                        createUser({
                            variables: {
                                input: {
                                    name,
                                    position,
                                    email,
                                    first_phone_number,
                                    second_phone_number,
                                    password,
                                    clientId: parseInt(client_id),
                                    roleId: parseInt(roleId)
                                }
                            }
                        }).then(() => {
                            console.log("USER CREATED SUCCESSFULLY");
                            handleIsCreatePageState();
                            setSubmitting(false);
                        });
                    } else {
                        updateUser({
                            variables: {
                                input: {
                                    id: parseInt(selected_user.id),
                                    name,
                                    position,
                                    email,
                                    ...(Boolean(first_phone_number) && {
                                        first_phone_number
                                    }),
                                    ...(Boolean(second_phone_number) && {
                                        second_phone_number
                                    }),
                                    ...(Boolean(password) && {
                                        password
                                    }),
                                    role_id: parseInt(roleId)
                                }
                            }
                        }).then(() => {
                            console.log("USER UPDATED SUCCESSFULLY");
                            handleEditModal();
                            setSubmitting(false);
                        });
                    }
                }}
                initialValues={{
                    name: selected_user && selected_user.user,
                    email: selected_user && selected_user.username,
                    first_phone_number:
                        selected_user && selected_user.first_phone_number,
                    second_phone_number:
                        selected_user && selected_user.second_phone_number,
                    position: selected_user && selected_user.position,
                    role: selected_user && selected_user.roles[0].id,
                    department:
                        selected_user && selected_user.roles[0].department.id
                }}
                render={({ errors, values, isSubmitting }) => {
                    console.log(values);

                    const selectedDepartment = departmentsByUser.find(
                        department => {
                            return department.id === values.department;
                        }
                    );

                    const renderPasswordFieldsList = is_edit
                        ? EDIT_PASSWORD_FIELD
                        : PASSWORD_FIELD;

                    return (
                        <Form>
                            <div style={{ display: "flex" }}>
                                <ContainerDiv>
                                    {CREATE_USER_FIELD.map(
                                        (
                                            { name, label, required, type },
                                            index
                                        ) => (
                                            <FiledContainer key={index}>
                                                <Field
                                                    id={name}
                                                    name={name}
                                                    label={label}
                                                    required={required}
                                                    type={type}
                                                    component={TextField}
                                                    variant="outlined"
                                                    fullWidth={true}
                                                />
                                            </FiledContainer>
                                        )
                                    )}
                                </ContainerDiv>
                                <ContainerDiv>
                                    <FiledContainer>
                                        {departmentsByUser.length > 0 &&
                                            renderSelectField({
                                                name: "department",
                                                label: "DEPARTMENT",
                                                required: true,
                                                type: "select",
                                                optionList: departmentsByUser
                                            })}
                                    </FiledContainer>
                                    <FiledContainer>
                                        <BrowseButton
                                            onClick={() => {
                                                setCreateNewDepartmentOpen(
                                                    true
                                                );
                                            }}
                                        >
                                            CREATE NEW DEPARTMENT
                                        </BrowseButton>
                                    </FiledContainer>
                                    <FiledContainer>
                                        {renderSelectField({
                                            name: "role",
                                            label: "ROLE",
                                            required: true,
                                            type: "select",
                                            optionList: selectedDepartment
                                                ? selectedDepartment.roles
                                                : []
                                        })}
                                    </FiledContainer>
                                    <FiledContainer>
                                        {(!isEmpty(values.department) ||
                                            is_edit) && (
                                            <BrowseButton
                                                onClick={() => {
                                                    setCreateNewRoleOpen(true);
                                                }}
                                            >
                                                CREATE NEW ROLE
                                            </BrowseButton>
                                        )}
                                    </FiledContainer>
                                </ContainerDiv>

                                <ContainerDiv>
                                    {is_edit && <h4>Reset Password</h4>}
                                    {renderPasswordFieldsList.map(
                                        (
                                            { name, label, required, type },
                                            index
                                        ) => (
                                            <FiledContainer key={index}>
                                                <Field
                                                    id={name}
                                                    name={name}
                                                    label={label}
                                                    required={required}
                                                    type={
                                                        name === "password"
                                                            ? showPassword
                                                                ? "text"
                                                                : "password"
                                                            : showConfirmPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    component={TextField}
                                                    variant="outlined"
                                                    fullWidth={true}
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="Toggle password visibility"
                                                                    onClick={() => {
                                                                        name ===
                                                                        "password"
                                                                            ? setShowPassword(
                                                                                  !showPassword
                                                                              )
                                                                            : setShowConfirmPassword(
                                                                                  !showConfirmPassword
                                                                              );
                                                                    }}
                                                                >
                                                                    {name ===
                                                                    "password" ? (
                                                                        showPassword ? (
                                                                            <VisibilityOff />
                                                                        ) : (
                                                                            <Visibility />
                                                                        )
                                                                    ) : showConfirmPassword ? (
                                                                        <VisibilityOff />
                                                                    ) : (
                                                                        <Visibility />
                                                                    )}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                />
                                            </FiledContainer>
                                        )
                                    )}
                                </ContainerDiv>
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={
                                    isSubmitting ||
                                    Object.keys(errors).length > 0
                                }
                            >
                                CONFIRM & UPDATE
                            </Button>
                        </Form>
                    );
                }}
            />
            {renderCreateNewDepartmentModel()}
            {renderCreateNewRoleModel(selectedDepartment)}
        </div>
    );
};

export default compose(
    withRouter,
    withApollo,
    withStyles(styles),
    graphql(getDepartmentListByUser, {
        name: "getDepartmentListByUser"
    }),
    graphql(CREATE_USER(), { name: "createUser" })
)(WelcomeUserCreate);
