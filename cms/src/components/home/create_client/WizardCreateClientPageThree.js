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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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
    display: flex;
`;

const RolePermissionContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
`;

const EachRolePermissionContainerDiv = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    padding: 10px;
`;

const EachRoleContainerDiv = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const AllPermissionContainerDiv = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 5px;
`;

class WizardCreateClientPageThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            department_id: null,
            selected_checkboxes: []
        };
        this.handleChangeDepartment = this.handleChangeDepartment.bind(this);
        this.handleChangePermissionCheckbox = this.handleChangePermissionCheckbox.bind(
            this
        );
    }

    handleChangeDepartment(event) {
        this.setState({
            department_id: event.target.value,
            selected_checkboxes: []
        });
    }

    handleChangePermissionCheckbox(event) {
        const { selected_checkboxes } = this.state;
        if (selected_checkboxes.includes(event.target.id)) {
            //Remove from selected checkboxes
            const index = selected_checkboxes.indexOf(event.target.id);
            this.setState({
                selected_checkboxes: [
                    ...selected_checkboxes.slice(0, index),
                    ...selected_checkboxes.slice(index + 1)
                ]
            });
        } else {
            //Add to selected checkboxes
            this.setState({
                selected_checkboxes: [...selected_checkboxes, event.target.id]
            });
        }
    }

    renderRolePermissionSection(selected_department) {
        if (!Boolean(selected_department)) {
            return <React.Fragment />;
        } else {
            const { roles = [] } = selected_department;
            const { selected_checkboxes } = this.state;
            let allPermissionsLength = 0;
            roles.forEach(role => {
                allPermissionsLength += role.permissions.length;
            });
            return (
                <React.Fragment>
                    {roles.length > 0 ? (
                        <RolePermissionContainerDiv>
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    padding: 10
                                }}
                            >
                                <EachRoleContainerDiv />
                                <div
                                    style={{
                                        width: "50%",
                                        height: "100%",
                                        padding: 5
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={
                                                    selected_checkboxes.length ===
                                                    allPermissionsLength
                                                }
                                                onChange={() => {
                                                    //https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
                                                    if (
                                                        selected_checkboxes.length ===
                                                        allPermissionsLength
                                                    ) {
                                                        this.setState({
                                                            selected_checkboxes: []
                                                        });
                                                    } else {
                                                        const permissions = [].concat.apply(
                                                            [],
                                                            selected_department.roles.map(
                                                                role => {
                                                                    let output = [];
                                                                    role.permissions.forEach(
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
                                                        this.setState({
                                                            selected_checkboxes: permissions.slice()
                                                        });
                                                    }
                                                }}
                                            />
                                        }
                                        label="All Permissions"
                                    />
                                </div>
                            </div>
                            {roles.map(
                                (
                                    { id: roleId, name: roleName, permissions },
                                    roleIndex
                                ) => (
                                    <EachRolePermissionContainerDiv
                                        key={`ROLE-${roleId}-${roleIndex}`}
                                    >
                                        <EachRoleContainerDiv>
                                            {roleName} Permissions
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
                                                        key={`PERMISSION-${permissionId}-${permissionIndex}`}
                                                        control={
                                                            <Checkbox
                                                                id={
                                                                    permissionId
                                                                }
                                                                checked={selected_checkboxes.includes(
                                                                    permissionId
                                                                )}
                                                                onChange={
                                                                    this
                                                                        .handleChangePermissionCheckbox
                                                                }
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
                    ) : (
                        <React.Fragment />
                    )}
                </React.Fragment>
            );
        }
    }

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
                                                                    padding: 10,
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
                                <Mutation
                                    mutation={CREATE_DEPARTMENT()}
                                    refetchQueries={[
                                        {
                                            query: getDepartmentListByUser
                                        }
                                    ]}
                                >
                                    {(addANewRole, { loading, error }) => {
                                        if (loading)
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
                                        if (error)
                                            return `Error! ${error.message}`;
                                        return (
                                            <Formik
                                                onSubmit={(
                                                    values,
                                                    { setSubmitting }
                                                ) => {
                                                    alert(values.name);
                                                    setSubmitting(false);
                                                }}
                                                initialValues={{
                                                    name: "",
                                                    department: ""
                                                }}
                                                render={({
                                                    errors,
                                                    values,
                                                    isSubmitting
                                                }) => {
                                                    const {
                                                        department_id
                                                    } = this.state;
                                                    const selected_department =
                                                        Boolean(
                                                            department_id
                                                        ) &&
                                                        department_id.length > 0
                                                            ? departments.find(
                                                                  ({ id }) =>
                                                                      id ===
                                                                      department_id
                                                              )
                                                            : null;
                                                    return (
                                                        <RoleSectionDiv>
                                                            <div
                                                                style={{
                                                                    width:
                                                                        "45%",
                                                                    paddingTop: 10,
                                                                    paddingBottom: 10
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        paddingBottom: 20
                                                                    }}
                                                                >
                                                                    <FormControl
                                                                        fullWidth={
                                                                            true
                                                                        }
                                                                    >
                                                                        <InputLabel htmlFor="simple-department-picker">
                                                                            {Boolean(
                                                                                department_id
                                                                            )
                                                                                ? ""
                                                                                : "Department"}
                                                                        </InputLabel>
                                                                        <Select
                                                                            id="simple-department-picker"
                                                                            value={
                                                                                department_id
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .handleChangeDepartment
                                                                            }
                                                                            disabled={
                                                                                departments.length <
                                                                                1
                                                                            }
                                                                        >
                                                                            <MenuItem
                                                                                value=""
                                                                                disabled
                                                                            >
                                                                                Department
                                                                            </MenuItem>
                                                                            {departments.map(
                                                                                (
                                                                                    {
                                                                                        id,
                                                                                        name
                                                                                    },
                                                                                    index
                                                                                ) => (
                                                                                    <MenuItem
                                                                                        key={`DEPARTMENT-${id}-${index}`}
                                                                                        value={
                                                                                            id
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            name
                                                                                        }
                                                                                    </MenuItem>
                                                                                )
                                                                            )}
                                                                        </Select>
                                                                    </FormControl>
                                                                </div>
                                                                <Field
                                                                    name="name"
                                                                    label="Role Name"
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
                                                                    padding: 10,
                                                                    flex: 1,
                                                                    height:
                                                                        "100%"
                                                                }}
                                                            >
                                                                ROLE PERMISSIONS
                                                                {this.renderRolePermissionSection(
                                                                    selected_department
                                                                )}
                                                            </div>
                                                        </RoleSectionDiv>
                                                    );
                                                }}
                                            />
                                        );
                                    }}
                                </Mutation>
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
