import React from "react";
import { Query, withApollo } from "react-apollo";
import { getSystemsFromUser, getLayoutList } from "../../../data/query";
import Loading from "../../loading/Loading";
import SetupClientThemeAndLayout from "./five/SetupClientThemeAndLayout";

export const WizardCreateClientPageFive = ({ next }) => (
    <Query query={getSystemsFromUser}>
        {({ loading, error, data: { systemsByUser: systems } }) => {
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

export default withApollo(WizardCreateClientPageFive);
