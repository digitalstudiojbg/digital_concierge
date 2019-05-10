                                        import React from "react";
import styled from "styled-components";
import { Query, withApollo, Mutation, gql } from "react-apollo";
import Loading from "../../loading/Loading";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import {
    getPermissionCategoryList,
    getRoleList,
    getDepartmentListByClient,
    getNewCreatedClientId
} from "../../../data/query";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {
    CREATE_DEPARTMENT,
    CREATE_ROLE,
    UPDATE_ROLE
} from "../../../data/mutation";
import { ClipLoader } from "react-spinners";
import FormControl from "@material-ui/core/FormControl";

import {withStyles} from '@material-ui/core/styles';

import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Checkbox from "@material-ui/core/Checkbox";
import { Set } from "immutable";
import { DECIMAL_RADIX } from "../../../utils/Constants";
// import ReactTable from "react-table";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MoreHorizontalIcon from "@material-ui/icons/MoreHoriz";
import LaunchIcon from "@material-ui/icons/Launch";
import DeleteIcon from "@material-ui/icons/Delete";
import CopyIcon from "@material-ui/icons/FileCopy";
import PageThreeRoleModal from "./three/PageThreeRoleModal";
import PageThreeDeleteModal from "./three/PageThreeDeleteModal";
import PageThreeDuplicateModal from "./three/PageThreeDuplicateModal";


import {
    ContainerDiv,
    SectionDiv,
    SectionDivContainer,
    DepartmentSectionDiv,
    RoleSectionDiv,
    RolePermissionContainerDiv,
    EachRolePermissionContainerDiv,
    EachRoleContainerDiv,
    AllPermissionContainerDiv,
    AllPermissionFooterContainerDiv,
    PermissionFooterEntryDiv,
    SubFieldContainerDiv,
    FieldLabel,
    NormalButton,
    ContinueButton
    } from "./CreateClientStyleSet";
    
    const styles = theme => ({
        mylabel: {
          fontSize: '10px'
        },
        inputPdding:{
            padding: '0px'
        }
      });
      
