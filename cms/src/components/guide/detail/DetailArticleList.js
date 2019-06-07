import React from "react";
import { Query } from "react-apollo";
import { getArticleListFromPublication } from "../../../data/query";
import Loading from "../../loading/Loading";
import ArticleTable from "../common/ArticleTableList";

const DetailAdvertiserList = ({ data: { pub_id } }) => (
    <Query query={getArticleListFromPublication} variables={{ id: pub_id }}>
        {({ loading, error, data: { articlesByPublication: articles } }) => {
            if (loading) return <Loading loadingData />;
            if (error)
                return <React.Fragment>Error!: {error.message}</React.Fragment>;
            return <ArticleTable data={articles} pub_id={pub_id} />;
        }}
    </Query>
);

export default DetailAdvertiserList;
