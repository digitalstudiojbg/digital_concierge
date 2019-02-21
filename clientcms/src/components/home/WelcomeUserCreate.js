import React from "react";
import { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Mutation, withApollo, compose, graphql } from "react-apollo";
import { getDepartmentListByUser } from "../../data/query";
import { Formik, Form, Field } from "formik";
import {
    TextField,
    fieldToTextField,
    Select,
    RadioGroup
} from "formik-material-ui";
import Button from "@material-ui/core/Button";
import Loading from "../loading/Loading";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { isEmpty } from "lodash";
import { CREATE_DEPARTMENT, CREATE_ROLE } from "../../data/mutation";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { ClipLoader } from "react-spinners";

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
                    <MenuItem
                        key={`ITEM-${name}-${id}-${index}`}
                        value={id}
                        onClick={() => {
                            console.log("123");
                        }}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Field>
        </React.Fragment>
    );
};

const WelcomeUserCreate = props => {
    const { getDepartmentListByUser: { departmentsByUser = [] } = {} } = props;

    if (departmentsByUser.length < 0) {
        return <Loading />;
    }

    const [createNewDepartmentOpen, setCreateNewDepartmentOpen] = useState(
        false
    );

    const [createNewRoleOpen, setCreateNewRoleOpen] = useState(false);

    const [selectedDepartment, setSelectedDepartment] = useState();

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
                                                    clientId: 1
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
        console.log(selectedDepartment);

        return (
            <Dialog
                open={createNewRoleOpen}
                TransitionComponent={Transition}
                onClose={() => {
                    setCreateNewRoleOpen(false);
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    <h3>CREATE NEW ROLE</h3>
                </DialogTitle>
                <DialogContent>
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
                                        color={"rgba(0, 0, 0, 0.87)"}
                                        loading={loading}
                                    />
                                );
                            }
                            if (error) return `Error! ${error.message}`;
                            return (
                                <Formik
                                    onSubmit={(values, { setSubmitting }) => {
                                        console.log(selectedDepartment);
                                        console.log("-----------");

                                        alert(values.name);
                                        addANewRole({
                                            variables: {
                                                input: {
                                                    name: values.name,
                                                    isStandardRole: false,
                                                    departmentId: parseInt(
                                                        selectedDepartment
                                                    ),
                                                    permissionIds: [1]
                                                }
                                            }
                                        });
                                        setSubmitting(false);
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
                </DialogContent>
            </Dialog>
        );
    };

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
                    Create a user account
                </p>
            </div>
            {/**
                validationSchema={validationSchema}
                initialValues={{ aif_boolean: "yes" }} 
            */}
            <Formik
                validate={values => {
                    console.log(values);
                    !isEmpty(values.department) &&
                        setSelectedDepartment(values.department);
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    console.log(values);
                }}
                render={({ errors, values, isSubmitting }) => {
                    console.log(values);
                    const selectedDepartment = departmentsByUser.find(
                        department => department.id === values.department
                    );

                    return (
                        <Form>
                            <div style={{ display: "flex" }}>
                                <ContainerDiv>
                                    {CREATE_USER_FIELD.map(
                                        ({ name, label, required, type }) => (
                                            <FiledContainer>
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
                                        {!isEmpty(values.department) && (
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
                                    {PASSWORD_FIELD.map(
                                        ({ name, label, required, type }) => (
                                            <FiledContainer>
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
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                CONFIRM & CONTINUE
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
    withStyles(styles),
    graphql(getDepartmentListByUser, {
        name: "getDepartmentListByUser"
    })
)(WelcomeUserCreate);
