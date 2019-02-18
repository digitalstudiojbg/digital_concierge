import React from "react";
import { Query, withApollo } from "react-apollo";
import { systemsByClientQuery, getLayoutList } from "../../../data/query";
import Loading from "../../loading/Loading";
import SetupClientThemeAndLayout from "./five/SetupClientThemeAndLayout";
import gql from "graphql-tag";

export const WizardCreateClientPageFive = ({ next, client }) => {
    let clientId = null;
    try {
        clientId = client.readQuery({
            query: gql`
                {
                    new_create_client_id @client
                }
            `
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
                    <Query query={getLayoutList}>
                        {({
                            loading: loading2,
                            error: error2,
                            data: { layouts }
                        }) => {
                            if (loading2) return <Loading loadingData />;
                            if (error2) return `Error! ${error2.message}`;
                            console.log(layouts);
                            return (
                                <SetupClientThemeAndLayout
                                    systems={systems}
                                    layouts={layouts}
                                    next={next}
                                />
                            );
                        }}
                    </Query>
                );
            }}
        </Query>
    );
};

export default withApollo(WizardCreateClientPageFive);
