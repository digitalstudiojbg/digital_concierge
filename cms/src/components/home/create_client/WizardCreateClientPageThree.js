import React from "react";
import styled from "styled-components";
import { Query, withApollo, Mutation } from "react-apollo";
import Loading from "../../loading/Loading";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { getDepartmentListByUser } from "../../../data/query";
import Button from "@material-ui/core/Button";
import { CREATE_DEPARTMENT } from "../../../data/mutation";
import { ClipLoader } from "react-spinners";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const SectionDivContainer = styled.div`
    width: 50%;
    height: 100%;
`;

const DepartmentSectionDiv = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
`;

const RoleSectionDiv = styled.div`
    width: 100%;
    height: 60%;
`;

class WizardCreateClientPageThree extends React.Component {
    render() {
        return (
            <Query query={getDepartmentListByUser}>
                {({
                    loading,
                    error,
                    data: { departmentsByUser: departments }
                }) => {
                    if (loading) return <Loading loadingData />;
                    if (error) return `Error! ${error.message}`;
                    console.log(departments);
                    return (
                        <ContainerDiv>
                            <SectionDivContainer>
                                Department
                                <Mutation
                                    mutation={CREATE_DEPARTMENT()}
                                    refetchQueries={[
                                        {
                                            query: getDepartmentListByUser
                                        }
                                    ]}
                                >
                                    {(
                                        addANewDepartment,
                                        { loading, error }
                                    ) => {
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
                                                    addANewDepartment({
                                                        variables: {
                                                            input: {
                                                                name:
                                                                    values.name
                                                            }
                                                        }
                                                    });
                                                    setSubmitting(false);
                                                }}
                                                initialValues={{ name: "" }}
                                                render={({
                                                    errors,
                                                    values,
                                                    isSubmitting
                                                }) => (
                                                    <Form>
                                                        <DepartmentSectionDiv>
                                                            <div
                                                                style={{
                                                                    width:
                                                                        "45%",
                                                                    height:
                                                                        "100%",
                                                                    paddingTop: 10,
                                                                    paddingBottom: 10
                                                                }}
                                                            >
                                                                <Field
                                                                    name="name"
                                                                    label="Department Name"
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
                                                            </div>
                                                            <div
                                                                style={{
                                                                    padding:
                                                                        "10px",
                                                                    flex: 1,
                                                                    height:
                                                                        "100%",
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    flexDirection:
                                                                        "row-reverse"
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
                                                                >
                                                                    Add
                                                                    Department
                                                                </Button>
                                                            </div>
                                                        </DepartmentSectionDiv>
                                                    </Form>
                                                )}
                                            />
                                        );
                                    }}
                                </Mutation>
                                Role
                                <RoleSectionDiv />
                            </SectionDivContainer>
                            <SectionDivContainer>
                                STRUCTURE TABLE
                            </SectionDivContainer>
                        </ContainerDiv>
                    );
                }}
            </Query>
        );
    }
}

export default withApollo(WizardCreateClientPageThree);