class WizardCreateClientPageThree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            department_id: null,
            selected_checkboxes: Set(),
            modalOpen: false,
            whichModal: "",
            selected_roles: Set(),
            anchorEl: null,
            editRole: null,
            
        };
        this.handleChangeDepartment = this.handleChangeDepartment.bind(this);
        this.handleChangePermissionCheckbox = this.handleChangePermissionCheckbox.bind(
            this
        );
        this.handleChangeSelectedRoles = this.handleChangeSelectedRoles.bind(
            this
        );
        this.handleOpenRoleModal = this.handleOpenRoleModal.bind(this);
        this.handleOpenSingleDeleteModal = this.handleOpenSingleDeleteModal.bind(
            this
        );
        this.handleOpenMultipleDeleteModal = this.handleOpenMultipleDeleteModal.bind(
            this
        );
        this.handleOpenSingleDuplicateModal = this.handleOpenSingleDuplicateModal.bind(
            this
        );
        this.handleOpenMultipleDuplicateModal = this.handleOpenMultipleDuplicateModal.bind(
            this
        );
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenOptions = this.handleCloseOptions.bind(this);
        this.handleCloseOptions = this.handleCloseOptions.bind(this);
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

    handleChangeSelectedRoles(event) {
        const { selected_roles } = this.state;
        if (selected_roles.includes(event.target.id)) {
            //Remove from selected checkboxes
            this.setState({
                selected_roles: selected_roles.delete(event.target.id)
            });
        } else {
            //Add to selected checkboxes
            this.setState({
                selected_roles: selected_roles.add(event.target.id)
            });
        }
    }

    handleOpenSingleDeleteModal() {
        this.setState({
            modalOpen: true,
            whichModal: "single-delete",
            anchorEl: null
        });
    }

    handleOpenMultipleDeleteModal() {
        this.setState({
            modalOpen: true,
            whichModal: "multiple-delete",
            anchorEl: null
        });
    }

    handleOpenSingleDuplicateModal() {
        this.setState({
            modalOpen: true,
            whichModal: "single-duplicate",
            anchorEl: null
        });
    }

    handleOpenMultipleDuplicateModal() {
        this.setState({
            modalOpen: true,
            whichModal: "multiple-duplicate",
            anchorEl: null
        });
    }

    handleOpenRoleModal() {
        this.setState({ modalOpen: true, whichModal: "role", anchorEl: null });
    }

    handleCloseModal() {
        this.setState({ modalOpen: false, whichModal: "", editRole: null });
    }

    //Function to open options menu
    handleOpenOptions(event) {
        console.log("OPEN OPTION ", event);
        this.setState({ anchorEl: event.currentTarget });
    }

    handleCloseOptions() {
        this.setState({ anchorEl: null, editRole: null });
    }

    renderRolePermissionSection(
        departments,
        clientId,
        addRoleAction,
        editRoleAction
    ) {
        const { classes } = this.props;
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
                                 //   paddingTop:"0",
                                    padding: 10
                                }}
                            >
                                <div
                                    style={{
                                        width: "40%",
                                        height: "100%",
                                       
                                    }}
                                >
                                    <IconButton
                                        style={{ margin:"0px", padding:"0px" }}
                                        aria-label="Expand"
                                        onClick={this.handleOpenRoleModal}
                                    >
                                        <LaunchIcon fontSize="large"   />
                                    </IconButton>
                                </div>
                                <div
                                    style={{
                                        width: "60%",
                                        height: "100%",
                                        paddingLeft:"5%",
                                        paddingTop:"2%"
                                       // padding: 5
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                style={{color:"#2699FB", padding:"0"}}
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
                                        <EachRoleContainerDiv style={{ fontSize:"10px"}}>
                                            {categoryName}
                                        </EachRoleContainerDiv>
                                        <AllPermissionContainerDiv>
                                        
                                            {permissions.map(
                                                (
                                                    {
                                                        id: permissionId,
                                                        name: permissionName,
                                                       
                                                    },
                                                    permissionIndex
                                                    
                                                ) => (
                                                    <FormControlLabel
                                                        style={{padding:"0", margin:"0", fontSize:"5px"}}
                                                        // className={
                                                        //     classes.mylabel
                                                        // }
                                                        classes={{
                                                            label: classes.mylabel
                                                        }}
                                                  
                                                        key={`PERMISSION-${permissionId}-${permissionIndex}`}
                                                        control={
                                                            <Checkbox
                                                                style={{padding:"3px 0", color:"#2699FB",Label:{fontSize:"10px"}}}
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
                                                    style={{border:"0"}}
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
                                                   <label style={{color:"#2699FB", fontSize:"10px"}}> SELECT ALL </label>
                                                </PermissionFooterEntryDiv>
                                                <PermissionFooterEntryDiv
                                                    style={{border:"0"}}
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
                                                   <label style={{color:"#2699FB", fontSize:"10px"}}>  UNSELECT ALL</label>
                                                </PermissionFooterEntryDiv>
                                            </AllPermissionFooterContainerDiv>
                                        </AllPermissionContainerDiv>
                                    </EachRolePermissionContainerDiv>
                                )
                            )}
                            {this.state.modalOpen &&
                                this.state.whichModal === "role" && (
                                    <PageThreeRoleModal
                                        handleClose={this.handleCloseModal}
                                        departments={departments}
                                        permissionsCategories={
                                            permissionCategories
                                        }
                                        clientId={clientId}
                                        role={this.state.editRole}
                                        submitAction={
                                            Boolean(this.state.editRole)
                                                ? editRoleAction
                                                : addRoleAction
                                        }
                                    />
                                )}
                            {this.state.modalOpen &&
                                this.state.whichModal === "single-delete" && (
                                    <PageThreeDeleteModal
                                        clientId={clientId}
                                        role={this.state.editRole}
                                        handleClose={this.handleCloseModal}
                                    />
                                )}
                            {this.state.modalOpen &&
                                this.state.whichModal ===
                                    "single-duplicate" && (
                                    <PageThreeDuplicateModal
                                        clientId={clientId}
                                        role={this.state.editRole}
                                        handleClose={this.handleCloseModal}
                                    />
                                )}
                        </RolePermissionContainerDiv>
                    );
                }}
            </Query>
        );
        // }
    }

    render() {
       // let clientId = 1;
          let clientId = null;
        
         try {
            console.log("-------------");

            clientId = this.props.client.readQuery({
                query: getNewCreatedClientId
            }).new_create_client_id;
            console.log(clientId);

            console.log("-------------");
        } catch (error) {
            console.log(error);
            return (
                <React.Fragment>
                    <h1>Can't Find ClientId From Step 1</h1>
                    <Loading />
                </React.Fragment>
            );
        }
        // const clientId = "3"; //Testing purposes
        const { selected_roles } = this.state;
        const { classes } = this.props;
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
                        <ContainerDiv >
                            <SectionDivContainer style={{ borderRight:"1px solid #9D9D9D", paddingRight:"0" }}>
                            
                                <label style={{color:"#2699FB", fontSize:"16px"}}>Department</label>
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
                                                                    values.name,
                                                                clientId
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
                                                                    paddingBottom: 20
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
                                                           
                                                                <NormalButton
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
                                                                </NormalButton>
                                                            </div>
                                                            
                                                        </DepartmentSectionDiv>
                                                    </Form>
                                                )}
                                            />
                                        );
                                    }}
                                </Mutation>
                                
                                <SectionDiv style={{paddingLeft:"0", paddingRight:"3%", borderRight:"0px", borderTop:"1px solid #9D9D9D"}}>
                                    <label style={{color:"#2699FB", fontSize:"16px", marginTop :"20px", }}>Role </label>
                                    <Mutation
                                        mutation={CREATE_ROLE}
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
                                                    input={
                                                        <OutlinedInput />
                                                    }
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
                                                        ),
                                                        clientId: parseInt(
                                                            clientId,
                                                            DECIMAL_RADIX
                                                        )
                                                    };
                                                    // console.log(input);
                                                    addANewRole({
                                                        variables: {
                                                            input
                                                        }
                                                    }).then(() => {
                                                        setSubmitting(false);
                                                        this.setState({
                                                            selected_checkboxes: Set(),
                                                            department_id: null
                                                        });
                                                    });
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
                                                                        paddingRight :10,
                                                              
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
                                                                    <FieldLabel >Department</FieldLabel>
                                                                        {/* <InputLabel 
                                                                            htmlFor="simple-department-picker" 
                                                                        >
                                                                            {Boolean(
                                                                                this
                                                                                    .state
                                                                                    .department_id
                                                                            )
                                                                                ? ""
                                                                                : "Department"
                                                             
                                                                                }
                                                                        
                                                                        </InputLabel> */}
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
                                                                            input={
                                                                                <OutlinedInput />
                                                                             //   <OutlinedInput classes={{input: classes.inputPdding}}/>
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

                                                                <FieldLabel>Role Name</FieldLabel>
                                                                <Field
                                                                    inputProps={{syle:{padding:0}}}
                                                                    name="name"
                                                                   // label="Role Name"
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
                                                                    width:"65%",
                                                                    paddingLeft:10,
                                                                   // paddingRight:10,                                                          
                                                                    flex: 1,
                                                                    height:
                                                                        "100%"
                                                                }}
                                                            >
                                                                <FieldLabel>ROLE PERMISSIONS</FieldLabel>
                                                                <Mutation
                                                                    mutation={
                                                                        UPDATE_ROLE
                                                                    }
                                                                    refetchQueries={[
                                                                        {
                                                                            query: getRoleList,
                                                                            variables: {
                                                                                clientId
                                                                            }
                                                                        }
                                                                    ]}
                                                                >
                                                                    {(
                                                                        editARole,
                                                                        {
                                                                            loading: loadingEdit,
                                                                            error: errorEdit
                                                                        }
                                                                    ) => {
                                                                        if (
                                                                            loadingEdit
                                                                        )
                                                                            return (
                                                                                <React.Fragment />
                                                                            );
                                                                        if (
                                                                            errorEdit
                                                                        )
                                                                            return `Error message: ${
                                                                                errorEdit.message
                                                                            }`;
                                                                        return this.renderRolePermissionSection(
                                                                            departments,
                                                                            clientId,
                                                                            addANewRole,
                                                                            editARole
                                                                        );
                                                                    }}
                                                                </Mutation>
                                                                <div
                                                                    style={{
                                                                        paddingTop: 10,
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            "flex-end"
                                                                    }}
                                                                >
                                                                    <NormalButton
                                                                        type="submit"
                                                                        variant="contained"
                                                                      //  color="primary"
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
                                                                  </NormalButton>
                                                                </div>
                                                            </div>
                                                        </RoleSectionDiv>
                                                    </Form>
                                                )}
                                            />
                                        );
                                    }}
                                </Mutation>
                              </SectionDiv>
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
                                    // console.log(roleList);
                                    return (
                                        <SectionDivContainer         
                                            
                                        style={{
                                            paddingLeft:"20px",
                                            paddingRight:"0"
                                        }} >
                                             <div 
                                            
                                                style={{
                                                    width: "100%",
                                                    display: "flex", 
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: "80%",
                                                        paddingLeft:"3%",
                                                        paddingTop:"3%",
                                                        display: "flex",
                                                       
                                                    }}
                                                >
                                                    <FieldLabel style={{fontSize:"12px"}}>STRUCTURE TABLE</FieldLabel >
                                                </div>
                                                <div
                                                    style={{
                                                        width: "10%",
                                                        display: "flex",
                                                        justifyContent:
                                                            "flex-end"
                                                    }}
                                                >
                                                    <IconButton
                                                        aria-label="Copy"
                                                        disabled={
                                                            this.state
                                                                .selected_roles
                                                                .size === 0
                                                        }
                                                        onClick={
                                                            this
                                                                .handleOpenMultipleDuplicateModal
                                                        }
                                                    >
                                                        <CopyIcon fontSize="large" />
                                                    </IconButton>
                                                </div>
                                                <div
                                                    style={{
                                                        width: "10%",
                                                        display: "flex",
                                                        justifyContent:
                                                            "flex-end"
                                                    }}
                                                >
                                                    <IconButton
                                                        aria-label="Delete"
                                                        disabled={
                                                            this.state
                                                                .selected_roles
                                                                .size === 0
                                                        }
                                                        onClick={
                                                            this
                                                                .handleOpenMultipleDeleteModal
                                                        }
                                                    >
                                                        <DeleteIcon fontSize="large" />
                                                    </IconButton>
                                                </div>
                                            </div >

                                            {/* <ReactTable
                                                defaultPageSize={10}
                                                data={roleList}
                                                getTdProps={(
                                                    _state,
                                                    _rowInfo,
                                                    column,
                                                    _instance
                                                ) => ({
                                                    onClick: (
                                                        e,
                                                        handleOriginal
                                                    ) => {
                                                        if (
                                                            column.Header ===
                                                            "ACTIONS"
                                                        ) {
                                                            //Only fire action in action columns
                                                            // this.handleOpenOptions(
                                                            //     e
                                                            // );
                                                            handleOriginal &&
                                                                handleOriginal();
                                                        }
                                                    }
                                                })}
                                                columns={[
                                                    {
                                                        Header: "",
                                                        style: {
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                            alignItems: "center"
                                                        },
                                                        filterable: true,
                                                        sortable: false,
                                                        resizable: false,
                                                        width: 70,
                                                        Cell: ({
                                                            original: { id }
                                                        }) => (
                                                            <Checkbox
                                                                id={id}
                                                                checked={this.state.selected_roles.includes(
                                                                    id
                                                                )}
                                                                onChange={
                                                                    this
                                                                        .handleChangeSelectedRoles
                                                                }
                                                            />
                                                        ),
                                                        Filter: (
                                                            <Checkbox
                                                                indeterminate={
                                                                    this.state
                                                                        .selected_roles
                                                                        .size >
                                                                        0 &&
                                                                    this.state
                                                                        .selected_roles
                                                                        .size <
                                                                        roleList.length
                                                                }
                                                                checked={
                                                                    this.state
                                                                        .selected_roles
                                                                        .size ===
                                                                    roleList.length
                                                                }
                                                                onChange={() => {
                                                                    if (
                                                                        this
                                                                            .state
                                                                            .selected_roles
                                                                            .size ===
                                                                        roleList.length
                                                                    ) {
                                                                        this.setState(
                                                                            {
                                                                                selected_roles: Set()
                                                                            }
                                                                        );
                                                                    } else {
                                                                        this.setState(
                                                                            {
                                                                                selected_roles: this.state.selected_roles.union(
                                                                                    roleList.map(
                                                                                        ({
                                                                                            id
                                                                                        }) =>
                                                                                            id
                                                                                    )
                                                                                )
                                                                            }
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        )
                                                    },
                                                    {
                                                        Header: "ROLE",
                                                        accessor: "name",
                                                        style: {
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                            alignItems: "center"
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
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                            alignItems: "center"
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
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                            alignItems: "center"
                                                        },
                                                        Cell: ({
                                                            original: { id }
                                                        }) => (
                                                            <MoreHorizontalIcon
                                                                id={id}
                                                                onClick={
                                                                    this
                                                                        .handleOpenOptions
                                                                }
                                                            />
                                                        ),
                                                        filterable: false,
                                                        sortable: false,
                                                        resizable: false,
                                                        width: 70
                                                    }
                                                ]}
                                            /> */}

                                            {this.state.modalOpen &&
                                                this.state.whichModal ===
                                                    "multiple-delete" && (
                                                    <PageThreeDeleteModal
                                                        clientId={clientId}
                                                        roles={roleList.filter(
                                                            ({ id }) =>
                                                                this.state.selected_roles.includes(
                                                                    id
                                                                )
                                                        )}
                                                        handleClose={
                                                            this
                                                                .handleCloseModal
                                                        }
                                                    />
                                                )}

                                            {this.state.modalOpen &&
                                                this.state.whichModal ===
                                                    "multiple-duplicate" && (
                                                    <PageThreeDuplicateModal
                                                        clientId={clientId}
                                                        roles={roleList.filter(
                                                            ({ id }) =>
                                                                this.state.selected_roles.includes(
                                                                    id
                                                                )
                                                        )}
                                                        handleClose={
                                                            this
                                                                .handleCloseModal
                                                        }
                                                    />
                                                )}

                                            <Table style={{border:"1px solid #9D9D9D"}}>
                                                <TableHead>
                                                    <TableRow style={{borderBottom:"2px solid #5C5C5C", width:"100%"}}>
                                                        {/* <TableCell padding="checkbox">
                                                            <Checkbox
                                                                indeterminate={
                                                                    selected_roles.size >
                                                                        0 &&
                                                                    selected_roles.size <
                                                                        roleList.length
                                                                }
                                                                checked={
                                                                    selected_roles.size ===
                                                                    roleList.length
                                                                }
                                                                onClick={() => {
                                                                    if (
                                                                        this
                                                                            .state
                                                                            .selected_roles
                                                                            .size ===
                                                                        roleList.length
                                                                    ) {
                                                                        this.setState(
                                                                            {
                                                                                selected_roles: Set()
                                                                            }
                                                                        );
                                                                    } else {
                                                                        this.setState(
                                                                            {
                                                                                selected_roles: this.state.selected_roles.union(
                                                                                    roleList.map(
                                                                                        ({
                                                                                            id
                                                                                        }) =>
                                                                                            id
                                                                                    )
                                                                                )
                                                                            }
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        </TableCell> */}
                                                        <TableCell style={{width:"40%"}}>
                                                            ROLE
                                                        </TableCell>
                                                        <TableCell style={{width:"40%"}}>
                                                            DEPARTMENT
                                                        </TableCell>
                                                        <TableCell style={{width:"20%"}}>
                                                            ACTIONS
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {roleList.map(role => (
                                                        <TableRow
                                                            key={`TABLE-ROW-${
                                                                role.id
                                                            }`}
                                                            
                                                        >
                                                            <TableCell>
                                                                <Checkbox
                                                                    style={{padding:"0", marginRight:"10px", color:"#707070"}}
                                                                    id={role.id}
                                                                    checked={this.state.selected_roles.includes(
                                                                        role.id
                                                                    )}
                                                                    onChange={
                                                                        this
                                                                            .handleChangeSelectedRoles
                                                                    }
                                                                />
                                                            
                                                                {role.name}
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    role
                                                                        .department
                                                                        .name
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                <MoreHorizontalIcon
                                                                    onClick={
                                                                        // this
                                                                        //     .handleOpenOptions
                                                                        event => {
                                                                            this.setState(
                                                                                {
                                                                                    anchorEl:
                                                                                        event.currentTarget,
                                                                                    editRole: role
                                                                                }
                                                                            );
                                                                        }
                                                                    }
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                            {/* <PageThreeRoleTable
                                                roles={roleList}
                                            /> */}
                                            {/*ANCHOR EL MENU*/}
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={this.state.anchorEl}
                                                open={Boolean(
                                                    this.state.anchorEl
                                                )}
                                                onClose={
                                                    this.handleCloseOptions
                                                }
                                                anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "right"
                                                }}
                                                transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "right"
                                                }}
                                            >
                                                <MenuItem
                                                    onClick={
                                                        this.handleOpenRoleModal
                                                    }
                                                >
                                                    EDIT
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={
                                                        this
                                                            .handleOpenSingleDuplicateModal
                                                    }
                                                >
                                                    DUPLICATE
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={
                                                        this
                                                            .handleOpenSingleDeleteModal
                                                    }
                                                >
                                                    DELETE
                                                </MenuItem>
                                            </Menu>
                                            <SectionDiv 
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                   // paddingTop: 50
                                                }}
                                            >
                                                <ContinueButton
                                                 style={{
                                                    width: "50%", marginLeft:"50%", marginBottom:"10%"}}
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() =>
                                                        this.props.next &&
                                                        this.props.next()
                                                    }
                                                >
                                                    CONFIRM & CONTINUE
                                                </ContinueButton>
                                            </SectionDiv >
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

export default withApollo(withStyles(styles)(WizardCreateClientPageThree));

//export default (withStyles(styles))(withApollo(WizardCreateClientPageThree));


// export default compose(
//     withApollo,
//     withStyles(styles),
// )(WizardCreateClientPageThree);
        