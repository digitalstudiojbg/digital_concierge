import React, { useState, useEffect, Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ReactTable from "react-table";
import { log } from "util";
import { compose, graphql, Query } from "react-apollo";
import { getUsersByClient, getRoleList } from "../../data/query";
import Checkbox from "@material-ui/core/Checkbox";

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
    state = {
        selected: []
    };

    render() {
        const { classes } = this.props;
        const { selected } = this.state;
        return (
            <Query
                query={getUsersByClient}
                variables={{ id: this.props.data.id }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <h1>Loading</h1>;
                    if (error) return <h1>Error</h1>;

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
                            <div>
                                <Button
                                    variant="contained"
                                    className={classes.button}
                                >
                                    CREATE A USER ACCOUNT
                                </Button>
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
                                            filterMethod: (filter, original) =>
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
                                            filterMethod: (filter, original) =>
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
                                            filterMethod: (filter, original) =>
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
                                            filterMethod: (filter, original) =>
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
                                            filterMethod: (filter, original) =>
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
                                            Cell: row => {
                                                return <div>...</div>;
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
                                                                this.setState({
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
                                                                });
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
                        </div>
                    );
                }}
            </Query>
        );
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
