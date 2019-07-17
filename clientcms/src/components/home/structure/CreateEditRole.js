import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { getDepartmentListByClient } from "../../../data/query/department";
import { getRoleList, getRoleDetail } from "../../../data/query";
import { withSnackbar } from "notistack";
import { Formik, Form, Field } from "formik";
import { ContainerDiv } from "../../../utils/Constants";
import { FieldContainerDiv, FieldLabel } from "../user/commonStyle";
import { TextField, Select } from "formik-material-ui";
import { OutlinedInput, MenuItem } from "@material-ui/core";

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

const CreateEditRoleHOC = props => (
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
                    variables={{ clientId: props.match.params.client_id }}
                >
                    {({
                        loading: loadingRoleList,
                        error: errorRoleList,
                        data: { rolesByClientId: roleList }
                    }) => {
                        if (props.match.params.role_id === "new") {
                            return (
                                <Formik>
                                    {formikProps => (
                                        <ContainerDivModified>
                                            <Form>
                                                <CreateEditRole
                                                    {...props}
                                                    hasData={false}
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
                                                    roleList={roleList}
                                                    formikProps={formikProps}
                                                />
                                            </Form>
                                        </ContainerDivModified>
                                    )}
                                </Formik>
                            );
                        } else {
                            return (
                                <Query
                                    query={getRoleDetail}
                                    variables={{
                                        id: props.match.params.role_id === "new"
                                    }}
                                >
                                    {({
                                        loading: loadingRoleDetail,
                                        error: errorRoleDetail,
                                        data: { role }
                                    }) => {
                                        const initialValues = {
                                            id: role.id,
                                            name: role.name,
                                            departmentId: role.department.id,
                                            copyRoleId: null,
                                            permissionIds: role.permissions.map(
                                                ({ id }) => id
                                            )
                                        };
                                        return (
                                            <Formik
                                                enableReinitialize
                                                initialValues={initialValues}
                                            >
                                                {formikProps => (
                                                    <ContainerDivModified>
                                                        <Form>
                                                            <CreateEditRole
                                                                {...props}
                                                                hasData={true}
                                                                data={role}
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
                                                                loadingRoleDetail={
                                                                    loadingRoleDetail
                                                                }
                                                                errorRoleDetail={
                                                                    errorRoleDetail
                                                                }
                                                                formikProps={
                                                                    formikProps
                                                                }
                                                            />
                                                        </Form>
                                                    </ContainerDivModified>
                                                )}
                                            </Formik>
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

class CreateEditRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openErrorRoleList: false,
            openErrorDeptList: false,
            openErrorData: false,
            openErrorMutation: false
        };
        this.closeDeptListError = this.closeDeptListError.bind(this);
        this.closeRoleListError = this.closeRoleListError.bind(this);
        this.closeRoleDataError = this.closeRoleDataError.bind(this);
    }
    componentDidUpdate(prevProps) {
        const {
            errorDepartment,
            errorRoleList,
            errorRoleDetail,
            enqueueSnackbar,
            formikProps: { isSubmitting }
        } = this.props;
        const {
            errorDepartment: prevErrorDepartment,
            errorRoleList: prevErrorRoleList,
            errorRoleDetail: prevErrorRoleDetail,
            formikProps: { isSubmitting: prevIsSubmitting }
        } = prevProps;
        if (!Boolean(prevErrorDepartment) && Boolean(errorDepartment)) {
            this.setState({ openErrorDeptList: true }, () => {
                Boolean(errorDepartment.message) &&
                    enqueueSnackbar(errorDepartment.message, {
                        variant: "error",
                        onClose: this.closeDeptListError
                    });
            });
        }
        if (!Boolean(prevErrorRoleList) && Boolean(errorRoleList)) {
            this.setState({ openErrorRoleList: true }, () => {
                Boolean(errorRoleList.message) &&
                    enqueueSnackbar(errorRoleList.message, {
                        variant: "error",
                        onClose: this.closeRoleListError
                    });
            });
        }
        if (!Boolean(prevErrorRoleDetail) && Boolean(errorRoleDetail)) {
            this.setState({ setErrorData: true }, () => {
                Boolean(errorRoleDetail.message) &&
                    enqueueSnackbar(errorRoleDetail, {
                        variant: "error",
                        onClose: this.closeRoleDataError
                    });
            });
        }
        if (prevIsSubmitting && !isSubmitting) {
            //Submission process completed
        }
    }
    closeDeptListError = () => this.setState({ openErrorDeptList: false });
    closeRoleListError = () => this.setState({ openErrorRoleList: false });
    closeRoleDataError = () => this.setState({ openErrorData: false });
    renderSelectField = (nameValue, label, optionList) => (
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
    render() {
        const { departmentList = [] } = this.props;
        return (
            <React.Fragment>
                <div style={{ width: "100%", height: 50, display: "flex" }}>
                    CREATE / EDIT ROLE
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
                            {this.renderSelectField(
                                "departmentId",
                                "LINKED TO DEPARTMENT",
                                departmentList
                            )}
                        </FieldContainerDiv>
                    </SectionDiv>
                    <SectionDiv width="33%" withBorderLeft withBorderRight>
                        SECTION TWO
                    </SectionDiv>
                </FormContainerDiv>
            </React.Fragment>
        );
    }
}

export default withSnackbar(CreateEditRoleHOC);
