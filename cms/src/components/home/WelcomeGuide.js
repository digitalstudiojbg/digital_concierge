import React from "react";
import { Query } from "react-apollo";
import { getJustBrilliantGuideList } from "../../data/query";
import Loading from "../loading/Loading";
import Guide from "../guide";

export const WelcomeGuide = () => (
    <Query query={getJustBrilliantGuideList}>
        {({ loading, error, data: { justBrilliantGuides: guidesList } }) => {
            if (loading) return <Loading loadingData />;
            if (error)
                return <React.Fragment>Error! {error.message}</React.Fragment>;
            return <Guide data={guidesList} />;
        }}
    </Query>
);

export default WelcomeGuide;
