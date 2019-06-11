import React from "react";
import TabbedPageSingleForm from "../../../utils/TabbedPageSingleForm";
import { GUIDE_MAIN_URL, WELCOME_URL } from "../../../utils/Constants";
import { Redirect } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { EDIT_ARTICLE } from "../../../data/mutation";
import {
    getArticleDetail,
    getJbgLayoutFamilyDetailedList,
    getJbgTemplateList,
    getArticleListFromPublication
} from "../../../data/query";
import Loading from "../../loading/Loading";
import TabLayout from "../common/TabLayout";
import TabContent from "../common/TabContent";

const EditExistingArticle = ({ match }) => {
    const { params } = match || {};
    const { pub_id = null, article_id = null } = params || {};
    const tabs = [
        {
            name: "Preview",
            withButtons: true,
            withCancel: true,
            component: () => <div>Preview</div>
        },
        {
            name: "Layout",
            withButtons: true,
            withCancel: true,
            component: TabLayout
        },
        {
            name: "Content",
            withButtons: true,
            withCancel: true,
            component: TabContent
        }
    ];

    return (
        <div style={{ flex: 1, height: "100%" }}>
            {Boolean(pub_id) && Boolean(article_id) ? (
                <Mutation
                    mutation={EDIT_ARTICLE}
                    refetchQueries={[
                        {
                            query: getArticleListFromPublication,
                            variables: { id: pub_id }
                        }
                    ]}
                >
                    {(
                        action,
                        { loading: loadingMutation, error: errorMutation }
                    ) => {
                        if (loadingMutation) return <Loading loadingData />;
                        if (errorMutation)
                            return (
                                <React.Fragment>
                                    Error! ${errorMutation.message}
                                </React.Fragment>
                            );
                        return (
                            <Query query={getJbgLayoutFamilyDetailedList}>
                                {({
                                    loading: loadingQueryLayout,
                                    error: errorQueryLayout,
                                    data: {
                                        jbgLayoutFamilies: jbgLayoutFamiliesBefore
                                    }
                                }) => {
                                    if (loadingQueryLayout)
                                        return <Loading loadingData />;
                                    if (errorQueryLayout)
                                        return (
                                            <React.Fragment>
                                                Error!{" "}
                                                {errorQueryLayout.message}
                                            </React.Fragment>
                                        );
                                    const jbgLayoutFamilies = jbgLayoutFamiliesBefore.map(
                                        ({ __typename, ...others }) => ({
                                            ...others
                                        })
                                    );
                                    return (
                                        <Query query={getJbgTemplateList}>
                                            {({
                                                loading: loadingQueryTemplate,
                                                error: errorQueryTemplate,
                                                data: {
                                                    jbgTemplates: jbgTemplatesBefore
                                                }
                                            }) => {
                                                if (loadingQueryTemplate)
                                                    return (
                                                        <Loading loadingData />
                                                    );
                                                if (errorQueryTemplate)
                                                    return (
                                                        <React.Fragment>
                                                            Error!{" "}
                                                            {
                                                                errorQueryTemplate.message
                                                            }
                                                        </React.Fragment>
                                                    );
                                                const jbgTemplates = jbgTemplatesBefore.map(
                                                    ({
                                                        __typename,
                                                        ...others
                                                    }) => ({
                                                        ...others
                                                    })
                                                );
                                                return (
                                                    <Query
                                                        query={getArticleDetail}
                                                        variables={{
                                                            id: article_id
                                                        }}
                                                        fetchPolicy="network-only"
                                                    >
                                                        {({
                                                            loading: loadingQuery,
                                                            error: errorQuery,
                                                            data: dataArticleBefore
                                                        }) => {
                                                            if (loadingQuery)
                                                                return (
                                                                    <Loading
                                                                        loadingData
                                                                    />
                                                                );
                                                            if (errorQuery)
                                                                return (
                                                                    <React.Fragment>
                                                                        Error!{" "}
                                                                        {
                                                                            errorQuery.message
                                                                        }
                                                                    </React.Fragment>
                                                                );
                                                            const {
                                                                article: dataArticle
                                                            } =
                                                                dataArticleBefore ||
                                                                {};
                                                            const {
                                                                __typename,
                                                                ...data
                                                            } =
                                                                dataArticle ||
                                                                {};

                                                            const onSubmit = (
                                                                values,
                                                                formikBag
                                                            ) => {
                                                                console.log(
                                                                    values
                                                                );
                                                                console.log(
                                                                    formikBag
                                                                );
                                                                //TODO: Do action here
                                                            };

                                                            return (
                                                                <TabbedPageSingleForm
                                                                    title="Editorial Article"
                                                                    data={data}
                                                                    exitUrl={GUIDE_MAIN_URL.replace(
                                                                        ":pub_id",
                                                                        pub_id
                                                                    )}
                                                                    cancelUrl={GUIDE_MAIN_URL.replace(
                                                                        ":pub_id",
                                                                        pub_id
                                                                    )}
                                                                    tabs={tabs}
                                                                    tooltipText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                                                    onSubmit={
                                                                        onSubmit
                                                                    }
                                                                    otherProps={{
                                                                        layoutFamilies: jbgLayoutFamilies,
                                                                        templates: jbgTemplates
                                                                    }}
                                                                />
                                                            );
                                                        }}
                                                    </Query>
                                                );
                                            }}
                                        </Query>
                                    );
                                }}
                            </Query>
                        );
                    }}
                </Mutation>
            ) : (
                <React.Fragment>
                    {Boolean(pub_id) ? (
                        <Redirect
                            to={GUIDE_MAIN_URL.replace(":pub_id", pub_id)}
                        />
                    ) : (
                        <Redirect to={WELCOME_URL + "/guide"} />
                    )}
                </React.Fragment>
            )}
        </div>
    );
};
export default EditExistingArticle;
