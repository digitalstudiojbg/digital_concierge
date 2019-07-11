import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { IconButton, Button } from "@material-ui/core";
import { MoreHoriz, DeleteOutlined as DeleteIcon } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { USER_CREATE_URL, USER_EDIT_URL } from "../../../utils/Constants";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

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
        this.state = { openDialog: false, selected_users: [] };
        this.usersTableRef = React.createRef();
        this.handleClickNewButton = this.handleClickNewButton.bind(this);
        this.handleClickEditUser = this.handleClickEditUser.bind(this);
        this.handleClickDeleteUser = this.handleClickDeleteUser.bind(this);
        this.cancelDeleteUser = this.cancelDeleteUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
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

    handleClickNewButton = () => {
        const { history, clientId } = this.props;
        Boolean(history) &&
            history.push(USER_CREATE_URL.replace(":client_id", clientId));
    };
    handleClickEditUser = (_event, { id: user_id }) => {
        const { history, clientId } = this.props;
        Boolean(history) &&
            history.push(
                USER_EDIT_URL.replace(":client_id", clientId).replace(
                    ":user_id",
                    user_id
                )
            );
    };
    handleClickDeleteUser = () => {
        if (Boolean(this.usersTableRef && this.usersTableRef.current)) {
            const { data: users = [] } = this.usersTableRef.current.state;
            const selected_users = users.filter(
                ({ tableData: { checked } }) => checked
            );
            if (selected_users.length > 0) {
                this.setState({ openDialog: true, selected_users });
            }
        }
    };

    deleteUser = () => {
        const { selected_users } = this.state;
        const { deleteUser, enqueueSnackbar } = this.props;
        if (Array.isArray(selected_users) && selected_users.length > 0) {
            deleteUser({
                variables: {
                    input: { id: selected_users.map(({ id }) => id) }
                }
            })
                .then(() => {
                    const message =
                        selected_users.length > 1
                            ? `SUCCESSFULLY DELETED USER: ${
                                  selected_users[0].name
                              }`
                            : "SUCCESSFULLY DELETED USERS";
                    this.setState(
                        { openDialog: false, selected_users: [] },
                        () => {
                            enqueueSnackbar(message, {
                                variant: "success"
                            });
                        }
                    );
                })
                .catch(error => {
                    this.setState(
                        { openDialog: false, selected_users: [] },
                        () => {
                            enqueueSnackbar(error.message, {
                                variant: "error"
                            });
                        }
                    );
                });
        }
    };

    cancelDeleteUser = () =>
        this.setState({ openDialog: false, selected_users: [] });

    render() {
        const { classes } = this.props;
        const { openDialog, selected_users } = this.state;
        return (
            <div style={{ width: "100%", height: "100%", padding: "3%" }}>
                <MaterialTable
                    tableRef={this.usersTableRef}
                    data={this.modifyUserData()}
                    onRowClick={this.handleClickEditUser}
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
                                                    onClick={
                                                        this
                                                            .handleClickNewButton
                                                    }
                                                >
                                                    CREATE USER
                                                </Button>
                                            </div>
                                            <IconButton
                                                className={classes.iconButton}
                                                onClick={
                                                    this.handleClickDeleteUser
                                                }
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
                <ConfirmDeleteDialog
                    open={openDialog}
                    users={selected_users}
                    acceptAction={this.deleteUser}
                    cancelAction={this.cancelDeleteUser}
                />
            </div>
        );
    }
}

export default withSnackbar(withRouter(withStyles(styles)(UserTableList)));
