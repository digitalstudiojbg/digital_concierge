import React from "react";
import { Query, Mutation } from "react-apollo";
import { getArticleListFromPublication } from "../../../data/query";
import Loading from "../../loading/Loading";
import ArticleTable from "../common/ArticleTableList";
import { SET_ARTICLE_ACTIVE_INACTIVE } from "../../../data/mutation";

const DetailAdvertiserList = ({ data: { pub_id } }) => (
    <Mutation
        mutation={SET_ARTICLE_ACTIVE_INACTIVE}
        refetchQueries={[
            {
                query: getArticleListFromPublication,
                variables: { id: pub_id }
            }
        ]}
    >
        {(
            handleActiveInactive,
            { loading: loadingMutation, error: errorMutation }
        ) => {
            if (loadingMutation) return <Loading loadingData />;
            if (errorMutation)
                return (
                    <React.Fragment>
                        Error!: {errorMutation.message}
                    </React.Fragment>
                );
            return (
                <Query
                    query={getArticleListFromPublication}
                    variables={{ id: pub_id }}
                >
                    {({
                        loading,
                        error,
                        data: { articlesByPublication: articles }
                    }) => {
                        if (loading) return <Loading loadingData />;
                        if (error)
                            return (
                                <React.Fragment>
                                    Error!: {error.message}
                                </React.Fragment>
                            );
                        return (
                            <ArticleTable
                                data={articles}
                                pub_id={pub_id}
                                handleActiveInactive={handleActiveInactive}
                            />
                        );
                    }}
                </Query>
            );
        }}
    </Mutation>
);

export default DetailAdvertiserList;
