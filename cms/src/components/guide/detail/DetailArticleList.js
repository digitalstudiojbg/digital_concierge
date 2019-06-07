import React from "react";
import { Query, Mutation } from "react-apollo";
import { getArticleListFromPublication } from "../../../data/query";
import Loading from "../../loading/Loading";
import ArticleTable from "../common/ArticleTableList";
import {
    SET_ARTICLE_ACTIVE_INACTIVE,
    MOVE_ARTICLE_UP_BY_ONE,
    MOVE_ARTICLE_DOWN_BY_ONE
} from "../../../data/mutation";

const DetailAdvertiserList = ({ data: { pub_id } }) => (
    <Mutation
        mutation={MOVE_ARTICLE_UP_BY_ONE}
        refetchQueries={[
            {
                query: getArticleListFromPublication,
                variables: { id: pub_id }
            }
        ]}
    >
        {(
            moveUpByOne,
            { loading: loadingMutationUp, error: errorMutationUp }
        ) => {
            if (loadingMutationUp) return <Loading loadingData />;
            if (errorMutationUp)
                return (
                    <React.Fragment>
                        Error!: {errorMutationUp.message}
                    </React.Fragment>
                );
            return (
                <Mutation
                    mutation={MOVE_ARTICLE_DOWN_BY_ONE}
                    refetchQueries={[
                        {
                            query: getArticleListFromPublication,
                            variables: { id: pub_id }
                        }
                    ]}
                >
                    {(
                        moveDownByOne,
                        {
                            loading: loadingMutationDown,
                            error: errorMutationDown
                        }
                    ) => {
                        if (loadingMutationDown) return <Loading loadingData />;
                        if (errorMutationDown)
                            return (
                                <React.Fragment>
                                    Error!: {errorMutationDown.message}
                                </React.Fragment>
                            );
                        return (
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
                                    {
                                        loading: loadingMutation,
                                        error: errorMutation
                                    }
                                ) => {
                                    if (loadingMutation)
                                        return <Loading loadingData />;
                                    if (errorMutation)
                                        return (
                                            <React.Fragment>
                                                Error!: {errorMutation.message}
                                            </React.Fragment>
                                        );
                                    return (
                                        <Query
                                            query={
                                                getArticleListFromPublication
                                            }
                                            variables={{ id: pub_id }}
                                        >
                                            {({
                                                loading,
                                                error,
                                                data: {
                                                    articlesByPublication: articles
                                                }
                                            }) => {
                                                if (loading)
                                                    return (
                                                        <Loading loadingData />
                                                    );
                                                if (error)
                                                    return (
                                                        <React.Fragment>
                                                            Error!:{" "}
                                                            {error.message}
                                                        </React.Fragment>
                                                    );
                                                return (
                                                    <ArticleTable
                                                        data={articles}
                                                        pub_id={pub_id}
                                                        handleActiveInactive={
                                                            handleActiveInactive
                                                        }
                                                        moveUpByOne={
                                                            moveUpByOne
                                                        }
                                                        moveDownByOne={
                                                            moveDownByOne
                                                        }
                                                    />
                                                );
                                            }}
                                        </Query>
                                    );
                                }}
                            </Mutation>
                        );
                    }}
                </Mutation>
            );
        }}
    </Mutation>
);

export default DetailAdvertiserList;
