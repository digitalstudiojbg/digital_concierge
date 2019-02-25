import React, { useState, useEffect, Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ReactTable from "react-table";
import { Mutation, Query } from "react-apollo";
import { getUsersByClient } from "../../data/query";
import { DELETE_USER } from "../../data/mutation";
import Checkbox from "@material-ui/core/Checkbox";
import WelcomeUserCreate from "./WelcomeUserCreate";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import DialogActions from "@material-ui/core/DialogActions";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import styled from "styled-components";

const ActionButton = styled.p`
    padding-left: 5px;
    padding-right: 5px;
    &:hover {
        font-weight: bold;
    }
`;

const Transition = props => {
    return <Slide direction="up" {...props} />;
};

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: "none"
    }
});

const useCheckedUsers = checkedUser => {
    const [checkedUsers, setCheckedUsers] = useState([]);

    useEffect(() => {
        (checkedUser => {
            console.log("1");

            setCheckedUsers(checkedUser);
        })(checkedUser);
    }, [checkedUser]);

    return checkedUsers;
};

const changeClientDataStructure = ({ client: { users = {} } = {} }) => {
    let outputUser = [];

    users.map(
        ({
            roles = [],
            name: user = "",
            email: username = "",
            active = "",
            id
        }) => {
            let rolesName;
            let departmentsName;
            roles.map(({ name, department }) => {
                rolesName = rolesName ? `${rolesName} ${name}` : `${name}`;
                departmentsName = department.name
                    ? `${department.name}`
                    : `${departmentsName} ${department.name}`;
            });
            let eachUser = {
                id,
                user,
                username,
                status: active ? "Active" : "Inactive",
                role: rolesName,
                department: departmentsName
            };
            outputUser.push(eachUser);
        }
    );

    return outputUser;
};

class WelcomeUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            is_create_page: false,
            selected_row: null,
            deleteModal: false
        };
        this.handleAction = this.handleAction.bind(this);
    }

    handleAction(original) {
        this.setState({
            selected_row: original ? original.id : null
        });
    }

    handleIsCreatePageState() {
        //   const { is_create_page } = this.state;
        this.setState({ is_create_page: !this.state.is_create_page });
    }

    render() {
        const { classes } = this.props;
        const {
            selected,
            is_create_page,
            selected_row,
            deleteModal
        } = this.state;
        if (is_create_page) {
            return (
                <WelcomeUserCreate
                    handleIsCreatePageState={
                        (this.handleIsCreatePageState = this.handleIsCreatePageState.bind(
                            this
                        ))
                    }
                />
            );
        } else {
            return (
                <Query
                    query={getUsersByClient}
                    variables={{ id: this.props.data.id }}
                    fetchPolicy="no-cache"
                >
                    {({ loading, error, data }) => {
                        if (loading) return <h1>Loading</h1>;
                        if (error) return <h1>Error</h1>;
                        console.log(data);

                        return (
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "lightgray",
                                    padding: "20px"
                                }}
                            >
                                <h1>Users</h1>
                                <div style={{ display: "flex" }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            className={classes.button}
                                            onClick={() => {
                                                this.setState({
                                                    is_create_page: true
                                                });
                                            }}
                                        >
                                            CREATE A USER ACCOUNT
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            variant="contained"
                                            className={classes.button}
                                            onClick={() => {
                                                this.setState({
                                                    deleteModal: true
                                                });
                                            }}
                                        >
                                            DELETE
                                        </Button>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        backgroundColor: "white",
                                        padding: "20px"
                                    }}
                                >
                                    <ReactTable
                                        defaultPageSize={10}
                                        data={changeClientDataStructure(data)}
                                        columns={[
                                            {
                                                Header: "USER",
                                                accessor: "user",
                                                style: {
                                                    textAlign: "center"
                                                },
                                                filterable: true,
                                                filterMethod: (
                                                    filter,
                                                    original
                                                ) =>
                                                    original.user
                                                        .toLowerCase()
                                                        .includes(
                                                            filter.value.toLowerCase()
                                                        )
                                            },
                                            {
                                                Header: "USERNAME",
                                                accessor: "username",
                                                style: {
                                                    textAlign: "center"
                                                },
                                                filterable: true,
                                                filterMethod: (
                                                    filter,
                                                    original
                                                ) =>
                                                    original.username
                                                        .toLowerCase()
                                                        .includes(
                                                            filter.value.toLowerCase()
                                                        )
                                            },
                                            {
                                                Header: "ROLE",
                                                accessor: "role",
                                                style: {
                                                    textAlign: "center"
                                                },
                                                filterable: true,
                                                filterMethod: (
                                                    filter,
                                                    original
                                                ) =>
                                                    original.role
                                                        .toLowerCase()
                                                        .includes(
                                                            filter.value.toLowerCase()
                                                        )
                                            },
                                            {
                                                Header: "DEPARTMENT",
                                                accessor: "department",
                                                style: {
                                                    textAlign: "center"
                                                },
                                                filterable: true,
                                                filterMethod: (
                                                    filter,
                                                    original
                                                ) =>
                                                    original.department
                                                        .toLowerCase()
                                                        .includes(
                                                            filter.value.toLowerCase()
                                                        )
                                            },
                                            {
                                                Header: "STATUS",
                                                accessor: "status",
                                                style: {
                                                    textAlign: "center"
                                                },
                                                filterable: true,
                                                filterMethod: (
                                                    filter,
                                                    original
                                                ) =>
                                                    original.status
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
                                                width: 75,
                                                Cell: ({ original }) => {
                                                    return selected_row &&
                                                        original.id ===
                                                            selected_row ? (
                                                        <React.Fragment>
                                                            <div
                                                                onClick={() => {
                                                                    this.handleAction(
                                                                        null
                                                                    );
                                                                }}
                                                                style={{
                                                                    position:
                                                                        "fixed",
                                                                    width:
                                                                        "100vw",
                                                                    height:
                                                                        "100vh",
                                                                    top: 0,
                                                                    right: 0,
                                                                    bottom: 0,
                                                                    left: 0
                                                                }}
                                                            />
                                                            <Fade in>
                                                                <Paper
                                                                    elevation={
                                                                        5
                                                                    }
                                                                    style={{
                                                                        position:
                                                                            "absolute",
                                                                        backgroundColor:
                                                                            "white",
                                                                        padding:
                                                                            "15px",
                                                                        borderRadius:
                                                                            "5px",
                                                                        width:
                                                                            "80px"
                                                                    }}
                                                                >
                                                                    <div
                                                                        onClick={() => {
                                                                            this.handleAction(
                                                                                null
                                                                            );
                                                                        }}
                                                                    >
                                                                        <div>
                                                                            <ActionButton>
                                                                                Edit
                                                                            </ActionButton>
                                                                            <ActionButton>
                                                                                Delete
                                                                            </ActionButton>
                                                                        </div>
                                                                    </div>
                                                                </Paper>
                                                            </Fade>
                                                        </React.Fragment>
                                                    ) : (
                                                        <div
                                                            onClick={() => {
                                                                this.handleAction(
                                                                    original
                                                                );
                                                            }}
                                                        >
                                                            ...
                                                        </div>
                                                    );
                                                }
                                            },
                                            {
                                                style: {
                                                    textAlign: "center"
                                                },
                                                Cell: ({ original }) => {
                                                    const selectedId = parseInt(
                                                        original.id
                                                    );
                                                    return (
                                                        <div>
                                                            <Checkbox
                                                                checked={this.state.selected.includes(
                                                                    selectedId
                                                                )}
                                                                onClick={() => {
                                                                    this.setState(
                                                                        {
                                                                            selected: selected.includes(
                                                                                parseInt(
                                                                                    selectedId
                                                                                )
                                                                            )
                                                                                ? selected.filter(
                                                                                      each => {
                                                                                          return (
                                                                                              each !=
                                                                                              parseInt(
                                                                                                  selectedId
                                                                                              )
                                                                                          );
                                                                                      }
                                                                                  )
                                                                                : [
                                                                                      ...selected,
                                                                                      parseInt(
                                                                                          selectedId
                                                                                      )
                                                                                  ]
                                                                        }
                                                                    );
                                                                }}
                                                                value="checkedB"
                                                                color="primary"
                                                                style={{
                                                                    padding: "0"
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                }
                                            }
                                        ]}
                                    />
                                </div>
                                <Mutation
                                    mutation={DELETE_USER}
                                    refetchQueries={[
                                        {
                                            query: getUsersByClient,
                                            variables: {
                                                id: this.props.data.id
                                            }
                                        }
                                    ]}
                                >
                                    {(deleteUsers, { loading, error }) => {
                                        if (error)
                                            return `Error! ${error.message}`;
                                        return (
                                            <Dialog
                                                open={deleteModal}
                                                TransitionComponent={Transition}
                                                onClose={() => {
                                                    this.setState({
                                                        deleteModal: false
                                                    });
                                                }}
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                    Confirmation
                                                </DialogTitle>

                                                <DialogContent>
                                                    {selected.length <= 0 ? (
                                                        <p>
                                                            Please choose at
                                                            least one user to
                                                            delete first.
                                                        </p>
                                                    ) : (
                                                        <React.Fragment>
                                                            <p
                                                                style={{
                                                                    fontSize:
                                                                        "1.3em"
                                                                }}
                                                            >
                                                                Are you sure you
                                                                want to delete
                                                                the selected
                                                                images? Click OK
                                                                to confirm.
                                                            </p>
                                                            <ul
                                                                style={{
                                                                    paddingLeft:
                                                                        "30px",
                                                                    paddingRight:
                                                                        "30px"
                                                                }}
                                                            >
                                                                {selected.map(
                                                                    (
                                                                        each,
                                                                        index
                                                                    ) => {
                                                                        const selected_user = changeClientDataStructure(
                                                                            data
                                                                        ).find(
                                                                            eachUser => {
                                                                                return (
                                                                                    parseInt(
                                                                                        eachUser.id
                                                                                    ) ===
                                                                                    parseInt(
                                                                                        each
                                                                                    )
                                                                                );
                                                                            }
                                                                        );

                                                                        return (
                                                                            <li
                                                                                key={
                                                                                    index
                                                                                }
                                                                                style={{
                                                                                    fontSize:
                                                                                        "1.2em"
                                                                                }}
                                                                            >
                                                                                {selected_user &&
                                                                                    selected_user.user}
                                                                            </li>
                                                                        );
                                                                    }
                                                                )}
                                                            </ul>
                                                        </React.Fragment>
                                                    )}
                                                </DialogContent>
                                                <DialogActions>
                                                    {selected.length > 0 ? (
                                                        <React.Fragment>
                                                            <Button
                                                                onClick={() => {
                                                                    this.setState(
                                                                        {
                                                                            deleteModal: false
                                                                        }
                                                                    );
                                                                }}
                                                                color="secondary"
                                                                className={
                                                                    classes.buttonFont
                                                                }
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                onClick={() => {
                                                                    deleteUsers(
                                                                        {
                                                                            variables: {
                                                                                input: {
                                                                                    id: selected
                                                                                }
                                                                            }
                                                                        }
                                                                    );
                                                                    this.setState(
                                                                        {
                                                                            deleteModal: false,
                                                                            selected: []
                                                                        }
                                                                    );
                                                                }}
                                                                color="primary"
                                                                autoFocus
                                                                className={
                                                                    classes.buttonFont
                                                                }
                                                            >
                                                                Ok
                                                            </Button>
                                                        </React.Fragment>
                                                    ) : (
                                                        <Button
                                                            onClick={() => {
                                                                this.setState({
                                                                    deleteModal: false
                                                                });
                                                            }}
                                                            color="primary"
                                                            className={
                                                                classes.buttonFont
                                                            }
                                                        >
                                                            Ok
                                                        </Button>
                                                    )}
                                                </DialogActions>
                                            </Dialog>
                                        );
                                    }}
                                </Mutation>
                            </div>
                        );
                    }}
                </Query>
            );
        }
    }
}

export default withStyles(styles)(WelcomeUser);

/*export default compose(
    withStyles(styles),
    graphql(getUsersByClient, {
        options: ownProps => ({
            variables: { id: 1 }
        }),
        name: "getUsersByClient"
    })
)(WelcomeUser);*/
