import React from "react";
import { Query, withApollo } from "react-apollo";
import {
    systemsByClientQuery,
    getLayoutListFromType,
    getNewCreatedClientId
} from "../../../data/query";
import Loading from "../../loading/Loading";
import SetupClientThemeAndLayout from "./five/SetupClientThemeAndLayout";

export const WizardCreateClientPageFive = ({ next, client }) => {
    let clientId = null;
    //let clientId = 1;
    try {
        clientId = client.readQuery({
            query: getNewCreatedClientId
        }).new_create_client_id;
    } catch (error) {
        console.log(error);
        return (
            <React.Fragment>
                <h1>Can't Find ClientId From Step 1</h1>
                <Loading />
            </React.Fragment>
        );
    }
    return (
        <Query query={systemsByClientQuery} variables={{ id: clientId }}>
            {({ loading, error, data: { systemsByClient: systems } }) => {
                if (loading) return <Loading loadingData />;
                if (error) return `Error! ${error.message}`;
                console.log(systems);

                return (
                    <Query
                        query={getLayoutListFromType}
                        variables={{ typeName: "start" }}
                    >
                        {({
                            loading: loadingStart,
                            error: errorStart,
                            data: { layoutsFromType: layoutsStart }
                        }) => {
                            if (loadingStart) return <Loading loadingData />;
                            if (errorStart)
                                return `Error! ${errorStart.message}`;
                            console.log(layoutsStart);
                            return (
                                <Query
                                    query={getLayoutListFromType}
                                    variables={{ typeName: "home" }}
                                >
                                    {({
                                        loading: loadingHome,
                                        error: errorHome,
                                        data: { layoutsFromType: layoutsHome }
                                    }) => {
                                        if (loadingHome)
                                            return <Loading loadingData />;
                                        if (errorHome)
                                            return `Error! ${
                                                errorHome.message
                                            }`;
                                        console.log(layoutsHome);
                                        return (
                                            <Query
                                                query={getLayoutListFromType}
                                                variables={{ typeName: "list" }}
                                            >
                                                {({
                                                    loading: loadingList,
                                                    error: errorList,
                                                    data: {
                                                        layoutsFromType: layoutsList
                                                    }
                                                }) => {
                                                    if (loadingList)
                                                        return (
                                                            <Loading
                                                                loadingData
                                                            />
                                                        );
                                                    if (errorList)
                                                        return `Error! ${
                                                            errorList.message
                                                        }`;
                                                    console.log(layoutsList);
                                                    return (
                                                        <Query
                                                            query={
                                                                getLayoutListFromType
                                                            }
                                                            variables={{
                                                                typeName:
                                                                    "entry"
                                                            }}
                                                        >
                                                            {({
                                                                loading: loadingEntry,
                                                                error: errorEntry,
                                                                data: {
                                                                    layoutsFromType: layoutsEntry
                                                                }
                                                            }) => {
                                                                if (
                                                                    loadingEntry
                                                                )
                                                                    return (
                                                                        <Loading
                                                                            loadingData
                                                                        />
                                                                    );
                                                                if (errorEntry)
                                                                    return `Error! ${
                                                                        errorEntry.message
                                                                    }`;
                                                                console.log(
                                                                    layoutsEntry
                                                                );
                                                                return (
                                                                    <SetupClientThemeAndLayout
                                                                        systems={
                                                                            systems
                                                                        }
                                                                        layoutsStart={
                                                                            layoutsStart
                                                                        }
                                                                        layoutsHome={
                                                                            layoutsHome
                                                                        }
                                                                        layoutsList={
                                                                            layoutsList
                                                                        }
                                                                        layoutsEntry={
                                                                            layoutsEntry
                                                                        }
                                                                        next={
                                                                            next
                                                                        }
                                                                    />
                                                                );
                                                            }}
                                                        </Query>
                                                    );
                                                }}
                                            </Query>
                                        );
                                    }}
                                </Query>
                            );
                        }}
                    </Query>
                );
            }}
        </Query>
    );
};

export default withApollo(WizardCreateClientPageFive);
