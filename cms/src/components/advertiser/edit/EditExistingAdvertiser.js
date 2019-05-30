import React from "react";
import ModifyAdvertiser from "../common/ModifyAdvertiser";
import { Query } from "react-apollo";
import { getJustBrilliantGuideIdFromAdvertiser } from "../../../data/query";
import Loading from "../../loading/Loading";
import { GUIDE_MAIN_URL } from "../../../utils/Constants";

const EditExistingAdvertiser = ({
    history: { push },
    match: {
        params: { advertiser_id }
    },
    location: { state }
}) => (
    <Query
        query={getJustBrilliantGuideIdFromAdvertiser}
        variables={{ id: advertiser_id }}
    >
        {({
            loading,
            error,
            data: { justBrilliantGuideFromAdvertiser: publication }
        }) => {
            if (loading) return <Loading loadingData />;
            if (error)
                return <React.Fragment>Error! {error.message}</React.Fragment>;
            const { id: pub_id = null } = publication || {};
            return (
                <ModifyAdvertiser
                    has_data={true}
                    push={push}
                    advertiserId={advertiser_id}
                    goToNext={Boolean(state) && Boolean(state.goToNext)}
                    exitUrl={
                        Boolean(pub_id)
                            ? GUIDE_MAIN_URL.replace(":pub_id", pub_id)
                            : "/cms/main/guide"
                    }
                />
            );
        }}
    </Query>
);

export default EditExistingAdvertiser;
