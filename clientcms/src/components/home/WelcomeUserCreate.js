import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Mutation, withApollo, compose, graphql } from "react-apollo";
import { getDepartmentListByUser } from "../../data/query";
//import { CREATE_SYSTEM } from "../../../data/mutation";
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

const ContainerDiv = styled.div`
    width: 33%;
    padding: 20px;
`;

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

const FiledContainer = styled.div`
    padding-bottom: 20px;
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

    if (!isEmpty(departmentsByUser)) {
        console.log(departmentsByUser[0].roles);
    }

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
                                            })}{" "}
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
                                        })}{" "}
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
    withStyles(),
    graphql(getDepartmentListByUser, {
        name: "getDepartmentListByUser"
    })
)(WelcomeUserCreate);
