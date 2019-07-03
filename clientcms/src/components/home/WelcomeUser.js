import React, { useState } from "react";
import { Query, Mutation } from "react-apollo";
import { getUsersByClient, getRoleList } from "../../data/query";
import Loading from "../loading/Loading";
import { DELETE_USER } from "../../data/mutation";
import {
    MainSectionContainer,
    PageHeader,
    SubSectionTop,
    MainSubSections
} from "./WelcomeStyleSet";
import { withStyles } from "@material-ui/core/styles";
import { Tabs, Tab } from "@material-ui/core";
import UserTableList from "./user/UserTableList";
import StructureTableList from "./user/StructureTableList";
import { getDepartmentListByClient } from "../../data/query/department";

const styles = theme => ({
    root: {
        backgroundColor: "#F4F4F4"
    },
    tabsRoot: {
        borderBottom: "1px solid #e8e8e8"
    },
    tabsIndicator: {
        backgroundColor: "#2699FB"
    },
    tabRoot: {
        fontSize: "1.1em",
        textTransform: "initial",
        minWidth: 250,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(","),
        "&:hover": {
            color: "#40a9ff",
            opacity: 1
        },
        "&$tabSelected": {
            // color: "#1890ff",
            color: "#2699FB",
            fontWeight: theme.typography.fontWeightMedium
        },
        "&:focus": {
            color: "#40a9ff"
        }
    },
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3
    }
});

const WelcomeUserHOC = ({ data, classes }) => {
    const [tab, setTab] = useState(0);
    const handleChange = (_event, value) => {
        setTab(value);
    };
    return (
        <Query
            query={getUsersByClient}
            variables={{ id: data.id }}
            fetchPolicy="network-only"
        >
            {({ loading, error, data: { client = {} } }) => {
                if (loading) return <Loading loadingData />;
                if (error)
                    return (
                        <React.Fragment>Error! {error.message}</React.Fragment>
                    );
                const { users = [] } = client;
                console.log("Users list ", users);
                return (
                    <Mutation
                        mutation={DELETE_USER}
                        refetchQueries={[
                            {
                                query: getUsersByClient,
                                variables: { id: data.id }
                            }
                        ]}
                    >
                        {(
                            deleteUser,
                            {
                                loading: loadingDeleteUser,
                                error: errorDeleteUser
                            }
                        ) => {
                            if (loadingDeleteUser)
                                return <Loading loadingData />;
                            if (errorDeleteUser)
                                return (
                                    <React.Fragment>
                                        Error! {errorDeleteUser.message}
                                    </React.Fragment>
                                );
                            return (
                                <Query
                                    query={getDepartmentListByClient}
                                    variables={{ id: data.id }}
                                >
                                    {({
                                        loading: loadingDepartmentList,
                                        error: errorDepartmentList,
                                        data: {
                                            departmentsByClient: departments
                                        }
                                    }) => {
                                        if (loadingDepartmentList)
                                            return <Loading loadingData />;
                                        if (errorDepartmentList)
                                            return (
                                                <React.Fragment>
                                                    Error!{" "}
                                                    {
                                                        errorDepartmentList.message
                                                    }
                                                </React.Fragment>
                                            );
                                        return (
                                            <Query
                                                query={getRoleList}
                                                variables={{
                                                    clientId: data.id
                                                }}
                                            >
                                                {({
                                                    loading: loadingRoleList,
                                                    error: errorRoleList,
                                                    data: {
                                                        rolesByClientId: roles
                                                    }
                                                }) => {
                                                    if (loadingRoleList)
                                                        return (
                                                            <Loading
                                                                loadingData
                                                            />
                                                        );
                                                    if (errorRoleList)
                                                        return (
                                                            <React.Fragment>
                                                                Error!{" "}
                                                                {
                                                                    errorRoleList.message
                                                                }
                                                            </React.Fragment>
                                                        );
                                                    return (
                                                        <MainSectionContainer
                                                            style={{
                                                                padding: 0
                                                            }}
                                                        >
                                                            <SubSectionTop
                                                                style={{
                                                                    padding:
                                                                        "3% 3% 0 3%"
                                                                }}
                                                            >
                                                                <PageHeader
                                                                    style={{
                                                                        width:
                                                                            "75%"
                                                                    }}
                                                                >
                                                                    Users &
                                                                    Structure
                                                                </PageHeader>
                                                            </SubSectionTop>
                                                            <MainSubSections
                                                                style={{
                                                                    width:
                                                                        "100%",
                                                                    padding:
                                                                        "0 3% 3% 3%",
                                                                    backgroundColor:
                                                                        "#F4F4F4"
                                                                }}
                                                            >
                                                                <div
                                                                    className={
                                                                        classes.root
                                                                    }
                                                                >
                                                                    <Tabs
                                                                        classes={{
                                                                            root:
                                                                                classes.tabsRoot,
                                                                            indicator:
                                                                                classes.tabsIndicator
                                                                        }}
                                                                        value={
                                                                            tab
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                    >
                                                                        <Tab
                                                                            disableRipple
                                                                            classes={{
                                                                                root:
                                                                                    classes.tabRoot,
                                                                                selected:
                                                                                    classes.tabSelected
                                                                            }}
                                                                            label="Users"
                                                                        />
                                                                        <Tab
                                                                            disableRipple
                                                                            classes={{
                                                                                root:
                                                                                    classes.tabRoot,
                                                                                selected:
                                                                                    classes.tabSelected
                                                                            }}
                                                                            label="Structure"
                                                                        />
                                                                    </Tabs>
                                                                    {tab ===
                                                                    0 ? (
                                                                        <UserTableList
                                                                            data={
                                                                                users
                                                                            }
                                                                            deleteUser={
                                                                                deleteUser
                                                                            }
                                                                        />
                                                                    ) : tab ===
                                                                      1 ? (
                                                                        <StructureTableList
                                                                            data={{
                                                                                departments,
                                                                                roles
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <React.Fragment />
                                                                    )}
                                                                </div>
                                                            </MainSubSections>
                                                        </MainSectionContainer>
                                                    );
                                                }}
                                            </Query>
                                        );
                                    }}
                                </Query>
                            );
                        }}
                    </Mutation>
                );
            }}
        </Query>
    );
};

export default withStyles(styles)(WelcomeUserHOC);
