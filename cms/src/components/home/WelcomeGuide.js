import React from "react";
import { Query } from "react-apollo";
import { getJustBrilliantGuideList } from "../../data/query";
import Loading from "../loading/Loading";
import Guide from "../guide/main/JustBrilliantGuideMain";

export const WelcomeGuide = () => (
    <Query query={getJustBrilliantGuideList}>
        {({ loading, error, data: { justBrilliantGuides: guidesList } }) => {
            if (loading) return <Loading loadingData />;
            if (error)
                return <React.Fragment>Error! {error.message}</React.Fragment>;
            return (
                <Guide data={{ publications: guidesList, businesses: [] }} />
            );
        }}
    </Query>
);

export default WelcomeGuide;
