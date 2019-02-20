import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { Mutation, withApollo, compose, graphql } from "react-apollo";
import { getDepartmentListByUser } from "../../data/query";
//import { CREATE_SYSTEM } from "../../../data/mutation";
//import Loading from "../../loading/Loading";
import { Formik, Form, Field } from "formik";
import {
    TextField,
    fieldToTextField,
    Select,
    RadioGroup
} from "formik-material-ui";
import Button from "@material-ui/core/Button";

const ContainerDiv = styled.div`
    width: 33%;
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

const WelcomeUserCreate = props => {
    console.log(props);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                padding: "30px"
            }}
        >
            <div>
                <p style={{ fontSize: "20px", paddingBottom: "10px" }}>
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
                                    DEPARTMENT-ROLE-PERMISSION
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
