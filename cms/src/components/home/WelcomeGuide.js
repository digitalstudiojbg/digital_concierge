import React from "react";
import { Query, Mutation } from "react-apollo";
import { getJustBrilliantGuideList, getAdvertiserList } from "../../data/query";
import Loading from "../loading/Loading";
import Guide from "../guide/main/JustBrilliantGuideMain";
import { DUPLICATE_GUIDE } from "../../data/mutation/justBrilliantGuide";
import { isEmpty } from "lodash";

export const WelcomeGuide = () => (
    <Query query={getJustBrilliantGuideList}>
        {({ loading, error, data: { justBrilliantGuides: guidesList } }) => {
            if (loading) return <Loading loadingData />;
            if (error)
                return <React.Fragment>Error! {error.message}</React.Fragment>;
            return (
                <Mutation
                    mutation={DUPLICATE_GUIDE}
                    refetchQueries={[
                        {
                            query: getJustBrilliantGuideList
                        }
                    ]}
                >
                    {(
                        duplicateAction,
                        { loading: loadingMutation, error: errorMutation }
                    ) => {
                        if (loadingMutation) return <Loading loadingData />;
                        return (
                            <Query query={getAdvertiserList}>
                                {({
                                    loading: loadingAdvertiser,
                                    error: errorAdvertiser,
                                    data: { advertisers }
                                }) => {
                                    if (loadingAdvertiser)
                                        return <Loading loadingData />;
                                    if (errorAdvertiser)
                                        return (
                                            <React.Fragment>
                                                Error! {errorAdvertiser.message}
                                            </React.Fragment>
                                        );
                                    return (
                                        <Guide
                                            data={{
                                                publications: guidesList,
                                                advertisers
                                            }}
                                            otherProps={{
                                                error: isEmpty(errorMutation)
                                                    ? null
                                                    : errorMutation,
                                                duplicateAction
                                            }}
                                        />
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

export default WelcomeGuide;
