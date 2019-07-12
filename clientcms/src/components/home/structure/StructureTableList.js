import React from "react";
import MaterialTable from "material-table";
import { ContainerDiv as ContainerDivOriginal } from "../../../utils/Constants";
import { MoreHoriz } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import styled from "styled-components";
import { NormalButton } from "../user/commonStyle";

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
            open_dialog: false,
            which: "",
            dialog_data: null
        };
        this.handleDepartmentRowClick = this.handleDepartmentRowClick.bind(
            this
        );
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
                    <CreateDepartmentButton>
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
                                    <IconButton id={id}>
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
                                    <IconButton id={"role-" + id}>
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

    render() {
        return (
            <ContainerDiv>
                {this.renderHeaderSection()}
                {this.renderTableSection()}
            </ContainerDiv>
        );
    }
}

export default StructureTableList;
