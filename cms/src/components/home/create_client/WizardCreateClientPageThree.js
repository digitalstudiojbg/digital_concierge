import React from "react";
import styled from "styled-components";
import { Query, withApollo, Mutation } from "react-apollo";
import Loading from "../../loading/Loading";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import {
    getPermissionCategoryList,
    getRoleList,
    getDepartmentListByClient
} from "../../../data/query";
import Button from "@material-ui/core/Button";
import { CREATE_DEPARTMENT, CREATE_ROLE } from "../../../data/mutation";
import { ClipLoader } from "react-spinners";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Set } from "immutable";
import { DECIMAL_RADIX } from "../../../utils/Constants";
import gql from "graphql-tag";
import ReactTable from "react-table";
import MoreHorizontalIcon from "@material-ui/icons/MoreHoriz";

const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const SectionDivContainer = styled.div`
    width: 50%;
    height: 100%;
    padding: 10px;
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
    height: 500px;
    overflow-y: scroll;
    border: 1px solid black;
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
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 5px;
`;

const AllPermissionFooterContainerDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    color: blue;
`;

const PermissionFooterEntryDiv = styled.span`
    width: 45%;
    display: flex;
    margin-right: 5px;
    justify-content: center;
    border: 1px solid blue;
`;

class WizardCreateClientPageThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            department_id: null,
            selected_checkboxes: Set()
        };
        this.handleChangeDepartment = this.handleChangeDepartment.bind(this);
        this.handleChangePermissionCheckbox = this.handleChangePermissionCheckbox.bind(
            this
        );
    }

    handleChangeDepartment(event) {
        this.setState({
            department_id: event.target.value
            // selected_checkboxes: Set()
        });
    }

    handleChangePermissionCheckbox(event) {
        const { selected_checkboxes } = this.state;
        if (selected_checkboxes.includes(event.target.id)) {
            //Remove from selected checkboxes
            this.setState({
                selected_checkboxes: selected_checkboxes.delete(event.target.id)
            });
        } else {
            //Add to selected checkboxes
            this.setState({
                selected_checkboxes: selected_checkboxes.add(event.target.id)
            });
        }
    }

    renderRolePermissionSection() {
        return (
            <Query query={getPermissionCategoryList}>
                {({ loading, error, data: { permissionCategories } }) => {
                    if (loading) return <Loading loadingData />;
                    if (error) return `Error! ${error.message}`;
                    const { selected_checkboxes } = this.state;
                    let allPermissionsLength = 0;
                    permissionCategories.forEach(category => {
                        allPermissionsLength += category.permissions.length;
                    });
                    return (
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
                                                    selected_checkboxes.size ===
                                                    allPermissionsLength
                                                }
                                                onChange={() => {
                                                    //https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
                                                    if (
                                                        selected_checkboxes.size ===
                                                        allPermissionsLength
                                                    ) {
                                                        this.setState({
                                                            selected_checkboxes: Set()
                                                        });
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
                                                        this.setState({
                                                            selected_checkboxes: selected_checkboxes.union(
                                                                permissions
                                                            )
                                                        });
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
                                    {
                                        id: categoryId,
                                        name: categoryName,
                                        permissions
                                    },
                                    categoryIndex
                                ) => (
                                    <EachRolePermissionContainerDiv
                                        key={`CATEGORY-${categoryId}-${categoryIndex}`}
                                    >
                                        <EachRoleContainerDiv>
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
                                            <AllPermissionFooterContainerDiv>
                                                <PermissionFooterEntryDiv
                                                    onClick={() => {
                                                        const {
                                                            selected_checkboxes
                                                        } = this.state;
                                                        this.setState({
                                                            selected_checkboxes: selected_checkboxes.union(
                                                                permissions.map(
                                                                    ({ id }) =>
                                                                        id
                                                                )
                                                            )
                                                        });
                                                    }}
                                                >
                                                    SELECT ALL
                                                </PermissionFooterEntryDiv>
                                                <PermissionFooterEntryDiv
                                                    onClick={() => {
                                                        const {
                                                            selected_checkboxes
                                                        } = this.state;
                                                        this.setState({
                                                            selected_checkboxes: selected_checkboxes.subtract(
                                                                permissions.map(
                                                                    ({ id }) =>
                                                                        id
                                                                )
                                                            )
                                                        });
                                                    }}
                                                >
                                                    UNSELECT ALL
                                                </PermissionFooterEntryDiv>
                                            </AllPermissionFooterContainerDiv>
                                        </AllPermissionContainerDiv>
                                    </EachRolePermissionContainerDiv>
                                )
                            )}
                        </RolePermissionContainerDiv>
                    );
                }}
            </Query>
        );
        // }
    }

    render() {
        let clientId = null;
        try {
            clientId = this.props.client.readQuery({
                query: gql`
                    {
                        new_create_client_id @client
                    }
                `
            }).new_create_client_id;
        } catch (error) {
            console.log(error);
            return (
                <React.Fragment>
                    <h1>Can't Find ClientId From Step 1</h1>
                    <Loading />
                </React.Fragment>
            );
        }

        return (
            <Query
                query={getDepartmentListByClient}
                variables={{ id: clientId }}
            >
                {({
                    loading,
                    error,
                    data: { departmentsByClient: departments }
                }) => {
                    if (loading) return <Loading loadingData />;
                    if (error) return `Error! ${error.message}`;
                    return (
                        <ContainerDiv>
                            <SectionDivContainer>
                                Department
                                <Mutation
                                    mutation={CREATE_DEPARTMENT()}
                                    refetchQueries={[
                                        {
                                            query: getDepartmentListByClient,
                                            variables: { id: clientId }
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
                                    mutation={CREATE_ROLE()}
                                    refetchQueries={[
                                        {
                                            query: getRoleList,
                                            variables: { clientId }
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
                                                    { name },
                                                    { setSubmitting }
                                                ) => {
                                                    const {
                                                        selected_checkboxes,
                                                        department_id
                                                    } = this.state;
                                                    const input = {
                                                        name,
                                                        isStandardRole: false,
                                                        permissionIds: selected_checkboxes
                                                            .toJS()
                                                            .map(item =>
                                                                parseInt(
                                                                    item,
                                                                    DECIMAL_RADIX
                                                                )
                                                            ),
                                                        departmentId: parseInt(
                                                            department_id,
                                                            DECIMAL_RADIX
                                                        )
                                                    };
                                                    console.log(input);
                                                    addANewRole({
                                                        variables: {
                                                            input
                                                        }
                                                    });
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
                                                }) => (
                                                    <Form>
                                                        <RoleSectionDiv>
                                                            <div
                                                                style={{
                                                                    width:
                                                                        "35%",
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
                                                                                this
                                                                                    .state
                                                                                    .department_id
                                                                            )
                                                                                ? ""
                                                                                : "Department"}
                                                                        </InputLabel>
                                                                        {/* <InputLabel htmlFor="simple-department-picker">
                                                                            Department
                                                                        </InputLabel> */}
                                                                        <Select
                                                                            id="simple-department-picker"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .department_id
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
                                                                {this.renderRolePermissionSection()}
                                                                <div
                                                                    style={{
                                                                        paddingTop: 10,
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            "flex-end"
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
                                                                                0
                                                                        }
                                                                    >
                                                                        Add Role
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </RoleSectionDiv>
                                                    </Form>
                                                )}
                                            />
                                        );
                                    }}
                                </Mutation>
                            </SectionDivContainer>
                            <Query query={getRoleList} variables={{ clientId }}>
                                {({
                                    loading: loadingRoles,
                                    error: errorRoles,
                                    data: { rolesByClientId: roleList } = {}
                                }) => {
                                    if (loadingRoles)
                                        return (
                                            <ClipLoader
                                                sizeUnit={"px"}
                                                size={24}
                                                color={"rgba(0, 0, 0, 0.87)"}
                                                loading={loading}
                                            />
                                        );
                                    if (errorRoles)
                                        return `Error! ${errorRoles.message}`;
                                    console.log(roleList);
                                    return (
                                        <SectionDivContainer>
                                            STRUCTURE TABLE
                                            <ReactTable
                                                defaultPageSize={10}
                                                data={roleList}
                                                columns={[
                                                    {
                                                        Header: "ROLE",
                                                        accessor: "name",
                                                        style: {
                                                            textAlign: "center"
                                                        },
                                                        filterable: true,
                                                        filterMethod: (
                                                            filter,
                                                            original
                                                        ) =>
                                                            original.name
                                                                .toLowerCase()
                                                                .includes(
                                                                    filter.value.toLowerCase()
                                                                )
                                                    },
                                                    {
                                                        Header: "DEPARTMENT",
                                                        accessor:
                                                            "department.name",
                                                        style: {
                                                            textAlign: "center"
                                                        },
                                                        filterable: true,
                                                        filterMethod: (
                                                            filter,
                                                            original
                                                        ) =>
                                                            original.department.name
                                                                .toLowerCase()
                                                                .includes(
                                                                    filter.value.toLowerCase()
                                                                )
                                                    },
                                                    {
                                                        Header: "ACTIONS",
                                                        style: {
                                                            textAlign: "center"
                                                        },
                                                        Cell: (
                                                            <MoreHorizontalIcon />
                                                        ),
                                                        filterable: false,
                                                        sortable: false,
                                                        resizable: false,
                                                        width: 70
                                                    }
                                                ]}
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() =>
                                                    this.props.next &&
                                                    this.props.next()
                                                }
                                            >
                                                CONFIRM & CONTINUE
                                            </Button>
                                        </SectionDivContainer>
                                    );
                                }}
                            </Query>
                        </ContainerDiv>
                    );
                }}
            </Query>
        );
    }
}

export default withApollo(WizardCreateClientPageThree);
