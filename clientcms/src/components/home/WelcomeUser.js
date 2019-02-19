import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import ReactTable from "react-table";
import { log } from "util";
import { compose, graphql, Query } from "react-apollo";
import { getUsersByClient, getRoleList } from "../../data/query";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: "none"
    }
});

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

const WelcomeUser = props => {
    const { classes } = props;
    console.log(props);

    return (
        <Query query={getUsersByClient} variables={{ id: props.data.id }}>
            {({ loading, error, data }) => {
                if (loading) return <h1>Loading</h1>;
                if (error) return <h1>Error</h1>;

                return (
                    <React.Fragment>
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
                                            sortable: true,
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
                                            sortable: true,
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
                                            sortable: true,
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
                                            sortable: true,
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
                                            sortable: true,
                                            filterMethod: (filter, original) =>
                                                original.status
                                                    .toLowerCase()
                                                    .includes(
                                                        filter.value.toLowerCase()
                                                    )
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                    </React.Fragment>
                );
            }}
        </Query>
    );
};

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
