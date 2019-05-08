import React from "react";
import { Query } from "react-apollo";
import { getAdvertiserFromPublication } from "../../../data/query";
import Loading from "../../loading/Loading";
import AdvertiserTable from "../common/AdvertiserTableList";

const DetailAdvertiserList = ({ data: { pub_id } }) => (
    <Query query={getAdvertiserFromPublication} variables={{ id: pub_id }}>
        {({
            loading,
            error,
            data: { advertisersByPublication: advertisers }
        }) => {
            if (loading) return <Loading loadingData />;
            if (error)
                return <React.Fragment>Error!: {error.message}</React.Fragment>;
            return <AdvertiserTable data={advertisers} pub_id={pub_id} />;
        }}
    </Query>
);

export default DetailAdvertiserList;
