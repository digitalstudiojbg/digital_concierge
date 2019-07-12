import React from "react";
import MaterialTable from "material-table";
import { ContainerDiv as ContainerDivOriginal } from "../../../utils/Constants";
import { MoreHoriz } from "@material-ui/icons";
import { IconButton, Menu, MenuList, MenuItem } from "@material-ui/core";
import styled from "styled-components";
import { NormalButton } from "../user/commonStyle";
import CreateEditDepartmentDialog from "./DepartmentDialog";

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
        this.closeDepartmentDialog = this.closeDepartmentDialog.bind(this);
        this.handleOpenOptions = this.handleOpenOptions.bind(this);
        this.handleCloseOptions = this.handleCloseOptions.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
    }

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
                    <NormalButton>CREATE ROLE</NormalButton>
                </div>
            </div>
        );
    }

    handleDepartmentRowClick(_event, selected_department) {
        this.setState({ selected_department });
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

    closeDepartmentDialog() {
        this.setState({ open_dialog_department: false, dialog_data: null });
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
                            pageSizeOptions: [5, 10]
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
                                        id={`${selected_department.id}-${id}`}
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
                                        : "PLEASE SELECT A DEPARTMENT TO VIEW THE ROLE LIST"
                            }
                        }}
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
        } else {
            //Role Dialog / Page stuffs
            const [departmentId, roleId] = id_array;
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
                    <MenuItem>DELETE</MenuItem>
                    <MenuItem>DUPLICATE</MenuItem>
                </MenuList>
            </Menu>
        );
    }

    render() {
        const { open_dialog_department, dialog_data } = this.state;
        return (
            <ContainerDiv>
                {this.renderHeaderSection()}
                {this.renderTableSection()}
                {this.renderMenuSection()}
                <CreateEditDepartmentDialog
                    open={open_dialog_department}
                    data={dialog_data}
                    closeAction={this.closeDepartmentDialog}
                />
            </ContainerDiv>
        );
    }
}

export default StructureTableList;
