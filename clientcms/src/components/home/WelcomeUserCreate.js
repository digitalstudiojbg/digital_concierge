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
import { CREATE_DEPARTMENT } from "../../data/mutation";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

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

    const [modalOpen, setModalOpen] = useState(false);

    const renderCreateNewDepartmentModel = () => {
        const { classes } = props;

        return (
            <Dialog
                open={modalOpen}
                TransitionComponent={Transition}
                onClose={() => {
                    setModalOpen(false);
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    <h2>Confirmation</h2>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <h1>CREATE MODAL</h1>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <React.Fragment>
                        <Button
                            onClick={() => {
                                setModalOpen(false);
                            }}
                            color="secondary"
                            className={classes.buttonFont}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {}}
                            color="primary"
                            autoFocus
                            className={classes.buttonFont}
                        >
                            Create Department
                        </Button>
                    </React.Fragment>
                </DialogActions>
            </Dialog>
        );
    };

    /*useEffect(() => {
        (() => {
            setCreateDepartmentOpen(false);
        })();
    }, [createDepartmentOpen]);*/

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
                onSubmit={async (values, { setSubmitting }) => {
                    console.log(values);
                }}
                render={({ errors, values, isSubmitting }) => {
                    console.log(values);
                    const selectedDepartment = departmentsByUser.find(
                        department => department.id === values.department
                    );
                    console.log(departmentsByUser);

                    console.log(selectedDepartment);

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
                                                setModalOpen(true);
                                            }}
                                        >
                                            CREATE NEW DEPARTMENT
                                        </BrowseButton>
                                        {renderCreateNewDepartmentModel()}
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
                                        <BrowseButton
                                            onClick={() => {
                                                setModalOpen(true);
                                            }}
                                        >
                                            CREATE NEW ROLE
                                        </BrowseButton>
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
        </div>
    );
};

export default compose(
    withStyles(styles),
    graphql(getDepartmentListByUser, {
        name: "getDepartmentListByUser"
    })
)(WelcomeUserCreate);
