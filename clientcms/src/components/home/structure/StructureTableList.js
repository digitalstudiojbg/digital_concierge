import React from "react";
import MaterialTable from "material-table";
import {
    ContainerDiv as ContainerDivOriginal,
    ROLE_EDIT_URL
} from "../../../utils/Constants";
import { MoreHoriz } from "@material-ui/icons";
import { IconButton, Menu, MenuList, MenuItem } from "@material-ui/core";
import styled from "styled-components";
import { NormalButton } from "../user/commonStyle";
import DepartmentDialog from "./DepartmentDialog";
import RoleDialog from "./RoleDialog";
import { withRouter } from "react-router-dom";
import { countSubstrings, isUpperCase, isLowerCase } from "voca";

const ContainerDiv = styled(ContainerDivOriginal)`
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`;

const CreateDepartmentButton = styled(NormalButton)`
    margin-right: 10px;
`;

class StructureTableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_department: null,
            open_dialog_department: false,
            open_dialog_role: false,
            dialog_data: null,
            anchorEl: null,
            anchorElId: null
        };
        this.handleDepartmentRowClick = this.handleDepartmentRowClick.bind(
            this
        );
        this.openCreateDepartmentDialog = this.openCreateDepartmentDialog.bind(
            this
        );
        this.handleCreateRoleClick = this.handleCreateRoleClick.bind(this);
        this.handleEditRoleClick = this.handleEditRoleClick.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleOpenOptions = this.handleOpenOptions.bind(this);
        this.handleCloseOptions = this.handleCloseOptions.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickDuplicate = this.handleClickDuplicate.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { data } = this.props;
        const {
            selected_department: selected_department_original
        } = this.state;
        if (prevProps.data !== data && Boolean(selected_department_original)) {
            const { id: selectedId } = selected_department_original;
            const updatedDepartment = data.find(({ id }) => id === selectedId);
            if (updatedDepartment && updatedDepartment.id) {
                const { id, name, roles } = updatedDepartment;
                this.setState({ selected_department: { id, name, roles } });
            }
        }
    }

    generateDuplicateDepartmentName = name => {
        const { data } = this.props;
        const filtered = data.filter(({ name: departmentNameOriginal }) => {
            const deptName = departmentNameOriginal.toLowerCase();
            return (
                deptName.includes(name.toLowerCase()) &&
                countSubstrings(deptName, "copy") - 1 ===
                    countSubstrings(name.toLowerCase(), "copy")
            );
        });
        const copyChar = isUpperCase(name)
            ? "COPY"
            : isLowerCase(name)
            ? "copy"
            : "Copy";
        const renderNumber = filtered.length === 0 ? "" : filtered.length;
        return Boolean(renderNumber)
            ? `${name} ${copyChar} ${renderNumber}`
            : `${name} ${copyChar}`;
    };

    generateDuplicateRoleName = name => {
        const { selected_department } = this.state;
        if (Boolean(selected_department)) {
            const { roles } = selected_department;
            const filtered = roles.filter(({ name: roleNameOriginal }) => {
                const roleName = roleNameOriginal.toLowerCase();
                return (
                    roleName.includes(name.toLowerCase()) &&
                    countSubstrings(roleName, "copy") - 1 ===
                        countSubstrings(name.toLowerCase(), "copy")
                );
            });
            const copyChar = isUpperCase(name)
                ? "COPY"
                : isLowerCase(name)
                ? "copy"
                : "Copy";
            const renderNumber = filtered.length === 0 ? "" : filtered.length;
            return Boolean(renderNumber)
                ? `${name} ${copyChar} ${renderNumber}`
                : `${name} ${copyChar}`;
        } else {
            return "";
        }
    };

    modifyDepartmentTableData() {
        const { data } = this.props;
        return data.map(({ id, name, roles }) => ({ id, name, roles }));
    }

    modifyRoleTableData() {
        const { selected_department } = this.state;
        return Boolean(selected_department) &&
            Array.isArray(selected_department.roles) &&
            selected_department.roles.length > 0
            ? selected_department.roles.map(({ id, name, permissions }) => ({
                  id,
                  name,
                  permissions
              }))
            : [];
    }

    renderHeaderSection() {
        return (
            <div style={{ width: "100%", height: 70, display: "flex" }}>
                <div
                    style={{
                        width: "70%",
                        fontSize: "2.3em",
                        fontWeight: 600,
                        color: "black"
                    }}
                >
                    STRUCTURE TABLE
                </div>
                <div style={{ width: "30%", display: "flex" }}>
                    <CreateDepartmentButton
                        onClick={this.openCreateDepartmentDialog}
                    >
                        CREATE DEPARTMENT
                    </CreateDepartmentButton>
                    <NormalButton onClick={this.handleCreateRoleClick}>
                        CREATE ROLE
                    </NormalButton>
                </div>
            </div>
        );
    }

    handleDepartmentRowClick(_event, selected_department) {
        this.setState({ selected_department });
    }

    handleCreateRoleClick() {
        const { history, clientId } = this.props;
        Boolean(history) &&
            history.push(
                ROLE_EDIT_URL.replace(":client_id", clientId).replace(
                    ":role_id",
                    "new"
                )
            );
    }

    handleEditRoleClick(_event, { id: role_id }) {
        const { history, clientId } = this.props;
        Boolean(history) &&
            history.push(
                ROLE_EDIT_URL.replace(":client_id", clientId).replace(
                    ":role_id",
                    role_id
                )
            );
    }

    openCreateDepartmentDialog() {
        const { clientId } = this.props;
        this.setState({
            open_dialog_department: true,
            dialog_data: {
                id: "",
                name: "",
                clientId,
                duplicate: false,
                delete: false
            }
        });
    }

    openEditDepartmentDialog = rowData => {
        const { clientId } = this.props;
        const { id = "", name = "" } = rowData || {};
        this.setState({
            open_dialog_department: true,
            dialog_data: {
                id,
                name,
                clientId,
                duplicate: false,
                delete: false
            },
            anchorEl: null,
            anchorElId: null
        });
    };

    openDeleteDepartmentDialog = rowData => {
        const { clientId } = this.props;
        const { id = "", name = "" } = rowData || {};
        this.setState({
            open_dialog_department: true,
            dialog_data: {
                id,
                name,
                clientId,
                duplicate: false,
                delete: true
            },
            anchorEl: null,
            anchorElId: null
        });
    };

    openDuplicateDepartmentDialog = rowData => {
        const { clientId } = this.props;
        const { id = "", name: originalName = "" } = rowData || {};
        //DIFFERENTIATE DUPLICATE NAME
        const name = this.generateDuplicateDepartmentName(originalName);
        this.setState({
            open_dialog_department: true,
            dialog_data: {
                id,
                name,
                clientId,
                duplicate: true,
                delete: false
            },
            anchorEl: null,
            anchorElId: null
        });
    };

    openDeleteRoleDialog = rowData => {
        const { clientId } = this.props;
        const { id = "", name = "" } = rowData || {};
        this.setState({
            open_dialog_role: true,
            dialog_data: {
                id,
                name,
                clientId,
                duplicate: false,
                delete: true
            },
            anchorEl: null,
            anchorElId: null
        });
    };

    openDuplicateRoleDialog = rowData => {
        const { clientId } = this.props;
        const { id = "", name: originalName = "" } = rowData || {};
        //DIFFERENTIATE DUPLICATE NAME
        const name = this.generateDuplicateRoleName(originalName);
        this.setState({
            open_dialog_role: true,
            dialog_data: {
                id,
                name,
                clientId,
                duplicate: true,
                delete: false
            },
            anchorEl: null,
            anchorElId: null
        });
    };

    closeDialog() {
        this.setState({
            open_dialog_department: false,
            open_dialog_role: false,
            dialog_data: null
        });
    }

    renderTableSection() {
        const { selected_department } = this.state;
        return (
            <div
                style={{
                    flex: 1,
                    width: "50%",
                    padding: "1%",
                    display: "flex"
                }}
            >
                <div style={{ width: "50%" }}>
                    <MaterialTable
                        data={this.modifyDepartmentTableData()}
                        columns={[
                            {
                                title: "DEPARTMENT",
                                field: "name",
                                headerStyle: {
                                    textAlign: "center"
                                },
                                cellStyle: {
                                    textAlign: "center"
                                }
                            },
                            {
                                title: "ACTIONS",
                                render: ({ id }) => (
                                    <IconButton
                                        id={`department-${id}`}
                                        onClick={this.handleOpenOptions}
                                    >
                                        <MoreHoriz />
                                    </IconButton>
                                ),
                                disableClick: true,
                                sorting: false,
                                headerStyle: {
                                    borderRight: "1px solid rgb(223,223,223"
                                }
                            }
                        ]}
                        options={{
                            showTitle: false,
                            pageSizeOptions: [5, 10],
                            rowStyle: rowData => ({
                                backgroundColor:
                                    this.state.selected_department &&
                                    this.state.selected_department.id ===
                                        rowData.id
                                        ? "#BCE0FD"
                                        : "white"
                            })
                        }}
                        onRowClick={this.handleDepartmentRowClick}
                    />
                </div>
                <div style={{ width: "50%" }}>
                    <MaterialTable
                        data={this.modifyRoleTableData()}
                        columns={[
                            {
                                title: "ROLE",
                                field: "name",
                                headerStyle: {
                                    textAlign: "center"
                                },
                                cellStyle: {
                                    textAlign: "center"
                                }
                            },
                            {
                                title: "ACTIONS",
                                render: ({ id }) => (
                                    <IconButton
                                        id={`role-${id}`}
                                        onClick={this.handleOpenOptions}
                                    >
                                        <MoreHoriz />
                                    </IconButton>
                                ),
                                disableClick: true,
                                sorting: false
                            }
                        ]}
                        options={{
                            showTitle: false,
                            pageSizeOptions: [5, 10]
                        }}
                        localization={{
                            body: {
                                emptyDataSourceMessage:
                                    Boolean(selected_department) &&
                                    Array.isArray(selected_department.roles)
                                        ? `NO ROLES FOR DEPARTMENT ${
                                              selected_department.name
                                          }`
                                        : "PLEASE SELECT A DEPARTMENT TO VIEW THE LIST OF ROLES"
                            }
                        }}
                        onRowClick={this.handleEditRoleClick}
                    />
                </div>
            </div>
        );
    }

    handleOpenOptions(event) {
        // console.log("ID is ", event.currentTarget.id);
        this.setState({
            anchorEl: event.currentTarget,
            anchorElId: event.currentTarget.id
        });
    }
    handleCloseOptions() {
        this.setState({ anchorEl: null, anchorElId: null });
    }

    handleClickEdit() {
        const { anchorElId } = this.state;
        const id_array = anchorElId.split("-");
        if (id_array.includes("department")) {
            //Department Dialog stuffs
            const [_, departmentId] = id_array;
            const { data } = this.props;
            const departmentData =
                data.find(({ id }) => id === departmentId) || {};
            this.openEditDepartmentDialog(departmentData);
        } else if (id_array.includes("role")) {
            //Role Dialog / Page stuffs
            const [_, roleId] = id_array;
            const { history, clientId } = this.props;
            Boolean(history) &&
                history.push(
                    ROLE_EDIT_URL.replace(":client_id", clientId).replace(
                        ":role_id",
                        roleId
                    )
                );
        }
    }

    handleClickDelete() {
        const { anchorElId, selected_department } = this.state;
        const id_array = anchorElId.split("-");
        if (id_array.includes("department")) {
            //Department Dialog stuffs
            const [_, departmentId] = id_array;
            const { data } = this.props;
            const departmentData =
                data.find(({ id }) => id === departmentId) || {};
            this.openDeleteDepartmentDialog(departmentData);
        } else if (id_array.includes("role")) {
            //Role Dialog / Page stuffs
            const [_, roleId] = id_array;
            const { roles = [] } = selected_department || {};
            const roleData = roles.find(({ id }) => id === roleId);
            this.openDeleteRoleDialog(roleData);
        }
    }

    handleClickDuplicate() {
        const { anchorElId, selected_department } = this.state;
        const id_array = anchorElId.split("-");
        if (id_array.includes("department")) {
            //Department Dialog stuffs
            const [_, departmentId] = id_array;
            const { data } = this.props;
            const departmentData =
                data.find(({ id }) => id === departmentId) || {};
            this.openDuplicateDepartmentDialog(departmentData);
        } else if (id_array.includes("role")) {
            //Role Dialog / Page stuffs
            const [_, roleId] = id_array;
            const { roles = [] } = selected_department || {};
            const roleData = roles.find(({ id }) => id === roleId);
            this.openDuplicateRoleDialog(roleData);
        }
    }

    renderMenuSection() {
        const { anchorEl } = this.state;
        return (
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleCloseOptions}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
            >
                <MenuList>
                    <MenuItem onClick={this.handleClickEdit}>EDIT</MenuItem>
                    <MenuItem onClick={this.handleClickDelete}>DELETE</MenuItem>
                    <MenuItem onClick={this.handleClickDuplicate}>
                        DUPLICATE
                    </MenuItem>
                </MenuList>
            </Menu>
        );
    }

    render() {
        const {
            open_dialog_department,
            open_dialog_role,
            dialog_data
        } = this.state;
        return (
            <ContainerDiv>
                {this.renderHeaderSection()}
                {this.renderTableSection()}
                {this.renderMenuSection()}
                <DepartmentDialog
                    open={open_dialog_department}
                    data={dialog_data}
                    closeAction={this.closeDialog}
                />
                <RoleDialog
                    open={open_dialog_role}
                    data={dialog_data}
                    closeAction={this.closeDialog}
                />
            </ContainerDiv>
        );
    }
}

export default withRouter(StructureTableList);
