import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { IconButton, Button } from "@material-ui/core";
import { MoreHoriz, DeleteOutlined as DeleteIcon } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { isEmpty } from "lodash";
import styled from "styled-components";

const HeaderDiv = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    padding-left: 10px;
`;

const styles = () => ({
    buttonNewUser: {
        backgroundColor: "white",
        color: "rgb(33,143,250)",
        border: "2px solid rgb(33,143,250)",
        fontWeight: 600,
        fontFamily: "Source Sans Pro, sans-serif",
        marginRight: 10
    },
    iconButton: {
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: "white",
        border: "1px solid rgba(112, 112, 112, 1)",
        height: "50%"
    }
});

class UserTableList extends React.Component {
    usersTableRef = null;
    constructor(props) {
        super(props);
        this.state = { selectedUsers: [] };
        this.usersTableRef = React.createRef();
    }

    modifyUserData() {
        const { data: users = [] } = this.props;
        return users.map(({ id, name, email, roles, active }) => {
            let roleNames = roles.map(({ name }) => name).join("; ");
            let departmentNames = roles
                .map(({ department: { name } }) => name)
                .join("; ");
            return {
                id,
                name,
                email,
                active: active ? "Active" : "Inactive",
                role: roleNames,
                department: departmentNames
            };
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{ width: "100%", height: "100%", padding: "3%" }}>
                <MaterialTable
                    tableRef={this.usersTableRef}
                    data={this.modifyUserData()}
                    columns={[
                        { title: "USER", field: "name" },
                        { title: "USERNAME", field: "email" },
                        { title: "ROLE", field: "role" },
                        { title: "DEPARTMENT", field: "department" },
                        { title: "STATUS", field: "active" },
                        {
                            title: "ACTIONS",
                            render: ({ id }) => (
                                <IconButton id={id}>
                                    <MoreHoriz />
                                </IconButton>
                            ),
                            disableClick: true
                        }
                    ]}
                    options={{
                        selection: true,
                        showTitle: false,
                        searchFieldAlignment: "right"
                    }}
                    components={{
                        Toolbar: props => {
                            return (
                                <div
                                    style={{
                                        display: "flex",
                                        width: "100%",
                                        height: "100%"
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "80%",
                                            height: "100%"
                                        }}
                                    >
                                        <HeaderDiv>
                                            <div style={{ height: "50%" }}>
                                                <Button
                                                    className={
                                                        classes.buttonNewUser
                                                    }
                                                >
                                                    CREATE USER
                                                </Button>
                                            </div>
                                            <IconButton
                                                className={classes.iconButton}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </HeaderDiv>
                                    </div>
                                    <div style={{ width: "50%" }}>
                                        <MTableToolbar {...props} />
                                    </div>
                                </div>
                            );
                        }
                    }}
                />
            </div>
        );
    }
}

export default withStyles(styles)(UserTableList);
